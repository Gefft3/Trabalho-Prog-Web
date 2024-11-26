document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loginForm').addEventListener('submit', loginUser);
    document.getElementById('logoutButton')?.addEventListener('click', logoutUser);
});

async function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        console.log('Enviando login para o servidor...');
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Erro no servidor:', errorData.message);
            return alert(`Erro: ${errorData.message}`);
        }

        const data = await response.json();
        console.log('Resposta do servidor:', data);

        if (data.token) {
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('email', email);  
        }

        alert('Login realizado com sucesso!');
        window.location.href = '../home/home.html';
    } catch (error) {
        console.error('Erro ao conectar-se ao servidor:', error);
        alert('Erro ao conectar-se ao servidor. Verifique sua conexão.');
    }
}

