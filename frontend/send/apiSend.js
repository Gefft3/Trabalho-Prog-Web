document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('writeForm').addEventListener('submit', sendEmail);
});

async function sendEmail(event) {

    const token = localStorage.getItem('authToken');

    event.preventDefault();

    // Pegando os dados do formulário
    const subject = document.getElementById('subject').value;
    const content = document.getElementById('body').value;
    const recipientEmail = document.getElementById('to').value; // E-mail do destinatário
    const senderEmail = localStorage.getItem('email'); // E-mail do remetente
    const sendDate = new Date().toISOString().split('T')[0];
    const status = "Novo"; 

    try {
        const response = await fetch('http://localhost:3000/api/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
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
            feedbackMessage.textContent = 'E-mail enviado com sucesso!';
            feedbackMessage.style.color = 'green'; // Define a cor da mensagem como verde
            feedbackMessage.style.display = 'block'; // Exibe o feedback
            window.clearForm(); // Limpa o formulário
        }
        else {
            feedbackMessage.textContent = `Erro ao enviar e-mail: ${data.message}`;
            feedbackMessage.style.color = 'red'; // Define a cor da mensagem como vermelha
            feedbackMessage.style.display = 'block'; // Exibe o feedback
        }
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        feedbackMessage.textContent = 'Erro ao enviar e-mail. Tente novamente.';
        feedbackMessage.style.color = 'red'; // Define a cor da mensagem como vermelha
        feedbackMessage.style.display = 'block'; // Exibe o feedback
    }
}
