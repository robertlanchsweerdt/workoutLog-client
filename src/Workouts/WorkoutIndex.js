import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import WorkoutEdit from './WorkoutEdit';
import WorkoutCreate from './WorkoutCreate';
import WorkoutTable from './WorkoutTable';

const WorkoutIndex = (props) => {
  const [workouts, setWorkouts] = useState([]);
  const [updateActive, setUpdateActive] = useState(false);
  const [workoutToUpdate, setWorkoutToUpdate] = useState({});

  const ALL_LOGS_URL = 'http://localhost:5000/log/';

  const fetchWorkouts = () => {
    fetch(ALL_LOGS_URL, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: props.token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setWorkouts(data);
      })
      .catch((err) => console.error(err));
  };

  const editUpdateWorkout = (workout) => {
    setWorkoutToUpdate(workout);
    console.log(workout);
  };

  const updateOn = () => {
    setUpdateActive(true);
  };

  const updateOff = () => {
    setUpdateActive(false);
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <div>
      <Container>
        <Row>
          <Col md='3'>
            <WorkoutCreate fetchWorkouts={fetchWorkouts} token={props.token} />
          </Col>
          <Col>
            <h2>
              <WorkoutTable
                workouts={workouts}
                editUpdateWorkout={editUpdateWorkout}
                updateOn={updateOn}
                fetchWorkouts={fetchWorkouts}
                token={props.token}
              />
            </h2>
          </Col>
          {updateActive ? (
            <WorkoutEdit
              workoutToUpdate={workoutToUpdate}
              updateOff={updateOff}
              token={props.token}
              fetchWorkouts={fetchWorkouts}
            />
          ) : (
            <></>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default WorkoutIndex;
