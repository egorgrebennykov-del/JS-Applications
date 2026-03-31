export function formService(e, isEdit)
{
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    if(!isEdit)
    {
       e.target.reset(); 
    }
    return data;
}