import { Route, Switch } from 'react-router-dom';

import Navbar from './Navbar';
import AddExercise from './Exercise/AddExercise';
import EditExercise from './Exercise/EditExercises';
import ExerciseList from './Exercise/ExerciseList';
import AddUser from './User/AddUser';
import ArchiveExercise from './Exercise/ArchiveExercise';
import NotFound from './NotFound';

export default function Router() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={ExerciseList} />
        <Route exact path="/edit/:id" component={EditExercise} />
        <Route exact path="/add-exercise" component={AddExercise} />
        <Route exact path="/add-user" component={AddUser} />
        <Route exact path="/archive" component={ArchiveExercise} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}
