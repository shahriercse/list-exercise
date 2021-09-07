import axios from 'axios';

export async function getExercises() {
  const res = await axios.get('http://localhost:8206/api/exercise');

  return res.data.exercises;
}

export async function getExercise(id) {
  const res = await axios.get(`http://localhost:8206/api/exercise/${id}`);

  return res.data;
}

export async function deleteExercise(id) {
  const res = await axios.delete(`http://localhost:8206/api/exercise/${id}`);

  return res.data;
}

export async function getUsers() {
  const res = await axios.get('http://localhost:8206/api/users');

  return res.data;
}

export async function createExercise(inputs) {
  const res = await axios.post(
    'http://localhost:8206/api/exercise/add',
    inputs
  );

  return res.data;
}

export async function updateExercise(id, inputs) {
  const res = await axios.patch(
    `http://localhost:8206/api/exercise/${id}`,
    inputs
  );

  return res.data;
}

export async function createUser(inputs) {
  const res = await axios.post('http://localhost:8206/api/users/add', inputs);

  return res.data;
}

export async function archiveExercise(id) {
  const res = await axios.patch(
    `http://localhost:8206/api/exercise/archive/${id}`
  );

  return res.data;
}
