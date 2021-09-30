import Container from '../Base/Container';
import { InputBox } from '../Base/Input';
import useForm from '../Base/useForm';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from '../Base/Button';
import { createUser } from '../../data';

export default function AddUser({ history }) {
  const { handleChange, inputs } = useForm({
    username: '',
  });

  const handleSubmit = e => {
    e.preventDefault();

    createUser(inputs).then(() => history.push('/add-exercise'));
  };

  return (
    <Container>
      <div className="px-5 py-16">
        <h2 className="text-center text-2xl font-semibold">Add User Form</h2>
        <form className="w-2/5 mx-auto" onSubmit={handleSubmit}>
          <InputBox
            label="Username"
            name="username"
            placeholder="Enter your username"
            onChange={handleChange}
            value={inputs.username}
          />

          <Button>Create User</Button>
        </form>
      </div>
    </Container>
  );
}
