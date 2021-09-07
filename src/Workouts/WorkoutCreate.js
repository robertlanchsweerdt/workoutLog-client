import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const WorkoutCreate = (props) => {
  const [description, setDescription] = useState('');
  const [definition, setDefinition] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const reqBody = {
      description,
      definition,
      result,
    };

    const CREATE_LOG_URL = 'http://localhost:5000/log/';

    fetch(CREATE_LOG_URL, {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: props.token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDescription('');
        setDefinition('');
        setResult('');
        props.fetchWorkouts();
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <h3>Log a Workout</h3>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor='description' />
          <Input
            name='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor='definition' />
          <Input
            type='select'
            name='definition'
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
          >
            <option value='n/a'>Select your definition</option>
            <option value='Time'>Time</option>
            <option value='Weight'>Weight</option>
            <option value='Distance'>Distance</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label htmlFor='result' />
          <Input
            name='result'
            value={result}
            onChange={(e) => setResult(e.target.value)}
          />
        </FormGroup>
        <Button type='submit'>Click to Submit</Button>
      </Form>
    </>
  );
};

export default WorkoutCreate;
