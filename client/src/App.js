import './App.scss';
import {
    createBrowserRouter,
    RouterProvider,
    Route,
  } from "react-router-dom";
import { HomePage } from './pages/home.page';
import { EventPage } from './pages/event.page';


const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/evenements",
      element: <EventPage />,
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
