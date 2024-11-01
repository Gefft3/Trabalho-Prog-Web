const password = document.getElementById("password");
const icon = document.getElementById("togglePassword");

// Função para mostrar ou esconder o ícone ao digitar
function iconVisibility() {
  if (password.value) {
    icon.style.display = "block"; // Exibe o ícone se o campo estiver sendo preenchido
  }
  else {
    icon.style.display = "none"; // Oculta o ícone se o campo estiver vazio
  }
}

// Função para alternar entre mostrar ou ocultar a senha
function passwordVisibility() {
  // Verifica o tipo atual e altera para o oposto
  if (password.getAttribute("type") === "password") {
    password.setAttribute("type", "text"); // Muda para "text" e deixa vísivel a senha
  }
  else {
    password.setAttribute("type", "password"); // Muda para 'password' e não deixa vísivel a senha
  }
  // Alterna as classes do ícone para mudar a aparência
  icon.classList.toggle("fa-eye");       // Adiciona o ícone de olho aberto
  icon.classList.toggle("fa-eye-slash"); // Adiciona o ícone de olho fechado
}

// Adiciona os ouvintes de evento
password.addEventListener("input", iconVisibility);
icon.addEventListener("click", passwordVisibility);
