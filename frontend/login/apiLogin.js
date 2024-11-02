document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loginForm').addEventListener('submit', loginUser);
}); 

async function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log(email, password);

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
            window.location.href = 'http://127.0.0.1:3001/frontend/home/home.html'
        } else {
            alert(`${data.message}`);
        }
    } catch (error) {
        console.error(error);
        alert(error);
    }
}
