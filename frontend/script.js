import levenshteinDistance from './leven-dist.js';

const APILINK = 'https://copy-hackathon2023-backend.ggamer.repl.co/api/v1/prices/';

const name_input = document.getElementById("product");
name_input.onkeyup = findMatchingProducts;

const price_input = document.getElementById("price");

const submit = document.getElementById("submit");
submit.onclick = returnPrices;

const information = document.getElementById("results");

async function findMatchingProducts() {
  let products = await returnProductsByName(name_input.value);
  // console.log(products);
  let sorted = products.sort((a, b) => {
    if(levenshteinDistance(a, name_input.value) < levenshteinDistance(b, name_input.value)) {
      return -1;
    } else if(levenshteinDistance(a, name_input.value) < levenshteinDistance(b, name_input.value)) {
      return 1;
    }
    return 0;
  })
  
  let topProducts = sorted.slice(0, 6);
  const datalist = document.getElementById("product_list");
  var child = datalist.lastElementChild; 
  while (child) {
      datalist.removeChild(child);
      child = datalist.lastElementChild;
  }
  for(let i = 0; i < topProducts.length; i++) {
    const option = document.createElement('option');
    option.value = topProducts[i];
    datalist.appendChild(option);
  }
}

async function returnProductsByName(name) {
  const product_names = [];
  const response = await fetch(APILINK + "all").then(res => res.json()).then(function(data) {
    data.forEach(product => {
      if(product_names.indexOf(product["name"]) === -1) {
        product_names.push(product["name"]);
      }
    });
  });
  return product_names;
}

function returnPrices() {
  if(name_input.value !== "" && price_input.value !== "") {
    fetch(APILINK + "product/" + name_input.value.split(" ").join("%20")).then(res => res.json()).then(function(data) {
      const input = {"name" : name_input.value, "locationid" : document.getElementById("place-id").textContent, "location_name": document.getElementById("place-name").textContent, "price" : parseFloat(price_input.value)};
      let lowest = input;
      data.forEach(price => {
        if(parseFloat(price.price) < parseFloat(lowest.price)) {
          lowest = price;
        }
      });
      console.log(lowest.location_name);
      // Tell user where they can get a lower price on screen
      results.innerText = "The lowest price for this product is $" + lowest.price + " at " + lowest.location_name + ".";
      
      let alreadyInDatabase = false;
      let existing_id;
      for(let i = 0; i < data.length; i++) {
        if(data[i].locationid === input.locationid) {
          alreadyInDatabase = true;
          existing_id = data[i]._id;
        }
      }
      if(alreadyInDatabase) {
        console.log(existing_id);
        savePrice(input.name, input.locationid, input.location_name, input.price, existing_id);
      } else {
        savePrice(input.name, input.locationid, input.location_name, input.price);
      }
    });
  }
}

function savePrice(name, locationid, location_name, price, id="") {

  if(id) {
    fetch(APILINK + id, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"price": price})
    }).then(res => res.json())
      .then(res => {
        console.log(res);
        // location.reload();
      });
  } else {
    fetch(APILINK + "new", {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"name": name, "locationid": locationid, "location_name": location_name, "price": price})
  }).then(res => res.json())
    .then(res => {
      console.log(res);
      // location.reload();
    });
  }
  
}
