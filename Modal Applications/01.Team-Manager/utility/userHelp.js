function setUser(data)
{
    sessionStorage.setItem('userInfo', JSON.stringify(data));
}

function getUserInfo()
{
    const data = sessionStorage.getItem('userInfo');
    return data ? JSON.parse(data) : null;
}

function getAccessToken()
{
    const user = getUserInfo();
    return user ? user.accessToken : null;
}

function isAuthorized()
{
    return !!getUserInfo();
}

function clearUser()
{
    sessionStorage.removeItem('userInfo');
}

export const userHelp = {
    setUser,
    getUserInfo,
    getAccessToken,
    isAuthorized,
    clearUser
}