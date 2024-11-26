document.addEventListener('DOMContentLoaded', () => {
  // Adiciona o evento de clique para expandir os e-mails
  document.querySelector('.email-list').addEventListener('click', (event) => {
    const emailItem = event.target.closest('.email-item');
    
    // Verifica se o clique foi em um item de e-mail e não no botão "Marcar como lida"
    if (emailItem && !event.target.classList.contains('mark-read') && !event.target.closest('.email-actions')) {
      expandEmail(emailItem); // Chama a função de expandir o e-mail
    }
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
