// sine-up Page
var username = document.getElementById("name-sign");
var suEmail = document.getElementById("email-sign");
var suPass = document.getElementById("pass-sign");
var indx = 0;
var signupData = [];

// Retrieve signupData from local storage
if (localStorage.getItem("signupData") != null) {
  signupData = JSON.parse(localStorage.getItem("signupData"));
}

function main() {
  addUser();
}

function addUser() {
  if (nameValidation() && mailValidation() && passValidation()) {
    var data = {
      name: username.value,
      mail: suEmail.value,
      pass: suPass.value,
    };
    signupData.push(data);
    localStorage.setItem("signupData", JSON.stringify(signupData));
    document.getElementById("success-msg").classList.remove("d-none");
    document.getElementById("warning-msg").classList.add("d-none");
    refillsu();
    window.location = "index.html";
  } else {
    document.getElementById("warning-msg").classList.remove("d-none");
    document.getElementById("success-msg").classList.add("d-none");
  }
}

function refillsu() {
  username.value = "";
  suEmail.value = "";
  suPass.value = "";
}

function nameValidation() {
  var names = username.value;
  var regexName = /^[A-z]{1,}( [A-z]{1,} *)*$/;
  if (regexName.test(names) == true) {
    username.classList.add("is-valid");
    username.classList.remove("is-invalid");
    return true;
  } else {
    username.classList.remove("is-valid");
    username.classList.add("is-invalid");
    return false;
  }
}

function mailValidation() {
  var mail = suEmail.value;
  var mailregex = /^\w{1,}@(yahoo|gmail|hotmail)\.com$/;
  if (mailregex.test(mail)) {
    suEmail.classList.add("is-valid");
    suEmail.classList.remove("is-invalid");
    return true;
  } else {
    suEmail.classList.remove("is-valid");
    suEmail.classList.add("is-invalid");
    return false;
  }
}

function mailEntering() {
  for (var x = 0; x < signupData.length; x++) {
    if (suEmail.value == signupData[x].mail) {
      document.getElementById("validmail").classList.remove("d-none");
    } else {
      document.getElementById("validmail").classList.add("d-none");
    }
  }
}

function passValidation() {
  var pass = suPass.value;
  var regexPass = /^.{1,}$/;
  if (regexPass.test(pass) == true) {
    suPass.classList.add("is-valid");
    suPass.classList.remove("is-invalid");
    return true;
  } else {
    suPass.classList.remove("is-valid");
    suPass.classList.add("is-invalid");
    return false;
  }
}

// login-page
var lemail = document.getElementById("email-login");
var lpass = document.getElementById("pass-login");

// login function
function login() {
  isEmpty();
  check();
}

function check() {
  for (var i = 0; i < signupData.length; i++) {
    indx = i;
    if (
      signupData[i].mail == lemail.value &&
      signupData[i].pass == lpass.value
    ) {
      localStorage.setItem("emailLogin", lemail.value);
      document.getElementById("warning").classList.add("d-none");
      window.location.href = "welcome.html";
    } else if (lpass.value != "" && lemail.value != "") {
      document.getElementById("warning").classList.remove("d-none");
    }
  }
}

function logout() {
  window.location.href = "index.html";
  localStorage.removeItem("emailLogin");
}

function isEmpty() {
  if (lemail.value == "" || lpass.value == "") {
    document.getElementById("ok").classList.remove("d-none");
    document.getElementById("warning").classList.add("d-none");
  } else {
    document.getElementById("ok").classList.add("d-none");
  }
}

// welcome page
const nameUser = document.getElementById("welcome-name");

const assumedLoggedInEmail = localStorage.getItem("emailLogin");

const loggedInUser = signupData.find(
  (user) => user.mail === assumedLoggedInEmail
);

const nameLocal = loggedInUser ? loggedInUser.name : null;

if (nameLocal) {
  nameUser.innerHTML = nameLocal;
  console.log("Displaying Name:", nameLocal);
} else {
  nameUser.innerHTML = "Welcome, Guest!";
  console.log("No name found for the assumed logged-in user");
}
