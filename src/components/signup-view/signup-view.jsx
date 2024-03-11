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
  
    return (
      <form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </form>
    );
  } 
  };