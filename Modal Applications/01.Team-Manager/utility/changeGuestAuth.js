import { userHelp } from "./userHelp.js";

export function changeGuestAuth()
{
    const guest = document.querySelectorAll('.guest');
    const auth = document.querySelectorAll('.auth');

    if(userHelp.isAuthorized())
    {
        auth.forEach(e => e.classList.remove('hidden'));
        guest.forEach(e => e.classList.add('hidden'));
    }
    else
    {
        auth.forEach(e => e.classList.add('hidden'));
        guest.forEach(e => e.classList.remove('hidden'));
    }
}