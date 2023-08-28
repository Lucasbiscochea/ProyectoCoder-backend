document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formProduct');
  const productList = document.getElementById('list-products');
  
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const stock = document.getElementById('stock').value;
    const thumbnail = document.getElementById('thumbnail').value;
    const category = document.getElementById('category').value;
    const price = document.getElementById('price').value;
    const code = document.getElementById('code').value;
    
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <strong>${title}</strong> - ${description}<br>
      Stock: ${stock} | Categoría: ${category} | Precio: ${price} | Código: ${code}<br>
      <img src="${thumbnail}" alt="${title}" style="max-width: 100px;">
    `;
    
    productList.appendChild(listItem);
    
    form.reset();
  });
});
