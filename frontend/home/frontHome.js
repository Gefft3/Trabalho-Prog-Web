document.addEventListener('DOMContentLoaded', () => {
  // Adiciona um listener para expandir os e-mails ao serem clicados
  const emailItems = document.querySelectorAll('.email-item');
  emailItems.forEach(emailItem => {
    emailItem.addEventListener('click', () => expandEmail(emailItem));
  });
});

async function expandEmail(emailElement) {
  // Verifica se o elemento existe antes de acessar suas propriedades
  if (!emailElement) return;

  // Verifica se o email já está expandido
  if (!emailElement.classList.contains('expanded')) {
    // Expande o email adicionando a classe 'expanded'
    emailElement.classList.add('expanded');

    // Cria o fundo escurecido (overlay) e adiciona ao corpo da página
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    // Define que ao clicar no fundo escurecido o email será fechado
    overlay.onclick = function () {
      emailElement.classList.remove('expanded'); // Remove a expansão
      overlay.remove(); // Remove o fundo escurecido
    };
  }
}

// Função para exibir os e-mails no formato do HTML
function displayEmails(emails) {
    
  const emailListContainer = document.querySelector('.email-list');

  emails.forEach(email => {
      const emailItem = document.createElement('div');
      emailItem.classList.add('email-item');
      emailItem.setAttribute('onclick', 'expandEmail(this)'); // Irá associar a função de expandir ao clicar

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
      markReadButton.textContent = 'Marcar como lida';

      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete');
      deleteButton.textContent = 'Deletar';

      emailActions.append(replyButton, markReadButton, deleteButton);

      emailItem.append(emailInfo, emailBody, emailActions);
      emailListContainer.append(emailItem);
  });
}


