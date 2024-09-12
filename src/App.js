import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ButtonAppBar from './components/Appbar';
import Products from './components/Products';
import Product from './components/Product';

function App() {
  return (
    <div className="App">
      <ButtonAppBar></ButtonAppBar>
      <BrowserRouter>
        <Routes>
        <Route path='' element={<Products></Products>}></Route>
           <Route path='/products' element={<Products></Products>}></Route>
           <Route path='/product/:productId' element={<Product></Product>}></Route>
           <Route path='/product' element={<Product></Product>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
