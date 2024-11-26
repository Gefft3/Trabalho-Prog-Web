document.addEventListener('DOMContentLoaded', () => {
  getMessages();
  // Atribui o evento de clique a todos os botões de "Marcar como lida" após o carregamento
  document.querySelectorAll('.mark-read').forEach(button => {
    button.addEventListener('click', (event) => {
      event.stopPropagation(); // Impede a propagação do evento e impede que o e-mail seja expandido
      markAsRead(event);
    });
  });
});

async function getMessages() {

  try {

    const email = localStorage.getItem('userEmail');

    // Fazer a requisição GET para buscar os e-mails
    const response = await fetch(`http://localhost:3000/api/home?email=${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Se a requisição for bem-sucedida, retorna os e-mails
    if (response.ok) {
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

async function markAsRead(event) {
  event.stopPropagation(); // Impede a propagação do evento e impede que o e-mail seja expandido

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
    const response = await fetch(`http://localhost:3000/api/update-status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emailId: emailId,  // ID do e-mail
        newStatus: newStatus,  // Novo status a ser atualizado
      }),
    });

    if (response.ok) {
      console.log('Status atualizado com sucesso!');
    } else {
      console.error('Erro ao atualizar o status do e-mail.');
      const data = await response.json();
      console.error(data.message); // Exibe a mensagem de erro retornada pelo servidor
    }
  } catch (error) {
    console.error('Erro de rede ao tentar atualizar o status:', error);
  }
}