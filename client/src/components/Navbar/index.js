import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="px-4 py-3 bg-dark">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link className="text-xl font-bold text-white" to="/">
            Exercise Point
          </Link>
          <nav>
            <ul className="flex items-center space-x-5 text-lg font-semibold text-gray-100">
              <li>
                <Link to="/">Exercises</Link>
              </li>
              <li>
                <Link to="/add-exercise">Add exercise log</Link>
              </li>
              <li>
                <Link to="/add-user">Add user</Link>
              </li>

              <li>
                <Link to="/archive">Archives</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
