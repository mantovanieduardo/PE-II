const users = {
  "escola teste": "123Escola",
  "admin": "123Admin" // Usuário admin padrão
};

const agendamentos = [
  { recurso: "Biblioteca", data: "2024-11-15", horario: "10:00", nome: "Professor João", user: "escola teste" }
];

// Função de login
function login(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  
  if (users[username] === password) {
    document.getElementById("loginContainer").classList.add("hidden");
    document.getElementById("agendamentoContainer").classList.remove("hidden");
  } else {
    mostrarFeedback("Login ou senha incorretos!", "red");
  }
}

// Função para exibir a tela de cadastro
function showRegister() {
  document.getElementById("loginContainer").classList.add("hidden");
  document.getElementById("registerContainer").classList.remove("hidden");
}

// Função para exibir a tela de login
function showLogin() {
  document.getElementById("registerContainer").classList.add("hidden");
  document.getElementById("loginContainer").classList.remove("hidden");
}

// Função de cadastro de novo usuário
function register(event) {
  event.preventDefault();
  const newUsername = document.getElementById("newUsername").value.trim();
  const newPassword = document.getElementById("newPassword").value.trim();

  if (!newUsername || !newPassword) {
    mostrarFeedback("Preencha todos os campos!", "red");
    return;
  }

  if (users.hasOwnProperty(newUsername)) {
    mostrarFeedback("Este nome de usuário já existe!", "red");
  } else {
    users[newUsername] = newPassword;
    mostrarFeedback("Usuário cadastrado com sucesso!", "green");
    showLogin();
  }
}

// Função para avançar etapas no agendamento
function nextStep(step) {
  document.getElementById(`step${step - 1}`).classList.add("hidden");
  document.getElementById(`step${step}`).classList.remove("hidden");
}

// Função para confirmar agendamento
function submitAgendamento() {
  const tipoAgendamento = document.getElementById("tipoAgendamento").value;
  const data = document.getElementById("data").value;
  const horario = document.getElementById("horario").value;
  const nome = document.getElementById("username").value;

  if (agendamentos.some(ag => ag.recurso === tipoAgendamento && ag.data === data && ag.horario === horario)) {
    mostrarFeedback("Este horário já está reservado!", "red");
  } else {
    agendamentos.push({ recurso: tipoAgendamento, data, horario, nome });
    mostrarFeedback("Agendamento realizado com sucesso!", "green");
  }
}

// Função para voltar à seleção do tipo de agendamento (Novo Agendamento)
function newAgendamento() {
  document.getElementById("step2").classList.add("hidden");
  document.getElementById("step1").classList.remove("hidden");
}

// Função para voltar ao menu principal (tela de login ou agendamento principal)
function voltarMenuPrincipal() {
  document.getElementById("agendamentoContainer").classList.add("hidden");
  document.getElementById("loginContainer").classList.remove("hidden");
}

// Função para mostrar feedback de operação
function mostrarFeedback(message, color) {
  const feedbackDiv = document.getElementById('feedback');
  feedbackDiv.innerHTML = message;
  feedbackDiv.style.color = color;
  feedbackDiv.classList.remove("hidden");

  setTimeout(() => {
    feedbackDiv.classList.add("hidden");
  }, 2000);
}
