//Atrapando el dom.

let conteiner = document.querySelector('.conteiner');
let url = "https://www.mockachino.com/cf1c1dda-4681-4f/sebastian";
let btnCarrito = document.querySelector('.button-carrito');
let cards ;
let botonesCompra;
let carrito;
let idAgregado = [];
localStorage.removeItem('carrito');
let storage = [];
//Mostrar los productos.
const mostrarProductos = () => { 
    fetch(url)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
       cards =json.productos;
        cards.forEach(card => {
            const{img, title, description, price, id} = card
            
            conteiner.innerHTML += `<div class="card">
            <div class="contImg"><img ${img} class="imgCard card-img-top"></div>
            <div class="card-body">
            <h5 class="card-title"> ${title}</h5>
            <p class="card-text"> ${description}</p><hr>
            <p class="price">$${price}</p>
            <a href="#" class="btn btn-primary" id="${id}">Agregar al carrito</a>
            <p class="articuloAgregado hidden">AGREGADO AL CARRO ✔</p>
            </div>
            </div>`  
        })  
        botonesCompra = document.querySelectorAll (".btn")
        seleccionarProducto(botonesCompra)
    })
}
//Seleccionar producto.
const seleccionarProducto = (botonesCompra) => {
    let detalle = document.querySelector('.detalle')
    for(btnCompra of botonesCompra){
        btnCompra.onclick = (e) => {
            let id = e.target.id
            detalle.classList.remove('hidden')
            mostrarDetalle(id, detalle)  
        }
    }
} 
cargarYMostrarCarro = () => {  
    carrito = document.querySelector ('.carritoDeCompra')
    carrito.classList.add ('mostrarCarrito')
    let recuperoStorage = localStorage.getItem('carrito')
    let productos = JSON.parse(recuperoStorage)       
    carrito.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="bi bi-x-square svg" >
    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
    </svg>
    <div class="botonesCarro">
    <button class="vaciarCarrito">Vaciar</button>
    <p class="totalCarrito"></p>
    <button class="confirmarCarrito">Confirmar</button>
    </div>`; 
    
    for (let producto of productos) {
        const {img, title, price, id, enCarrito} = producto

        carrito.innerHTML += `<article class="card-cart" id="${id}">
        <div class="img-cart"><img class="miniatura" ${img} alt=""></div>
        <p class="title-cart">${title}</p>
        <div class="cantProd">${enCarrito}</div>
        <div class="price-cart">$${price}</div>
        </article>`
    }
    let totalCarro = document.querySelector('.totalCarrito');
    let vaciar = document.querySelector('.vaciarCarrito');
    let confirmar = document.querySelector('.confirmarCarrito');
    let cerrarCarrito = document.querySelector('.svg');
    
    cerrarCarrito.onclick = () =>{
        carrito.classList.remove ('mostrarCarrito')
    }
    
    
    
    confirmar.onclick = () =>{
        swal({
            title: `Perfecto! Tu compra está hecha.`,
            icon: 'success',
            confirmButtonText: 'Cool'
        })
    }
    
    
    vaciar.onclick = () =>{
        carrito.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="bi bi-x-square svg" >
        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
        <div class="botonesCarro">
        <button class="vaciarCarrito">Vaciar</button>
        <p class="totalCarrito"></p>
        <button class="confirmarCarrito">Confirmar</button>
        </div>`; 
        localStorage.removeItem('carrito');
        storage = [];
        carrito.classList.remove ('mostrarCarrito');

    }
}
//Mostrar detalles de compra.
const mostrarDetalle = (numProd, detalle) =>{
    
    let recuperoStorage = localStorage.getItem('carrito');
    let productos = JSON.parse(recuperoStorage);
    let cantidadProductos = 1;
    let card = cards[numProd-1];
    const{img, title, price, id} = card;
    
    if (!productos) {
        detalle.innerHTML =`<div class="caja">
        <div class="divImg">
        <img ${img} class="imgDetalle">
        </div>
        <p class="titleDetalle">${title}</p>
        <p class="priceDetalle">$${price}</p>
        <div class="contador">
        <span class="menos">-</span>
        <span class="resultado">${cantidadProductos}</span>
        <span class="mas">+</span>
        </div>
        <div class="decision">
        <button class="cancelar">Cancelar</button>    
        <button class="aceptar">Aceptar</button>
        </div>
        </div>`
    } else {
        
        for (let tarjeta of productos) {
            if (tarjeta.id == numProd) {
                console.log(tarjeta.id);
                cantidadProductos = tarjeta.enCarrito
                  
            }
        }  
        console.log(cantidadProductos);
           detalle.innerHTML =`<div class="caja">
                <div class="divImg">
                <img ${img} class="imgDetalle">
                </div>
                <p class="titleDetalle">${title}</p>
                <p class="priceDetalle">$${price}</p>
                <div class="contador">
                <span class="menos">-</span>
                <span class="resultado">${cantidadProductos}</span>
                <span class="mas">+</span>
                </div>
                <div class="decision">
                <button class="cancelar">Cancelar</button>    
                <button class="aceptar">Aceptar</button>
                </div>
                </div>`
        
            } 
        
        const cancelar = document.querySelector('.cancelar')
        const menos = document.querySelector('.menos')
        let resultado = document.querySelector('.resultado')
        const mas = document.querySelector('.mas')
        const agregarAlCarrito = document.querySelector('.aceptar')
        let contador = cantidadProductos;
        
        menos.onclick = () => {
            contador--
            //console.log(contador)
            contador = contador < 1 ? 1 : contador
            resultado.innerText = contador
        }
        mas.onclick = () => {
            contador++
            contador = contador > 10 ? 10 : contador
            resultado.innerText = contador
        }
        cancelar.onclick = () => {
            detalle.classList.add('hidden')
        }
        
        agregarAlCarrito.onclick = () => {
                card.enCarrito = contador;
                for (articulo of storage) {
                    let articuloAgregado = articulo.id;
                    if (card.id == articuloAgregado) {
                        let index = storage.indexOf(card);
                        storage.splice(index, 1);
                    }
                }
                storage.push(card);
                localStorage.setItem('carrito', JSON.stringify(storage));
                detalle.classList.add('hidden');
                cargarYMostrarCarro();
               }     
            }  
//Abrir carro.

btnCarrito.onclick = () =>{
    cargarYMostrarCarro()
}
mostrarProductos();
