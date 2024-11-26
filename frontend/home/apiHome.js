function checkAuthentication() {
  const token = localStorage.getItem('authToken');
  if (!token) {
    alert('Você precisa estar logado para acessar esta página.');  
    window.location.href = '../login/login.html';
  }
}

checkAuthentication();

document.addEventListener('DOMContentLoaded', () => {

  getMessages();

  document.querySelector('.email-list').addEventListener('click', (event) => {
    if (event.target.classList.contains('mark-read')) {
      event.stopPropagation();
      markAsRead(event);
    } else if (event.target.classList.contains('delete')) {
      event.stopPropagation();
      const emailId = event.target.closest('.email-item').getAttribute('data-email-id');
      deleteEmail(emailId, event.target.closest('.email-item'));
    }
  });

  document.getElementById('logout').addEventListener('click', logout);
});

async function getMessages() {
  try {
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('authToken');

    if (!email) {
      alert('E-mail não encontrado no armazenamento local.');
      return;
    }
    
    const response = await fetch(`http://localhost:3000/api/home?email=${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();

      if (data.message) {
        alert(data.message);  
      } else {
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
  const button = event.target;
  const emailId = emailItem.getAttribute('data-email-id');
  let newStatus = '';

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

  try {
    const response = await fetch('http://localhost:3000/api/updateStatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ emailId, newStatus }),
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
  emailListContainer.innerHTML = ''; 

  emails.forEach(email => {
    const emailItem = document.createElement('div');
    emailItem.classList.add('email-item');
    emailItem.setAttribute('data-email-id', email.id);

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
    status.textContent = `Status: ${email.status}`;

    const date = document.createElement('span');
    date.classList.add('date');
    date.textContent = new Date(email.send_date).toLocaleDateString('pt-BR');

    emailInfo.append(sender, subject, status, date);

    const emailBody = document.createElement('p');
    emailBody.textContent = email.content;

    const emailActions = document.createElement('div');
    emailActions.classList.add('email-actions');

    const markReadButton = document.createElement('button');
    markReadButton.classList.add('mark-read');
    markReadButton.textContent = email.status === 'Novo' ? 'Marcar como lida' : 'Marcar como novo';

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete');
    deleteButton.textContent = 'Deletar';

    emailActions.append(markReadButton, deleteButton);

    emailItem.append(emailInfo, emailBody, emailActions);
    emailListContainer.append(emailItem);

    if (email.status === 'Novo') {
      emailItem.classList.add('new');
    } else {
      emailItem.classList.add('read');
    }
  });
}

async function deleteEmail(emailId, emailItem) {
  try {
    const response = await fetch('http://localhost:3000/api/deleteEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ emailId }),
    });

    if (response.ok) {
      emailItem.remove();  // Remove o e-mail da interface
      alert('E-mail deletado com sucesso!');
    } else {
      alert('Erro ao deletar o e-mail.');
    }
  } catch (error) {
    console.error('Erro ao deletar o e-mail:', error);
    alert('Erro ao tentar excluir o e-mail.');
  }
}

function logout() {
  localStorage.removeItem('email');
  localStorage.removeItem('authToken'); 
  alert('Você foi desconectado!');
  window.location.href = '../login/login.html';
}
