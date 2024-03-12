export const SignupView = () => {  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  
  const handleSubmit = (event) => {

    event.preventDefault();

    const data = {
      access: username,
      secret: password,
    };-

    fetch('https://myflixdb1329-efa9ef3dfc08.herokuapp.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      console.log("signup responses", data); 
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }

  return (
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} required minLength="3" />
          </label>
          <label>
            Password: 
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required/>
          </label>
          <label>
            Email:
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required/>
          </label>
          <label>
            Birthday:
            <input type="date" value={birthday} onChange={e => setBirthday(e.target.value)} required/>
          </label>
          <button type="submit">Submit</button>
      </form>
  );
};

