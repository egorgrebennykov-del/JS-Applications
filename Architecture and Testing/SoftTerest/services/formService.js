export function formService(e)
{
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    e.target.reset()
    return data;
}