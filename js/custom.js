const  tienda = document.querySelector('.lista__resumen');
const fragment = document.createDocumentFragment();
const template = document.querySelector('.template');
const totalCompra = document.querySelector('.totalCompra');
const totalCompraTemplate = document.querySelector('.totalCompra__template');
let carrito = [];



document.addEventListener('click', (e) => {
    if(e.target.matches('.producto .tienda__cards-botones')) {
        agregarCarrito(e);
    } 

/*     console.log(e.target.matches('.item__resumen-botones .botones-compra-agregar'))
 */ 
    if (e.target.matches('.item__resumen-botones .botones-compra-agregar ')) {
        btnAumentar(e)
    }

    if (e.target.matches('.item__resumen-botones .botones-compra-descontar ')) {
        btnDisminuir(e)
    }

});


const agregarCarrito = (e) => {

    const producto = {
        nombre: e.target.dataset.name,
        id: e.target.dataset.name,
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
        clone.querySelector('.item__resumen .botones-compra-agregar ').dataset.id = item.id
        clone.querySelector('.item__resumen .botones-compra-descontar ').dataset.id = item.id

        fragment.appendChild(clone);
    }),

    tienda.appendChild(fragment);
    colocarFooter()
}

const colocarFooter = () => {
    console.log("totalCompra")
    totalCompra.textContent = "";

    const total = carrito.reduce(
        (acc, current) => acc + current.cantidad * current.precio, 0
    )

    const clone = totalCompraTemplate.content.cloneNode(true);
    clone.querySelector('span').textContent = total
    totalCompra.appendChild(clone);
}

const btnAumentar = (e) => {
/*     console.log('me diste click', e.target.dataset.id);
 */
    carrito = carrito.map( item => {
        if(item.id == e.target.dataset.id){
            item.cantidad ++;
        }
        return item
    })

    sacarCarrito();
    colocarFooter()
}

const btnDisminuir = (e) => {
    carrito = carrito.filter( item => {
        if(item.id == e.target.dataset.id) {
            if(item.cantidad > 0){
                item.cantidad--
                if(item.cantidad === 0) return
                return item
            }
        } else {
            return item;
        }
    });

    sacarCarrito();
    colocarFooter()
}

