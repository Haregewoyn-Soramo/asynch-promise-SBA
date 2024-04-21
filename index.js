document.getElementById('getProducts').addEventListener('click', function() {
  // toggleVisibility('products');
  getProducts();
});
document.getElementById('getProducts').addEventListener('dblclick', function() {
  toggleVisibility('products');
});
document.getElementById('getUsers').addEventListener('click', function() {
  toggleVisibility('profile');
  getUsers();
});
document.getElementById('getUsers').addEventListener('dblclick', function() {
  toggleVisibility('profile');
});
document.getElementById('getCarts').addEventListener('click', function() {
  toggleVisibility('carts');
  getCarts();
});
document.getElementById('getCarts').addEventListener('dblclick', function() {
  toggleVisibility('carts');
});
document.querySelector('.dropdown-menu ').addEventListener('click', function() {
  toggleVisibility('categoriesDropdown');
  categoriesDd();
});
document.querySelector('.dropdown-menu ').addEventListener('dblclick', function() {
  toggleVisibility('categoriesDropdown');
});
document.getElementById('addNewProducts').addEventListener('click', function() {
  toggleVisibility('newProducts');
  addNewProducts();
});
document.getElementById('addNewProducts').addEventListener('dblclick', function() {
  toggleVisibility('newProducts');
});

function toggleVisibility(id) {
  const element = document.getElementById(id);
  if (element.style.display === 'none' || element.style.display === '') {
    element.style.display = 'grid';
  } else {
    element.style.display = 'none';
  }
}



function getProducts() {
  fetch('https://api.escuelajs.co/api/v1/products')
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
      const dropdownMenu = document.getElementById('categoriesDropdown').innerHTML = output;
    })
    .catch(err => console.error('Error fetching categories:', err));
}


function addNewProducts() {
  const formTemplate = `
    // <h3> Add new products</h3>
    <form id="newProductForm" >
      <input type="text" style = "margin-top = 100px" placeholder="Enter Product Title" name="title">
      <input type="text" placeholder="Enter Product Price" name="price">
      <input type="text" placeholder="Enter Product Description" name="description">
      <input type="text" placeholder="Enter Product Image URL" name="image">
      <input type="text" placeholder="Enter Product Category" name="category">
      <button type="submit">Add Product</button>
    </form>`;

  document.getElementById('newProducts').innerHTML = formTemplate;

  document.getElementById('newProductForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    const formData = new FormData(this);
    
    const newProductData = {};
    formData.forEach((value, key) => {
      newProductData[key] = value;
    });
  })
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
  };



// function addNewProducts() {
//   document.getElementById('newProductForm').addEventListener('submit', function(e){
//   e.preventDefault();


//   const form = e.target;
//   if(form.checkValidity()){
//   const formData = new FormData(form);
//   const newProductData = {};
//   formData.forEach((value,key) =>{
//     newProductData[key] = value;
//   })

//   fetch('https://fakestoreapi.com/products',{
//     method: "POST",
//     headers: {
//       'content-type': 'application/json'
//     },
//     body: JSON.stringify({
//       title: 'test product',
//       price: 13.5,
//       description: 'lorem ipsum set',
//       image: 'https://i.pravatar.cc',
//       category: 'electronic'
//     })

//   })
//   .then(res => res.json())
//   .then(data =>{
//     console.log('new product added: ', data);
//     document.getElementById('successMessage').style.display = 'block'; 
//     form.reset();
//     form.style.display = 'none';
//     console.log(data)
//   })
//   .catch(err =>{
//     console.log('error adding new product: '+ err)
//   });
//  } 
 
//  else {
//     console.log('form inputs are invalid');
//   }
// });
window.addEventListener('DOMContentLoaded', categoriesDd);
window.addEventListener('DOMContentLoaded', getProducts);


document.addEventListener('DOMContentLoaded',function(){
  fetch('./cloth.json')
  .then(res =>res.json())
  .then (data => {
    const carouselIndicators = document.getElementById('carouselIndicators')
    const carouselInner = document.getElementById('carouselInner')

  data.forEach((item, index) => {
    const indicator = document.createElement('button');
    indicator.setAttribute('type','button');
    indicator.setAttribute('data-bs-target', '#carouselExampleIndicators');
    indicator.setAttribute('data-bs-slide-to', index);
    if (index === 0)indicator.classList.add('active')
    carouselIndicators.appendChild(indicator);

    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
    if (index === 0)carouselItem.classList.add('active');

    const image = document.createElement('img');
    image.src = item.imageUrl;
    image.classList.add('d-block', 'w-100');
    carouselItem.appendChild(image);

    carouselInner.appendChild(carouselItem);
  })

  })
  .catch(err =>{
    console.log('error fetching data: ', err);
  })
});


      