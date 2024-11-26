// Executa a função ao carregar a página
window.onload = () => {
  // Obtém o valor do parâmetro "replyTo" da URL
  const replyTo = new URLSearchParams(location.search).get('replyTo');

  // Se o parâmetro "replyTo" existir, preenche o campo "Para" com esse valor
  if (replyTo) {
    document.getElementById('to').value = replyTo;
  }
};

// Função para limpar os campos do formulário
window.clearForm = function () {
  document.getElementById('to').value = '';
  document.getElementById('subject').value = '';
  document.getElementById('body').value = '';
};