export function formService(e)
{
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    e.target.reset();

    return data;
}

/*accessToken
: 
"7e3277e4d9a14214e0a07faa966b148b3733b0df863e738d5e362995b6c1ed62"
email
: 
"egor.ebennykov@gmail.com"
password
: 
"123"
repass
: 
"123"
username
: 
"EgorGr08"
_createdOn
: 
1774424700036
_id
: 
"c072aafa-bcc4-4421-9f98-5ed4bac34ea6"*/