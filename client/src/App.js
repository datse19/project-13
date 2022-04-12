import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";

//Components
import { Provider } from './Context';
import Header from './Components/Header';
import Courses from './Components/Course';
import CourseDetail from './Components/CourseDetail';
import CreateCourse from './Components/CreateCourse';
import UpdateCourse from './Components/UpdateCourse';
import UserSignIn from './Components/UserSignIn';
import UserSignOut from './Components/UserSignOut';
import UserSignUp from './Components/UserSignUp';
import Error from './Components/Error';
import Forbidden from './Components/Forbidden';
import NotFound from './Components/NotFound';

import { withContext} from './Context';
import PrivateRoute from './PrivateRoute';

//Components withContext
const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut);
const NotFoundWithContext = withContext(NotFound);
const ForbiddenWithContext = withContext(Forbidden);
const ErrorWithContext = withContext(Error);

export default function App() {
  return (
    <BrowserRouter>
      <Provider>
        <div className='App'>
          <HeaderWithContext />
          <Routes>
            <Route exact path='/' element = {< CoursesWithContext />} />
            <Route path = '/courses/create' element={<PrivateRoute />}><Route path='' element={< CreateCourseWithContext />} /> </Route>
            <Route path = '/courses/:id/update' element={<PrivateRoute />}><Route path='' element={< UpdateCourseWithContext />} /> </Route>
            <Route path='/courses/:id' element={<CourseDetailWithContext />} />
            <Route path='/signin' element={<UserSignInWithContext />} />
            <Route path='/signup' element={<UserSignUpWithContext />} />
            <Route path='/signout' element={<UserSignOutWithContext />} />
            <Route exact path='/error' element={<ErrorWithContext />} />
            <Route exact path='/forbidden' element={<ForbiddenWithContext />} />
            <Route element = {<NotFoundWithContext />} />
          </Routes>
        </div>
      </Provider>
    </BrowserRouter>
    );
}


