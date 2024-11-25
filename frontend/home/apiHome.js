document.addEventListener('DOMContentLoaded', () => {
    getEmails(); 
});

async function getEmails() {
    try {
        const response = await fetch('http://localhost:3000/api/emails', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json' 
            }
        });

        const data = await response.json();

        if (response.ok) {
            console.log(data); // Log para verificar a resposta do servidor
            displayEmails(data); // Chama a função para exibir os e-mails na tela
        } else {
            alert(`${data.message}`);
        }
    } catch (error) {
        console.error(error);
        alert('Erro ao carregar e-mails. Tente novamente.');
    }
}

// Função para exibir os e-mails no formato do HTML
function displayEmails(emails) {
    
    const emailListContainer = document.querySelector('.email-list');
    emailListContainer.innerHTML = '';

    emails.forEach(email => {
        const emailItem = document.createElement('div');
        emailItem.classList.add('email-item');
        emailItem.setAttribute('onclick', 'expandEmail(this)'); // Irá associar a função de expandir ao clicar

        const emailInfo = document.createElement('div');
        emailInfo.classList.add('email-info');

        const sender = document.createElement('span');
        sender.classList.add('sender');
        sender.textContent = email.sender;

        const subject = document.createElement('span');
        subject.classList.add('subject');
        subject.textContent = `Assunto: ${email.subject}`;

        const status = document.createElement('span');
        status.classList.add('status');
        status.textContent = `Status: ${email.status}`;

        const date = document.createElement('span');
        date.classList.add('date');
        date.textContent = email.send_date;

        emailInfo.append(sender, subject, status, date);

        const emailBody = document.createElement('p');
        emailBody.textContent = email.content;

        const emailActions = document.createElement('div');
        emailActions.classList.add('email-actions');

        const replyButton = document.createElement('button');
        replyButton.classList.add('reply');
        replyButton.textContent = 'Responder';

        const markReadButton = document.createElement('button');
        markReadButton.classList.add('mark-read');
        markReadButton.textContent = 'Marcar como lida';

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete');
        deleteButton.textContent = 'Deletar';

        emailActions.append(replyButton, markReadButton, deleteButton);

        emailItem.append(emailInfo, emailBody, emailActions);
        emailListContainer.append(emailItem);
    });
}
