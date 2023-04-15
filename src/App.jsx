import './App.css'
import { useState } from 'react';

function Entry(props) {
  const { product_row, price_row } = props;

  return (
    <>
      <input type="text" name={product_row} placeholder={product_row}></input>
      <input type="number" name={price_row} placeholder={price_row} min="0.00" max="10000.00" step="0.01"></input>
    </>
  );
}

function Compare(props){
  {/* take in the input product and price and find the lowest priced instance of that product in the datbase*/}
  const {input_product, input_row} = props;
  const [showCompare, setShowCompare] =     useState(false);
  const handleClick = () => {
    // Toggle the state of showAdditionalField
    setShowCompare(true);
  };
  
  return(
    <>
      <button onClick={handleClick}>Compare Prices</button>
      <hr/>
      {showCompare && (
      // output of database goes here
      <table>
        <tr><th scope="col">Product Name</th>
            <th scope="col">Last Known Price</th>
            <th scope="col">Store Location</th></tr>
      </table>
        
    )}

    </>
  )
}

export default function App() {

  return (
    <main>
      <div>
          <h1> Hackathon Project 2023: Grocery Broker</h1>
          <h2>John Gerving, Sean Ross</h2>
        </div>

          <fieldset>
            <legend>Insert a product name and its price:</legend>
            
              <Entry product_row='Product1' price_row='Price1' />
              <br />
            <Compare />
          </fieldset>
    </main>
  )
}
