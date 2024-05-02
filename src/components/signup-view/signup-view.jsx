export const SignupView = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch('https://myflixdb1329-efa9ef3dfc08.herokuapp.com/users', {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" }
    }).then((response) => {
      if (response.ok) {
        alert("Signup Successful");
        // Update state or perform any other action after successful signup
      } else {
        alert("Signup failed, try again");
      }
    }).catch((error) => {
      alert("An error occurred, please try again");
    });
  }; 

  return (
    <Form onSubmit={handleSubmit}>
        <Form.Group controlId='formUsername'>
            <Form.Label>Username: </Form.Label>
            <Form.Control
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength='5'
            />
        </Form.Group>

        <Form.Group controlId='formPassword'>
            <Form.Label>Password: </Form.Label>
            <Form.Control
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
        </Form.Group>

        <Form.Group controlId='formEmail'>
            <Form.Label>Email: </Form.Label>
            <Form.Control
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
        </Form.Group>

        <Form.Group controlId='formBirthDate'>
            <Form.Label>Birthday: </Form.Label>
            <Form.Control
                type='date'
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
        required
      />
      </Form.Group>
      <br />
   
      <Button variant="primary" type="submit"> Sign up </Button>
    </Form>
  );
};
// Path: src/components/login-view/login-view.jsx
