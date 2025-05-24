const modal = new bootstrap.Modal(document.getElementById('detalleModal'));
const detalleContenido = document.getElementById('detalleContenido');

function cargarDatos(endpoint, contenedor, renderItem) {
  fetch(`https://dummyjson.com/${endpoint}`)
    .then(res => res.json())
    .then(data => {
      contenedor.innerHTML = data[endpoint].map(renderItem).join('');
    });
}

// Cargar usuarios
fetch('https://dummyjson.com/users')
  .then(res => res.json())
  .then(data => {
    const contenedor = document.getElementById('usuarios');
    data.users.forEach(user => {
      contenedor.innerHTML += `
      <div class="row">
        <div class="col-md-4 mb-3">
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">${user.firstName} ${user.lastName}</h5>
              <p class="card-text">Email: ${user.email}</p>
              <p class="card-text">Edad: ${user.age}</p>
              <button class="btn btn-primary btn-sm" onclick="verDetalleUsuario(${user.id})">Ver Detalle</button>
            </div>
          </div>
        </div>
      </div>
      `;
    });
  });

// Cargar productos
fetch('https://dummyjson.com/products')
  .then(res => res.json())
  .then(data => {
    const contenedor = document.getElementById('productos');
    data.products.forEach(prod => {
      contenedor.innerHTML += `
        <div class="col-md-4 mb-3">
          <div class="card h-100">
            <img src="${prod.thumbnail}" class="card-img-top" style="height: 200px; object-fit: cover;">
            <div class="card-body">
              <h5 class="card-title">${prod.title}</h5>
              <p class="card-text">$${prod.price}</p>
              <button class="btn btn-primary btn-sm" onclick="verDetalleProducto(${prod.id})">Ver Detalle</button>
            </div>
          </div>
        </div>
      `;
    });
  });

// Cargar carritos
fetch('https://dummyjson.com/carts')
  .then(res => res.json())
  .then(data => {
    const contenedor = document.getElementById('carritos');
    data.carts.forEach(cart => {
      contenedor.innerHTML += `
        <div class="col-md-4 lg-12 mb-3">
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">Carrito #${cart.id}</h5>
              <p class="card-text">Total: $${cart.total}</p>
              <p class="card-text">Cantidad: ${cart.totalProducts}</p>
              <button class="btn btn-primary btn-sm" onclick="verDetalleCarrito(${cart.id})">Ver Detalle</button>
            </div>
          </div>
        </div>
      `;
    });
  });

  // Mostrar detalle de usuario
function verDetalleUsuario(id) {
  fetch(`https://dummyjson.com/users/${id}`)
    .then(res => res.json())
    .then(user => {
      document.getElementById('modalTitulo').innerText = `👤 ${user.firstName} ${user.lastName}`;
      document.getElementById('modalContenido').innerHTML = `
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Teléfono:</strong> ${user.phone}</p>
        <p><strong>Edad:</strong> ${user.age}</p>
        <p><strong>Dirección:</strong> ${user.address.city}, ${user.address.state}</p>
      `;
      new bootstrap.Modal(document.getElementById('modalDetalle')).show();
    });
}

// Mostrar detalle de producto
function verDetalleProducto(id) {
  fetch(`https://dummyjson.com/products/${id}`)
    .then(res => res.json())
    .then(prod => {
      document.getElementById('modalTitulo').innerText = `📦 ${prod.title}`;
      document.getElementById('modalContenido').innerHTML = `
        <img src="${prod.thumbnail}" class="img-fluid mb-3" style="max-height: 300px; object-fit: contain;">
        <p><strong>Precio:</strong> $${prod.price}</p>
        <p><strong>Marca:</strong> ${prod.brand}</p>
        <p><strong>Categoría:</strong> ${prod.category}</p>
        <p>${prod.description}</p>
      `;
      new bootstrap.Modal(document.getElementById('modalDetalle')).show();
    });
}

// Mostrar detalle de carrito
function verDetalleCarrito(id) {
  fetch(`https://dummyjson.com/carts/${id}`)
    .then(res => res.json())
    .then(cart => {
      let productos = cart.products.map(p => `
        <li>${p.title} - Cantidad: ${p.quantity} - Precio: $${p.price}</li>
      `).join('');
      document.getElementById('modalTitulo').innerText = `🛒 Carrito #${cart.id}`;
      document.getElementById('modalContenido').innerHTML = `
        <p><strong>Total:</strong> $${cart.total}</p>
        <p><strong>Total productos:</strong> ${cart.totalProducts}</p>
        <p><strong>Productos:</strong></p>
        <ul>${productos}</ul>
      `;
      new bootstrap.Modal(document.getElementById('modalDetalle')).show();
    });
}
