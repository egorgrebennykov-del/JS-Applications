async function attachEvents() {
    BASE_URL = 'http://localhost:3030/jsonstore/blog/';

    const response = await fetch(BASE_URL + 'posts');
    const data = await response.json();

    const loadPostsBtn = document.getElementById('btnLoadPosts');
    const viewPostBtn = document.getElementById('btnViewPost');
    loadPostsBtn.addEventListener('click', () => loadPosts(data));
    viewPostBtn.addEventListener('click', () => viewPost(data));

    function addNewOption(post)
    {
        const select = document.getElementById('posts');
        const option = document.createElement('option');
        option.textContent = post.title;
        option.value = post.id;

        select.appendChild(option);
    }

    function loadPosts(data)
    {
        const select = document.getElementById('posts');

        if(!select.options.length)
        {
            Object.values(data).forEach(post => {
                addNewOption(post);
            });
        }
    }

    async function viewPost(data)
    {
        const select = document.getElementById('posts');
        const selectedId = select.value;


        const rightPost = Object.values(data).find(post => post.id === selectedId);

        const title = document.getElementById('post-title');
        const postText = document.getElementById('post-body');

        postText.textContent = rightPost.body;
        title.textContent = rightPost.title;

        const commentResponse = await fetch(BASE_URL + 'comments');
        const commentsData = await commentResponse.json();

        const list = document.getElementById('post-comments');
        list.innerHTML = '';

        Object.values(commentsData).forEach(comment => {

            if(comment.postId === selectedId)
            {
                const li = document.createElement('li');
                li.id = comment.id;
                li.textContent = comment.text;
                list.appendChild(li);
            }
        });
    }
}

attachEvents();