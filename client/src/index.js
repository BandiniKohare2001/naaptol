import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LogIn from './views/LogIn/LogIn';
import SignUp from './views/SignUp/SignUp';


const router = createBrowserRouter([
  {
    path: '/',
    element: <h1>Home</h1>
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/login',
    element: <LogIn />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(<RouterProvider router={router} />);
