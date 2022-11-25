import './App.scss';
import {
    createBrowserRouter,
    RouterProvider,
    Route,
  } from "react-router-dom";
import { HomePage } from './pages/home.page';
import { EventPage } from './pages/event.page';
import { AdminPage } from './pages/admin.page';


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
      element: <AdminPage />,
    },
  ]);



function App() {
  return (
    <div className="App">
        <RouterProvider router={router} />
    </div>
  );
}

export default App;
