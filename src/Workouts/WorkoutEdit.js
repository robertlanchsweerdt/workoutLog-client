import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

const WorkoutEdit = (props) => {
  const [editDesc, setEditDesc] = useState(props.workoutToUpdate.description);
  const [editDef, setEditDef] = useState(props.workoutToUpdate.definition);
  const [editRes, setEditRes] = useState(props.workoutToUpdate.result);

  const reqBody = {
    description: editDesc,
    definition: editDef,
    result: editRes,
  };

  const workoutUpdate = (e, workout) => {
    e.preventDefault();
    const EDIT_LOG_URL = `http://localhost:5000/log/${props.workoutToUpdate.id}`;

    fetch(EDIT_LOG_URL, {
      method: 'PUT',
      body: JSON.stringify({
        description: editDesc,
        definitin: editDef,
        result: editRes,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: props.token,
      }),
    }).then((res) => {
      console.log(res);
      props.fetchWorkouts();
      props.updateOff();
    });
  };

  return (
    <>
      <Modal isOpen={true}>
        <ModalHeader>Log a Workout</ModalHeader>
        <ModalBody>
          <Form onSubmit={workoutUpdate}>
            <FormGroup>
              <Label htmlFor='result'>Edit Result:</Label>
              <Input
                name='result'
                value={editRes}
                onChange={(e) => setEditRes(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor='description'>Edit Description:</Label>
              <Input
                name='description'
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor='definition'>Edit Definition:</Label>
              <Input
                type='select'
                name='definition'
                value={editDef}
                onChange={(e) => setEditDef(e.target.value)}
              >
                <option></option>
                <option value='Time'>Time</option>
                <option value='Weight'>Weight</option>
                <option value='Distance'>Distance</option>
              </Input>
            </FormGroup>
            <Button type='submit'>Update the workout!</Button>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default WorkoutEdit;
