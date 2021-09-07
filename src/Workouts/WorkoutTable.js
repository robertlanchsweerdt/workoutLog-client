import React from 'react';
import { Table, Button } from 'reactstrap';

const WorkoutTable = (props) => {
  const deleteWorkout = (workout) => {
    const DELETE_LOG_URL = `http://localhost:5000/log/${workout.id}`;

    console.log('This is the delete URL -->', DELETE_LOG_URL);

    fetch(DELETE_LOG_URL, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: props.token,
      }),
    })
      .then(() => props.fetchWorkouts())
      .catch((err) => console.error(err));
  };

  const workoutMapper = () => {
    return props.workouts.map((workout, index) => {
      return (
        <tr key={index}>
          <th scope='row'>{workout.id}</th>
          <td>{workout.result}</td>
          <td>{workout.description}</td>
          <td>{workout.definition}</td>
          <td>
            <Button
              color='warning'
              onClick={() => {
                console.log('Edit this workout-->', workout);
                props.editUpdateWorkout(workout);
                props.updateOn();
              }}
            >
              Update
            </Button>
            <Button
              color='danger'
              onClick={() => {
                console.log('Delete this workout -->', workout);
                deleteWorkout(workout);
              }}
            >
              Delete
            </Button>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <h3>Workout History</h3>
      <hr />
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Result</th>
            <th>Description</th>
            <th>Definition</th>
          </tr>
        </thead>
        <tbody>{workoutMapper()}</tbody>
      </Table>
    </>
  );
};

export default WorkoutTable;
