import { Link } from 'react-router-dom';
import { LocalTimeFormat } from '../../lib/formateDate';
import { Archive, Edit, Delete, Restore } from '../Base/Icon';

export default function ExerciseCard({
  exercises,
  handleDelete,
  handleArchive,
}) {
  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
      {exercises.map(ex => (
        <div
          key={ex._id}
          className="exercise-card border border-gray-300 hover:border-tomato shadow-sm rounded-lg px-5 py-4"
        >
          <p className="flex items-center text-lg justify-between font-semibold">
            <span className="capitalize">{ex.description}</span>
            <span>
              {ex.duration}
              <span className="text-sm pl-1 text-gray-600">minutes</span>
            </span>
          </p>
          <h5 className="pt-2 text-sm italic text-gray-400 font-bold">
            {ex.username}
          </h5>

          <div className="pt-2 text-sm italic text-gray-400 font-bold">
            <p>
              {LocalTimeFormat(
                `${ex.createdAt > ex.updatedAt ? ex.createdAt : ex.updatedAt}`
              )}
            </p>
          </div>

          <div className="flex justify-between items-center pt-5">
            {!ex.archive ? (
              <div className="fill-current text-dark">
                <Link to={`/edit/${ex._id}`}>
                  <Edit />
                </Link>
              </div>
            ) : (
              <div
                className="cursor-pointer"
                onClick={() => handleArchive(ex._id)}
                title="Restore Exercise"
              >
                <Restore />
              </div>
            )}

            <div className="flex items-center space-x-5 trash-btn">
              {!ex.archive && (
                <div
                  className="cursor-pointer"
                  onClick={() => handleArchive(ex._id)}
                  title="Archive Exercise"
                >
                  <Archive />
                </div>
              )}

              <div
                className="fill-current text-trash  cursor-pointer"
                title="Delete Exercise"
                onClick={() => handleDelete(ex._id)}
              >
                <Delete />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
