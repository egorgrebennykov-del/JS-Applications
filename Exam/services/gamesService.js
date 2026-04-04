import { api } from "../api.js";
import { userHelp } from "../utility/userHelp.js";
import { detailsView } from "../views/detailsView.js";

async function getAllGames()
{
    return await api.get('/data/games?sortBy=_createdOn%20desc');
}

async function getGameById(id)
{
    return await api.get(`/data/games/${id}`);
}

async function getOwnerId(id)
{
    const game = await getGameById(id);
    return game._ownerId;
}

async function createGame(data)
{
    await api.post('/data/games', data);
    page('/dashboard');
}

async function editGame(id, data)
{
    await api.put(`/data/games/${id}`, data);
    detailsView(id);
}

async function deleteGame(id)
{
    const isConfirmed = confirm("Are you sure you want to delete this game?");
    if(isConfirmed)
    {
        api.del(`/data/games/${id}`);
        page('/dashboard');
    }
    else
    {
        return;
    }
}

async function likesQty(gameId)
{
    return await api.get(`/data/likes?where=gameId%3D%22${gameId}%22&distinct=_ownerId&count`);
}

async function likeGame(id)
{
    await api.post('/data/likes', {'gameId': id});
    detailsView(id);
}

async function isAlreadyLiked(gameId)
{
    const userId = userHelp.getUserId();
    const isLiked = await api.get(`/data/likes?where=gameId%3D%22${gameId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
    return isLiked;
}

export const gamesService = {
    getAllGames,
    getGameById,
    getOwnerId,
    createGame,
    editGame,
    deleteGame,
    likesQty,
    likeGame,
    isAlreadyLiked
}