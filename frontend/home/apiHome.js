document.addEventListener('DOMContentLoaded', () => {

  getMessages(); // Chama a função para buscar os e-mails

  document.querySelector('.email-list').addEventListener('click', (event) => {
    if (event.target.classList.contains('mark-read')) {
      event.stopPropagation();
      markAsRead(event);
    } else if (event.target.classList.contains('delete')) {
      event.stopPropagation();
      const emailId = event.target.closest('.email-item').getAttribute('data-email-id');
      deleteEmail(emailId, event.target.closest('.email-item'));  // Chama a função para deletar
    }
  });
});

async function getMessages() {
  try {
    const email = localStorage.getItem('userEmail');

    // Fazer a requisição GET para buscar os e-mails
    const response = await fetch(`http://localhost:3000/api/home?email=${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Exibe o status da resposta para debug
    console.log(`Status da resposta: ${response.status}`);

    // Se a requisição for bem-sucedida, processa o retorno
    if (response.ok) {
      const data = await response.json();

      // Exibe o conteúdo retornado para debug
      console.log('Resposta do backend:', data);

      // Trata caso de caixa de entrada vazia
      if (data.message) {
        alert(data.message);
      } else {
        // Exibe os e-mails na interface
        displayEmails(data);
      }
    } else {
      alert('Erro ao buscar os e-mails.');
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
  }
}

async function markAsRead(event) {
  const emailItem = event.target.closest('.email-item');
  const statusElement = emailItem.querySelector('.email-info .status');
  const button = event.target; // Botão clicado
  const emailId = emailItem.getAttribute('data-email-id');  // ID do e-mail

  let newStatus = '';

  // Altera o status e o botão
  if (statusElement.textContent === "Status: Novo") {
    statusElement.textContent = "Status: Lido";
    button.textContent = "Marcar como novo";
    emailItem.classList.remove('new');
    emailItem.classList.add('read');
    newStatus = 'Lido';
  } else {
    statusElement.textContent = "Status: Novo";
    button.textContent = "Marcar como lida";
    emailItem.classList.remove('read');
    emailItem.classList.add('new');
    newStatus = 'Novo';
  }

  // Atualiza o status no banco de dados
  try {
    const response = await fetch(`http://localhost:3000/api/updateStatus`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emailId: emailId,  // ID do e-mail
        newStatus: newStatus,  // Novo status a ser atualizado
      }),
    });

    if (!response.ok) {
      console.error('Erro ao atualizar o status do e-mail.');
    }
  } catch (error) {
    console.error('Erro de rede ao tentar atualizar o status:', error);
  }
}

function displayEmails(emails) {

  const emailListContainer = document.querySelector('.email-list');

  emails.forEach(email => {
    const emailItem = document.createElement('div');
    emailItem.classList.add('email-item');
    emailItem.setAttribute('data-email-id', email.id); // Atribuindo ID do e-mail

    const emailInfo = document.createElement('div');
    emailInfo.classList.add('email-info');

    const sender = document.createElement('span');
    sender.classList.add('sender');
    sender.textContent = `De: ${email.sender_email}`;

    const subject = document.createElement('span');
    subject.classList.add('subject');
    subject.textContent = `Assunto: ${email.subject}`;

    const status = document.createElement('span');
    status.classList.add('status');
    status.textContent = `Status: ${email.status}`; // Exibe o status do banco

    const date = document.createElement('span');
    date.classList.add('date');
    const formattedDate = new Date(email.send_date).toLocaleDateString('pt-BR');
    date.textContent = formattedDate;

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
    markReadButton.textContent = email.status === 'Novo' ? 'Marcar como lida' : 'Marcar como novo';

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete');
    deleteButton.textContent = 'Deletar';

    emailActions.append(replyButton, markReadButton, deleteButton);

    emailItem.append(emailInfo, emailBody, emailActions);
    emailListContainer.append(emailItem);

    // Aplica a classe para a aparência visual de 'Novo' ou 'Lido'
    if (email.status === 'Novo') {
      emailItem.classList.add('new');
    } else {
      emailItem.classList.add('read');
    }
  });
}

async function deleteEmail(emailId, emailItem) {
  try {
    // Faz a requisição para deletar o e-mail no banco de dados
    const response = await fetch('http://localhost:3000/api/deleteEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ emailId }),
    });

    if (response.ok) {
      // Se a exclusão no banco for bem-sucedida, remove o e-mail da interface
      emailItem.remove();  // Remove o item da lista de e-mails

      // Exibe o alerta de confirmação
      alert('E-mail deletado com sucesso!');
    } else {
      alert('Erro ao deletar o e-mail.');
    }
  } catch (error) {
    console.error('Erro ao deletar o e-mail:', error);
    alert('Erro ao tentar excluir o e-mail.');
  }
}