function setUser(data)
{
    const userInfo = {
        email: data.email,
        accessToken: data.accessToken,
        id: data._id
    };

    sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
}

function getUserData()
{
    return JSON.parse(sessionStorage.getItem('userInfo'));
}

function getAccessToken()
{
    const userData = getUserData();
    return userData ? userData.accessToken : null; 
}

function isAuthorized()
{
    return !!getUserData();
}

function clearUser()
{
    sessionStorage.clear();
}

export const userHelp = {
    setUser,
    getAccessToken,
    isAuthorized,
    getUserData,
    clearUser
}