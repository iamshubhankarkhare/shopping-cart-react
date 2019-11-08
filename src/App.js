import React, {useState, useEffect} from 'react';

import './App.css';
import Sizes from './components/Sizes';
import Products from './components/Products';
import Cart from './components/Cart';
import filterList from './components/filterList'

const App = () => {

  const [products, setProducts] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setProducts(filterList([], null));
  }, [])

  const setSize = (size) => {
    const sizes = [...selectedSizes];
    
    if(sizes.includes(size)) {
      const index = sizes.indexOf(size);
      sizes.splice(index, 1);
    }
    else {
      sizes.push(size);
    }
    setSelectedSizes(sizes);
    setProducts(filterList(sizes, 'size'));
  }

  const sortProducts = (method) => {
    const array = products;

    if(method === "Lowest to Highest") {
        array.sort(function(a, b){
          return a.price-b.price
      })
    }
    else if(method === "Highest to Lowest") {
        array.sort(function(a, b){
          return b.price-a.price
      })
    }
    setProducts(array);
  }

  const addToCart = (item) => {
    const productList = [...cart];
    productList.push(item);
    //bug if added then
    setCart(productList);
  }
  
  return (
    <div className="App">
      <Sizes selectedSizes={selectedSizes} setSize={setSize} />
      <Products products={products} sortProducts={sortProducts} addToCart={addToCart} />
      <Cart />
    </div>
  );
}

export default App;
