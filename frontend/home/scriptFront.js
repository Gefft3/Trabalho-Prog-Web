document.addEventListener('DOMContentLoaded', () => {
  expandEmail(); 
});

async function expandEmail(emailElement) {

    // Verifica se o email já está expandido
    if (emailElement.classList.contains('expanded') === false) {
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