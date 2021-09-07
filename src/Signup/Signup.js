import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

const Signup = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const reqBody = {
      username,
      passwordhash: password,
    };

    const url = 'http://localhost:5000/user/register';

    console.log('Fetching sign-up');

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then((res) => res.json())
      .then((data) => props.updateToken(data.token));
    console.log(username, password);
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor='username'>Username</Label>
          <Input
            name='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
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
        <Button type='submit'>Sign Up</Button>
      </Form>
    </div>
  );
};

export default Signup;
