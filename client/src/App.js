import './App.scss';
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import packageJson from '../package.json';
import { NotFoundPage } from './pages/notFound/notFound.page';
import { LoginPage } from './pages/login/login.page';
import { HomePage } from './pages/home.page';
import { EventPage } from './pages/event.page';
import { AdminPage } from './pages/admin.page';
import { PrivateRoute } from './components/privateRoute';
import { SignupPage } from './pages/signup/signup.page';


const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/evenements",
      element: <EventPage />,
    },
    {
      path: "/administration",
      element: <PrivateRoute><AdminPage /></PrivateRoute>,
    },
    {
      path: "/login",
      element: <LoginPage />
    },
    {
      path: "/signup",
      element: <SignupPage />
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);



function App() {
  return (
    <div className="App">
        <RouterProvider router={router} />
        <div className='version'>{packageJson.name} - {packageJson.version}</div>
    </div>
  );
}

export default App;
