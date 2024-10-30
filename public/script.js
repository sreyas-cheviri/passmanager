const form = document.getElementById('password-form');
const passli = document.getElementById('password-list');
// const dropdown = document.getElementById('dropdown');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    try {
        const response = await axios.post('/add', { name, password });
        const data = response.data;
        localStorage.setItem('data', JSON.stringify(data));
        displayp(data); form.reset();
    }
    catch (error) {
        console.log(error);
    }
});

function displayp(data) {
    passli.innerHTML = '';
    data.forEach(({ name, password }) => {
        const list = document.createElement('li');
        list.innerHTML = `${name}:${password}`;

        list.addEventListener('click', () => {
            list.classList.toggle('strike');
            deletepas(name);
        })

        passli.appendChild(list);

    })
}

function dropdown() {
    if (passli.style.display === 'none') {
        passli.style.display = 'block';
    } else {
        passli.style.display = 'none'
    }
}



async function deletepas(name) {
    try {
        const val = await axios.post('/delete', { name })
        localStorage.setItem('data', JSON.stringify(val.data));

    } catch (error) {
        console.log(error);

    }
}
document.addEventListener('DOMContentLoaded', () => {
    const storedData = JSON.parse(localStorage.getItem('data')) || [];
    displayp(storedData);
});

const togglePasswordBtn = document.getElementById('toggle-password');
const passw = document.getElementById('password');

togglePasswordBtn.addEventListener('click', () => {
    passw.type === 'password' ? passw.type = 'text' : passw.type = 'password';
});
