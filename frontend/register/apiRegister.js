document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('registerForm').addEventListener('submit', registerUser);
});

async function registerUser(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log(name, email, password);
    
    try {
        const response = await fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Registro bem-sucedido!');
            console.log('Usuário cadastrado!');
            window.location.href = '../login/login.html';
        } else {
            alert(`Erro: ${data.message}`);
        }
    } catch (error) {
        console.error(error);
        alert(error);
    }
};
