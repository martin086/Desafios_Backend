import './App.css';
import 'react-toastify/dist/ReactToastify.css'
//Router Dom
import {BrowserRouter, Routes, Route} from 'react-router-dom'
//Context
import { DarkModeProvider } from '../context/DarkModeContext';
//Toastify
import { ToastContainer } from 'react-toastify';
//Components
import Navbar from './Navbar/Navbar';
import NotFound from './NotFound/NotFound';
import ItemListContainer from './ItemListContainer/ItemListContainer';
import ItemDetailContainer from './ItemDetailContainer/ItemDetailContainer';
import Cart from './Cart/Cart';
import Contacto from './Contacto/Contacto';
import Checkout from './Checkout/Checkout';

const App = () => {

  return (
    <>
      <BrowserRouter>
        <DarkModeProvider>
          <Navbar/>
          <Routes>
            <Route path='/' element={<ItemListContainer/>}/>
            <Route path='/category/:category' element={<ItemListContainer/>}/>
            <Route path='/product/:id' element={<ItemDetailContainer/>}/>  
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/checkout' element={<Checkout/>}/>
            <Route path='/contacto' element={<Contacto/>}/>
            <Route path='*' element={<NotFound/>}/>
          </Routes>
          <ToastContainer/>
        </DarkModeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
