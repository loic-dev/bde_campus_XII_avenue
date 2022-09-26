import './App.scss';
import {
    createBrowserRouter,
    RouterProvider,
    Route,
  } from "react-router-dom";
import { HomePage } from './pages/home.page';


const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
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
