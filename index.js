document.getElementById('getProducts').addEventListener('click', getProducts);
document.getElementById('getUsers').addEventListener('click', getUsers);
document.getElementById('getCarts').addEventListener('click', getCarts);;
document.querySelector('.dropdown-menu ').addEventListener('click', categoriesDd)
document.getElementById('addNewProducts').addEventListener('click', addNewProducts)


function getProducts() {
  fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(data => {
      let output = '';
      data.forEach(product => {
        output += `
          <div class="product">
            <img src="${product.image}" alt="${product.title}">
            <h5 class="title">${product.title}</h5>
            <p class="price">Price: $${product.price}</p>
            <p class="description">${product.description}</p>
          </div>`;
      });
      document.getElementById('products').innerHTML = output;
    })
    .catch(err => console.error('Error fetching products:', err));
}



function getUsers() {
  fetch('./index.json')
    .then(res => res.json())
    .then(data => {
      let output = ' ';
      data.users.forEach(user => {
        output += `
          <div class="userProfile">
            <img class="userPicture" src="${user.avatar}" alt="${user.username} Avatar">
            <h3 style="display: none;">User ID: ${user.id}</h3>
            <p style="margin-bottom: 5px;display: none;">Username: ${user.username}</p>
            <p style="margin-bottom: 5px;font-size:12px; font-style:bold">Email: ${user.email}</p>
            <p style="margin-bottom: 5px;font-size:12px; font-style:bold"></p>Full Name: ${user.fullName}</p>
          </div>`;
      });
      document.getElementById('profile').innerHTML = output;
    })
    .catch(err => console.error('Error fetching users:', err));
}



function getCarts() {
  fetch('https://fakestoreapi.com/carts')
    .then(res => res.json())
    .then(data => {
      let output = `<h3>Carts</h3>`;
      data.forEach(cart => {
        const date = new Date(cart.date);
        const formattedDate = date.toLocaleDateString('en-US');

        output += `
          <div class="cart">
            <img src="./images.png" alt="Cart" class="cart-image">
            <div class="cart-info">
              <p class="cart-id" style = "display:none">ID: ${cart.id}</p>
              <p class="cart-user-id" style = "display:none">User ID: ${cart.userId}</p>
              <p class="cart-date">Date: ${formattedDate}</p>
              <p class="cart-products">Products:</p>
              <ul class="cart-product-list">`;
        cart.products.forEach(product => {
          output += `
            <li class="cart-product">
              <span class="product-id">ID: ${product.productId}</span>
              <span class="product-quantity">Quantity: ${product.quantity}</span>
            </li>
          `;
        });
        output += `</ul>
            </div>
          </div>`;
      });
      document.getElementById('carts').innerHTML = output;
    })
    .catch(err => console.error('Error fetching carts:', err));
}


function populateCategoriesDropdown(categories) {
  const dropdownMenu = document.querySelector('.dropdown-menu');
  dropdownMenu.innerHTML = ''; 

  categories.forEach(category => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<a class="dropdown-item" href="#">${category}</a>`;
    dropdownMenu.appendChild(listItem);
  });
}

function categoriesDd() {
  fetch('https://fakestoreapi.com/products/categories')
    .then(res => res.json())
    .then(data => {
      let output = '';
      data.forEach(category => {
        output += `<li><a class="dropdown-item" href="#">${category}</a></li>`;
      });
      document.getElementById('categoriesDropdown').innerHTML = output;
    })
    .catch(err => console.error('Error fetching categories:', err));
}

function addNewProducts() {
  const formTemplate = `
  <form id="newProductForm">
    <input type="text" placeholder="enter title" name="title">
    <input type="text" placeholder="enter price" name="price">
    <input type="text" placeholder="enter description" name="description">
    <input type="text" placeholder="enter image URL" name="image">
    <input type="text" placeholder="enter category" name="category">
    <button type="submit">Add Product</button>
  </form>
  
  `;

  document.getElementById('newProducts').innerHTML = formTemplate;

  document.getElementById('newProductForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    const formData = new FormData(this);

    const newProductData = {};
    formData.forEach((value, key) => {
      newProductData[key] = value;
    });

    fetch('https://fakestoreapi.com/products', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProductData)
    })
    .then(res => res.json())
    .then(data => {
      console.log('New product added:', data);
    })
    .catch(error => {
      console.error('Error adding new product:', error);
    });
  });
}

