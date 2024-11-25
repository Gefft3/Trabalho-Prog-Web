document.addEventListener('DOMContentLoaded', () => {
    getMessages(); 
});

async function getMessages() {
    try {

        // Fazer a requisição GET para buscar os e-mails
        const response = await fetch('http://localhost:3000/api/home', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json' 
            }
        });

         // Se a requisição for bem-sucedida, retorna os e-mails
         if (response.ok) {
            alert(' CONCLUIDA');
            const data = await response.json();
            console.log(data);
            displayEmails(data);
        } else {
            alert('ERROR ');
            throw new Error('Erro ao buscar os e-mails.');
        }
    } catch (error) {
        console.error(error);
        return []; // Retorna um array vazio caso ocorra algum erro
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
