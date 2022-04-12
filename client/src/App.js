import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from './Components/Header';
import CourseDetail from './Components/CourseDetail';
import CreateCourse from './Components/CreateCourse';
import UpdateCourse from './Components/UpdateCourse';
import UserSignIn from './Components/UserSignIn';
import UserSignOut from './Components/UserSignOut';
import UserSignUp from './Components/UserSignUp';
import MainPage from './Components/MainPage';
import ErrorPage from './Components/Error';
import Firbidden from './Components/Forbidden';
import PrivateRoute from './PrivateRoute';
import NotFound from './Components/NotFound';

const routes = () => {
  <Router>
    <Header />
    <main>
      <Switch>
        <Route exact path='/' component = {MainPage} />
        <PrivateRoute path = '/courses/create' component={CreateCourse} />
        <PrivateRoute path = '/courses/:id/update' component={UpdateCourse} />
        <Route path='/courses/:id' component={CourseDetail} />
        <Route path='/signin' component={UserSignIn} />
        <Route path='/notfound' component={NotFound} />
        <Route path='/signup' component={UserSignUp} />
        <Route path='/error' component={ErrorPage} />
        <Route path='/forbidden' component={Firbidden} />
        <Route path='/signout' component={UserSignOut} />
        <Route component={NotFound} />
      </Switch>
    </main>
  </Router>
}

export default routes;
