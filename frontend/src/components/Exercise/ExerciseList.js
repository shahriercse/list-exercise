import { useEffect, useState } from 'react';
import Container from '../Base/Container';
import { deleteExercise, getExercises, archiveExercise } from '../../data';
import ExerciseCard from './ExerciseCard';
import { Link } from 'react-router-dom';

export default function ExerciseList() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    getExercises().then(data => {
      setExercises(data.filter(el => el.archive === false));
    });
  }, []);

  const handleDelete = id => {
    deleteExercise(id).then(() =>
      setExercises(exercises.filter(el => el._id !== id))
    );
  };

  const handleArchive = id => {
    // add and remove exercise from archive
    archiveExercise(id).then(() => {
      setExercises(exercises.filter(el => el._id !== id));
    });
  };

  return (
    <Container>
      <div className="px-6 py-16">
        {exercises.length === 0 ? (
          <div className="text-center">
            <p className="text-2xl font-semibold mt-24">
              You have no Exercise list
            </p>
            <p className="mt-4">
              <Link
                to="/add-exercise"
                className="border-b-2 text-lg border-yellow-400 font-semibold"
              >
                Create your exercise list
              </Link>
            </p>
          </div>
        ) : (
          <h3 className="text-center text-2xl font-semibold pb-8">
            All Exercise Lists
          </h3>
        )}

        <ExerciseCard
          exercises={exercises}
          handleDelete={handleDelete}
          handleArchive={handleArchive}
        />
      </div>
    </Container>
  );
}
