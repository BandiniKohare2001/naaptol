import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LogIn from './views/LogIn/LogIn';
import SignUp from './views/SignUp/SignUp';
import Home from './views/Home/Home';
import MyOrder from './views/MyOrder/MyOrder';
import PlaceOrder from './views/PlaceOrder/PlaceOrder';
import AddtoCart from './AddtoCart/AddtoCart';

const router=createBrowserRouter([
  {
      path:'/login',
      element:<LogIn/>
  },
  {
      path:'/singup',
      element:<SignUp/>
  },
  {
      path:'/',
      element:<Home />
  },
  {
      path:'/placeorder/:_id',
      element:<PlaceOrder/>
  },
  {
      path:'/myorder',
      element:<MyOrder/>
  },
  {
    path:'/addtocart',
    element:<AddtoCart/>
},
])



const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(<RouterProvider router={router} />);
