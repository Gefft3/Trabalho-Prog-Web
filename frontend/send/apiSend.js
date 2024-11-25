document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('writeForm').addEventListener('submit', sendEmail);
});

async function sendEmail(event) {
    event.preventDefault();

    // Pegando os dados do formulário
    const subject = document.getElementById('subject').value;
    const content = document.getElementById('body').value;
    const recipientEmail = document.getElementById('to').value; // E-mail do destinatário
    const senderEmail = localStorage.getItem('userEmail'); // E-mail do remetente
    const sendDate = new Date().toLocaleDateString('pt-BR');
    const status = 'Novo'; // Status fixo como 'Novo'

    try {
    
        const response = await fetch('http://localhost:3000/api/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                subject,
                content,
                sendDate,
                status,
                senderEmail,
                recipientEmail
            })
        });

        const data = await response.json();

        if (response.ok) {
            console.log('E-mail enviado com sucesso:', data);
            alert('E-mail enviado com sucesso!');
        } else {
            alert(`Erro: ${data.message}`);
        }
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        alert('Erro ao enviar e-mail. Tente novamente.');
    }
}

