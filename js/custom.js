const  tienda = document.querySelector('.lista__resumen');
const fragment = document.createDocumentFragment();
const template = document.querySelector('.template');
const footer = document.querySelector('.footer');
const templateFooter = document.querySelector('.templateFooter')
let carrito = [];



document.addEventListener('click', (e) => {
    if(e.target.matches('.producto .tienda__cards-cuerpo .tienda__cards-botones')) {
        agregarCarrito(e);
    } 

});


const agregarCarrito = (e) => {

    const producto = {
        nombre: e.target.dataset.name,
        Id: e.target.dataset.producto,
        precio: parseInt(e.target.dataset.precio),
        cantidad: 1,
    };

  const indice = carrito.findIndex((item) => item.nombre === producto.nombre) 
   if(indice === -1){
       carrito.push(producto);
   } else {
       carrito[indice].cantidad++;
   }

   sacarCarrito();

}


const sacarCarrito = () => {

    tienda.textContent = "";

    carrito.forEach((item) => {
        const clone = template.content.cloneNode(true);
        clone.querySelector('.item__resumen-text h5').textContent = item.nombre;
        clone.querySelector('.item__resumen-text .item__resumen_cantidad b').textContent = item.cantidad;
        clone.querySelector('.item__resumen-text .item__resumen_precio b').textContent = item.precio; 
        clone.querySelector('.item__resumen-text .item__resumen_precioTotal b').textContent = item.precio * item.cantidad;

        fragment.appendChild(clone);
    }),

    tienda.appendChild(fragment);
    
}