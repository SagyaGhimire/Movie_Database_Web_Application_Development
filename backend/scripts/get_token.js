
(async function(){
  try {
    const email = 'ai-test@example.com';
    const password = 'password123';
    // Try login first
    let res = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    let json = await res.json();
    if (res.status === 200 && json.token) {
      console.log(JSON.stringify({ action: 'login', token: json.token, user: json.user }));
      return;
    }
    // If login failed, register
    res = await fetch('http://localhost:3001/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'AI Test', email, password })
    });
    json = await res.json();
    if (res.status === 201 && json.token) {
      console.log(JSON.stringify({ action: 'register', token: json.token, user: json.user }));
      return;
    }
    console.error('Unexpected response', res.status, json);
  } catch (err) {
    console.error('Error in get_token script:', err.message || err);
  }
})();
