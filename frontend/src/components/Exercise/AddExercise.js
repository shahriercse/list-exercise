import Container from '../Base/Container';
import { InputBox, SelectInputBox } from '../Base/Input';
import useForm from '../Base/useForm';
import { Button } from '../Base/Button';

import { useEffect, useState } from 'react';
import { createExercise, getUsers } from '../../data';
import { Link } from 'react-router-dom';

export default function AddExercise({ history }) {
  const { handleChange, inputs } = useForm({
    username: '',
    description: '',
    duration: '',
  });

  const [notification, setNotification] = useState('');

  const [optionUsers, setOptionUsers] = useState([]);

  useEffect(() => {
    getUsers().then(data => {
      if (data.users.length > 0) {
        setOptionUsers(data.users.map(el => el.username));
        inputs.username = data.users[0].username;
      }
    });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    createExercise(inputs).then(res => {
      history.push('/');

      if (res.status === 'success') {
        setNotification('Exercise Created successfully');
      }
    });
  };

  if (optionUsers.length === 0) {
    return (
      <Container>
        <div className="text-center">
          <p className="text-2xl font-semibold mt-24">
            Create a new user to add an exercise
          </p>
          <p className="mt-4">
            <Link
              to="/add-user"
              className="border-b-2 text-lg border-yellow-400 font-semibold"
            >
              Create new user
            </Link>
          </p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="px-5 py-16">
        <h2 className="text-center text-2xl font-semibold">
          Add Exercise Form
        </h2>
        <form className="w-2/5 mx-auto" onSubmit={handleSubmit}>
          <SelectInputBox
            label="Select User"
            name="username"
            onChange={handleChange}
            options={optionUsers}
            value={inputs.username}
          />

          <InputBox
            label="Description"
            name="description"
            placeholder="Write something..."
            onChange={handleChange}
            value={inputs.description}
          />

          <InputBox
            label="Duration (In Minutes)"
            type="number"
            name="duration"
            placeholder="Write something..."
            onChange={handleChange}
            value={inputs.duration}
          />

          <Button>Create Exercise</Button>
        </form>
      </div>
    </Container>
  );
}
