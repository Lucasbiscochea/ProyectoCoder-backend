const socketCliente = io();
socketCliente.on("productos", (products) => {
  console.log(products);
  updateProductList(products);
});

function updateProductList(products) {
  let div = document.getElementById("list-products");
  let productos = "";

  products.forEach((product) => {
    productos += `
          <article class="container">
        <div class="card">
          <div class="imgBx">
            <img src="${product.thumbnail}"/>
          </div>
          <div class="contentBx">
            <h2>${product.title}</h2>
            <div class="size">
              <h3>$${product.price}</h3>
            </div>
            <div class="stock">
              <h3>Stock: ${product.stock}</h3>
            </div>
            <a href="#">Buy Now</a>
          </div>
        </div>
        
      </article>
          
          
          
          
          
          
          `;
  });

  div.innerHTML = productos;
}

let form = document.getElementById("formProduct");
form.addEventListener("submit", (evt) => {
  evt.preventDefault();

  let title = form.elements.title.value;
  let description = form.elements.description.value;
  let stock = form.elements.stock.value;
  let thumbnail = form.elements.thumbnail.value;
  let category = form.elements.category.value;
  let price = form.elements.price.value;
  let code = form.elements.code.value;

  socketCliente.emit("addProduct", {
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

document.getElementById("delete-btn").addEventListener("click", function () {
  const deleteidinput = document.getElementById("id-prod");
  const deleteid = parseInt(deleteidinput.value);
  socketCliente.emit("deleteProduct", deleteid);
  deleteidinput.value = "";
});
socketCliente.on("productosupdated", (obj) => {
  updateProductList(obj);
});
