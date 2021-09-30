import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { archiveExercise, deleteExercise, getExercises } from '../../data';
import Container from '../Base/Container';
import ExerciseCard from './ExerciseCard';

export default function ArchiveExercise() {
  const [archives, setArchives] = useState([]);

  useEffect(() => {
    getExercises().then(data => {
      setArchives(data.filter(el => el.archive === true));
    });
  }, [setArchives]);

  const handleDelete = id => {
    deleteExercise(id).then(() =>
      setArchives(archives.filter(el => el._id !== id))
    );
  };

  const handleArchive = id => {
    archiveExercise(id).then(() => {
      setArchives(archives.filter(el => el._id !== id));
    });
  };

  return (
    <Container>
      <div className="px-6 py-16">
        {archives.length === 0 ? (
          <div className="text-center">
            <p className="text-2xl font-semibold mt-24">
              You have no archive exercise
            </p>
            <p className="mt-4">
              <Link
                to="/"
                className="border-b-2 text-lg border-yellow-400 font-semibold"
              >
                Home
              </Link>
            </p>
          </div>
        ) : (
          <h3 className="text-center text-2xl font-semibold pb-8">
            All Archives
          </h3>
        )}

        <ExerciseCard
          exercises={archives}
          handleDelete={handleDelete}
          handleArchive={handleArchive}
        />
      </div>
    </Container>
  );
}
