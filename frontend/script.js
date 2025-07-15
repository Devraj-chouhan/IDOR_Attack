document.getElementById("loginBtn").onclick = async () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const response = await fetch("https://idor-attack.onrender.com/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const result = await response.json();
  if (result.success) {
    localStorage.setItem("username", username);
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("loginStatus").innerText = result.message;
  }
};
