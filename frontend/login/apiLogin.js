document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loginForm').addEventListener('submit', loginUser);
});

async function loginUser(event) {

    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Logou!');
            localStorage.setItem('userEmail', email); // Salvando o e-mail do usuário no Local Storage
            window.location.href = '../home/home.html';
        } else {
            alert(`${data.message}`);
        }
    } catch (error) {
        console.error(error);
        alert(error);
    }
}
