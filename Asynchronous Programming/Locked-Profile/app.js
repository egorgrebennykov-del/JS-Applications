async function lockedProfile() {
    const profilesInfo = await fetch('http://localhost:3030/jsonstore/advanced/profiles');
    const data = await profilesInfo.json();

    let usersCount = 1;

    document.querySelector('.profile').remove();

    function showMore(e)
    {
        const userID = e.target.id;
        const unlockedRadio = document.querySelector(`input[name="user${userID}Locked"][value="unlock"]`);

        if(unlockedRadio.checked)
        {
            const hiddenDiv = document.getElementById(`user${userID}hiddenInfo`);
            hiddenDiv.style.display = hiddenDiv.style.display === 'block' ? 'none' : 'block';
            e.target.textContent = e.target.textContent === 'Show more' ? 'Hide it' : 'Show more';
        }
    }

    function newUser(userInfo)
    {
        const user = document.createElement('div');
        user.className = 'profile';
        user.id = `user${usersCount}`;

        user.innerHTML = `
				<img src="./iconProfile2.png" class="userIcon" />
				<label>Lock</label>
				<input type="radio" name="user${usersCount}Locked" value="lock" checked>
				<label>Unlock</label>
				<input type="radio" name="user${usersCount}Locked" value="unlock"><br>
				<hr>
				<label>Username</label>
				<input type="text" name="user${usersCount}Username" value="${userInfo.username}" disabled readonly />
				<div class="hiddenInfo" id="user${usersCount}hiddenInfo" style="display: none;">
					<hr>
					<label>Email:</label>
					<input type="email" name="user${usersCount}Email" value="${userInfo.email}" disabled readonly />
					<label>Age:</label>
					<input type="number" name="user${usersCount}Age" value="${userInfo.age}" disabled readonly />
                </div>

                <button id = "${usersCount}">Show more</button>`;

        document.getElementById('main').appendChild(user);

        const button = user.querySelector('button');
        button.addEventListener('click', showMore);
        usersCount++;
    }

    Object.values(data).forEach(userInfo => {
        newUser(userInfo);
    });
}