document.getElementById("loginBtn").onclick = () => {
  const username = document.getElementById("username").value;
  const enteredPassword = document.getElementById("password").value;

  const storedPassword = localStorage.getItem(`password_${username}`);

  if (storedPassword && storedPassword === enteredPassword) {
    localStorage.setItem("username", username); // store session info
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("loginStatus").innerText = "❌ Invalid username or password";
  }
};
