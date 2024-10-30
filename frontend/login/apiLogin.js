async function loginUser() {
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
            alert('deu certo');
            console.log('deu certo');
        } else {
            alert(`deu errado, pq: ${data.message}`);
        }
    } catch (error) {
        console.error('deu errado', error);
        alert('deu errado');
    }
}
