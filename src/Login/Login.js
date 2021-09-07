import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const url = 'http://localhost:5000/user/login';
  console.log('API URL -->', url);

  const reqBody = {
    username: username,
    passwordhash: password,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('starting fetch');
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched data -->', data);
        props.updateToken(data.token);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor='username'>Username</Label>
          <Input
            name='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor='password'>Password</Label>
          <Input
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button type='submit'>Login</Button>
      </Form>
    </div>
  );
};

export default Login;
