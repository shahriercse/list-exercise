import Container from '../Base/Container';
import { InputBox, SelectInputBox } from '../Base/Input';
import useForm from '../Base/useForm';
import { Button } from '../Base/Button';

import { useEffect, useState } from 'react';
import { getExercise, getUsers, updateExercise } from '../../data';

export default function EditExercise({ history, match }) {
  const { handleChange, inputs, setInputs } = useForm({
    username: '',
    description: '',
    duration: '',
  });

  const [optionUsers, setOptionUsers] = useState([]);

  useEffect(() => {
    getUsers().then(data => {
      if (data.users.length > 0) {
        setOptionUsers(data.users.map(el => el.username));
      }
    });

    getExercise(match.params.id).then(data => {
      setInputs({
        ...inputs,
        username: data.exercise.username,
        description: data.exercise.description,
        duration: data.exercise.duration,
      });
    });
  }, [match.params.id]);

  const handleSubmit = e => {
    e.preventDefault();

    updateExercise(match.params.id, inputs).then(() => history.push('/'));
  };

  return (
    <Container>
      <div className="px-5 py-16">
        <h2 className="text-center text-2xl font-semibold">
          Edit your Exercise Form
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

          <Button>Edit Exercise</Button>
        </form>
      </div>
    </Container>
  );
}
