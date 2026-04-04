import { api } from "../api.js";
import { userHelp } from "../utility/userHelp.js";

async function getAllFilms()
{
    return api.get('/data/movies');
}

async function getFilmById(id)
{
    return api.get(`/data/movies/${id}`);
}

async function getOwnerId(id)
{
    const film = await getFilmById(id);
    return film._ownerId;
}

async function getRole(id)
{
    let role = '';
    if(userHelp.getUserId() === await getOwnerId(id))
    {
        role = 'author';
    } else if(userHelp.isAuthorized())
    {
        role = 'viewer';
    } else {
        role = 'guest';
    }

    return role;
}

async function likeFilm()
{
    console.log(await api.get(`/data/likes`));
    //POST /data/likes
}

async function createFilm(data)
{
    if (!data || !data.title || !data.description || !data.img) {
        return;
    }

    if (
        data.title.trim() === '' ||
        data.description.trim() === '' ||
        data.img.trim() === ''
    ) {
        return;
    }

    await api.post('/data/movies', data);
    page('/home');
}

async function editFilm(id, data)
{
    await api.put(`/data/movies/${id}`, data);
    page('/home');
}

async function deleteFilm(id)
{
    await api.del(`/data/movies/${id}`);
    page('/home');
}

export const filmService = {
    getAllFilms,
    getFilmById,
    getRole,
    likeFilm,
    createFilm,
    editFilm,
    deleteFilm
}