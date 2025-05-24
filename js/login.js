document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const username = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const response = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem('token', data.token); // Guarda el token
    window.location.href = 'index.html';       // Redirige al dashboard
  } else {
    alert('Credenciales inválidas');
  }
});
