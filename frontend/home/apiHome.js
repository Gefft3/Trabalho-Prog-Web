document.addEventListener('DOMContentLoaded', () => {
    getMessages();
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

    event.stopPropagation(); // Impede que o clique abra o e-mail
  
    const emailItem = event.target.closest('.email-item');
    const statusElement = emailItem.querySelector('.email-info .status');
    const button = event.target; // Botão clicado
     const emailId = emailItem.querySelector('.email-info').getAttribute('data-email-id');
  
    let newStatus = '';
  
    // Verifica o status atual do e-mail e altera
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
  
    // Envia a atualização para o backend
    try {
      const response = await fetch('http://localhost:3000/api/updateStatus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          emailId: emailId,
          newStatus: newStatus,
        }),
      });
  
      if (response.ok) {
        console.log('Status atualizado com sucesso!');
      } else {
        console.error('Erro ao atualizar o status do e-mail.');
      }
    } catch (error) {
      console.error('Erro de rede ao tentar atualizar o status:', error);
    }
  }