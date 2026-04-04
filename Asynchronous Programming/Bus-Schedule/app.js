async function solve() {
    const info = document.getElementById('info');
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');

    let currentId = 'depot';
    let nextStop = '';

    info.querySelector('.info').textContent = 'Not Connected';
    departBtn.disabled = false;
    arriveBtn.disabled = true;

    async function getStop(id) {
        try {
            const res = await fetch(`http://localhost:3030/jsonstore/bus/schedule/${id}`);
            if (!res.ok) throw new Error('Network error');
            return await res.json();
        } catch (err) {
            info.querySelector('.info').textContent = 'Error';
            departBtn.disabled = true;
            arriveBtn.disabled = true;
            return null;
        }
    }

    async function depart() {
      departBtn.disabled = true;
      arriveBtn.disabled = false;

      const data = await getStop(currentId);
      if (!data) {
          departBtn.disabled = true;
          arriveBtn.disabled = true;
          info.querySelector('.info').textContent = 'Error';
          return;
      }

      nextStop = data.name;
      info.querySelector('.info').textContent = `Next stop ${nextStop}`;
      currentId = data.next;
  }

    function arrive() {
        info.querySelector('.info').textContent = `Arriving at ${nextStop}`;
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return { depart, arrive };
}

let result = solve();