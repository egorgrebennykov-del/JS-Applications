function setUser(data)
{
    sessionStorage.setItem('userInfo', JSON.stringify(data));
}

function getUserData()
{
    const data = sessionStorage.getItem('userInfo')
    return data ? JSON.parse(data) : null;
}

function getAccessToken()
{
   const user = getUserData();
   return user ? user.accessToken : null;
}

function isAuthorized()
{
    return !!getUserData();
}

function getUserId()
{
    const user = getUserData();
    return user ? user._id : null;
}

function clearUser()
{
    sessionStorage.clear();
}

export const userHelp = {
    setUser,
    getUserData,
    getAccessToken,
    isAuthorized,
    getUserId,
    clearUser
}