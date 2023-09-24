const socketClient = io();

socketClient.on("enviodeproducts", (obj) => {
  updateProductList(obj);
});

function updateProductList(products) {
  const div = document.getElementById("list-products");
  let productosHTML = "";

  products.forEach((product) => {
    productosHTML += `
      <article class="container">
        <div class="card">
          <div class="imgBx">
            <img src="${product.thumbnail}" alt="Product Image"/>
          </div>
          <div class="contentBx">
            <h2>${product.title}</h2>
            <div class="size">
              <h3>$${product.price}</h3>
            </div>
            <div class="stock">
              <h3>Stock: ${product.stock}</h3>
            </div>
            <a href="#">Comprar Ahora</a>
          </div>
        </div>
      </article>`;
  });

  div.innerHTML = productosHTML;
}

const form = document.getElementById("formProduct");
form.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const title = form.elements.title.value;
  const description = form.elements.description.value;
  const stock = form.elements.stock.value;
  const thumbnail = form.elements.thumbnail.value;
  const category = form.elements.category.value;
  const price = form.elements.price.value;
  const code = form.elements.code.value;

  socketClient.emit("agregarProducto", {
    title,
    description,
    stock,
    thumbnail,
    category,
    price,
    code,
  });

  form.reset();
});

document.getElementById("delete-btn").addEventListener("click", () => {
  const deleteIdInput = document.getElementById("delete-id");
  const deleteId = deleteIdInput.value;
  
  const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este producto?");
  
  if (confirmDelete) {
    socketClient.emit("deleteProduct", deleteId);
    deleteIdInput.value = "";
  }
});
