async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch("https://idor-attack.onrender.com", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  if (data.success) {
    window.location.href = data.redirect;
  } else {
    document.getElementById("login-msg").innerText = data.message;
  }
}

async function forgotPassword() {
  const username = document.getElementById("forgot-username").value;

  const res = await fetch("http://127.0.0.1:5000/forgot-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username })
  });

  const data = await res.json();
  if (data.link) {
    window.location.href = data.link;
  } else {
    document.getElementById("forgot-msg").innerText = "User not found!";
  }
}

async function resetPassword() {
  const urlParams = new URLSearchParams(window.location.search);
  const user = urlParams.get("user");
  const password = document.getElementById("new-password").value;

  const res = await fetch("http://127.0.0.1:5000/reset-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: user, password })
  });

  const data = await res.json();
  if (data.status) {
    document.getElementById("reset-msg").innerText = "✅ Password updated. Try logging in.";
  } else {
    document.getElementById("reset-msg").innerText = "❌ Error updating password.";
  }
}
