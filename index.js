class Manga {
    constructor(id, marca, formato, titulo, autor, stock, precio){
        this.id = id;
        this.marca = marca;
        this.formato = formato;
        this.titulo = titulo;
        this.autor = autor;
        this.stock = stock;
        this.precio = precio;
    }
    Venta(cantidad){
        if(this.stock > 0){this.stock -= cantidad;}
        else{alert(`Sin stock. Disculpe la molestia.`)}
    }
    
}

const manga = [
    new Manga(1, "Ivrea", "b6 doble", "Shaman king", "Hiroyuki Takei", 10, 1700),
    new Manga(2, "Ivrea", "tanko", "Chainsaw man", "Tatsuki Fujimoto", 10, 750),
    new Manga(3, "Panini", "tanko", "Berserk", "Kentaro Miura", 10, 1100),
    new Manga(4, "Ivrea", "b6", "Mushihime", "Masaya Hokazono", 10, 850),
    new Manga(5, "Ivrea", "b6", "Alice in Borderland", "Haro Aso", 10, 1700)
];

class Precios {
    constructor(marca, formato, precio){
        this.marca = marca;
        this.formato = formato;
        this.precio = precio;
    }
};

const preciosMarca = [
    new Precios("Ivrea", "tanko", 750),
    new Precios("Ivrea", "b6", 850),
    new Precios("Ivrea", "b6 doble", 1700),
    new Precios("Ivrea", "a5", 2000),
    new Precios("Panini", "tanko", 1100),
    new Precios("Panini", "b6 doble", 1700),
    new Precios("Panini", "a5", 1900),
    new Precios("Ovni press", "b6", 990),
    new Precios("Ovni press", "b6 doble", 1750)
];

let carrito = [];

const contenedor = document.getElementById("contenedor");
const carritoComprasHTML = document.getElementById("carrito");
const totalCompra = document.getElementById("total");
const vaciar = document.getElementById("boton-vaciar");
const comprar = document.getElementById("realizar-compra")
const agregarNuevoManga = document.getElementById("agregar-manga");
const formulario = document.getElementById("formulario");
const mangasVendidos = document.getElementById("mangas-vendidos");
const listaVentas = document.getElementById("ver-ventas");
const renovarStock = document.getElementById("renovar-stock");
const cargarStock = document.getElementById("cargar-stock");

//localStorage.setItem("mangasGuardados", JSON.stringify(manga))//comentar despues de cargar un producto nuevo para que no se sobreescriba


//mostrar productos en la pagina
let mangasGuardados = JSON.parse(localStorage.getItem("mangasGuardados"));
mangasGuardados.forEach(producto => {
    let {id, titulo, autor, marca, formato, precio, stock} = producto;
    const div = document.createElement(`div`);  
    let agregar = `<button id="agregar-prod", onclick="agregarProducto(${id})">Agregar al carrito</button>
    </div>
    `;
    let sinStock = `<p><b>Sin Stock</b></p>
    </div>
    `;
    let divHTML = `
        <div class="mostrar-productos">
            <h3 class="titulo-manga">"${titulo}"</h3>
            <p>Autor: ${autor}<br>
            Editorial: ${marca} <br>
            Formato: ${formato}<br>
            Precio: <b>$${precio}</b></p>`;
    stock > 0 ? divHTML +=agregar : divHTML +=sinStock;
    div.innerHTML +=divHTML;
    contenedor.append(div);
});

//Carrito de compras
let guardarCarrito = () => {
    localStorage.setItem("carritoStorage", JSON.stringify(carrito));
}

let eliminarProdCarrito = (id) => {
    carrito[id].cantidad--;
    carrito[id].cantidad === 0 && carrito.splice(id, 1);
    guardarCarrito();
    renderizarCarrito();
    calcularTotal();
};

let vaciarCarrito = () => {
    carrito = [];
    guardarCarrito();
    renderizarCarrito();
    calcularTotal();
}

vaciar.addEventListener("click", vaciarCarrito);

let renderizarCarrito = () =>{
    let carritoHTML = "";
    carrito.forEach((prod, id) => {
        let {titulo, precio, cantidad} = prod;
        carritoHTML += `
        <div class="prod-en-carrito">
            <h3>"${titulo}"</h3>
            Cantidad: ${cantidad}<br>
            <p>Precio: <span id="total">$${precio}</span></p><br>
            <button onclick="eliminarProdCarrito(${id})">Eliminar</button><br><br>
        </div>            
        `
    });
    carritoComprasHTML.innerHTML = carritoHTML;
}

let calcularTotal = () => {
    let total = 0;
    carrito.forEach(prod => {
        let {precio, cantidad} = prod;
        total += precio * cantidad;
    });
    totalCompra.innerHTML = `<b>$${total}</b>`;
};

//Buscar productos cargados anteriormente
let carritoStorage = JSON.parse(localStorage.getItem("carritoStorage"));

if(carritoStorage){
    carrito = carritoStorage;
}
renderizarCarrito();
calcularTotal();


//argregar productos al carrito de compras
const agregarProducto = (id) => {
    let producto = mangasGuardados.find((producto) => producto.id === id);
    let productoEnCarrito = carrito.find(producto => producto.id === id);
    if (productoEnCarrito){
        producto.cantidad < mangasGuardados[id-1].stock ? producto.cantidad++ : alert(`Su pedido supera la cantidad disponible de Stock del manga: "${producto.titulo}"`);
    } else {
        producto.cantidad = 1
        carrito.push(producto);
    }
    guardarCarrito();
    renderizarCarrito();
    calcularTotal();
} 


//Realizar la compra(disminuye la cantidad de stock disponible)
let guardarMangasLS = () => {
    localStorage.setItem("mangasGuardados", JSON.stringify(mangasGuardados));
}

let realizarCompra = () => {
    for(const prod of carrito){
        console.log(prod);
        let pos = prod.id - 1;
        console.log(mangasGuardados[pos])
        mangasGuardados[pos].stock -= prod.cantidad;
        mangasGuardados[pos].cantidadVendida ? mangasGuardados[pos].cantidadVendida += prod.cantidad : mangasGuardados[pos].cantidadVendida = prod.cantidad;
    }
    guardarMangasLS();
    vaciarCarrito();
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Gracias por su compra!',
        showConfirmButton: false,
        timer: 1500
      });
};

comprar.addEventListener("click", realizarCompra)

//Cargar un producto nuevo
let nuevoManga = () =>{
    const div = document.createElement(`div`);
    let cargarHTML = `
    <form id="formulario-carga"><!--marca, formato, titulo, autor, stock, precio-->
        <label for="marca">Marca: </label>
        <select id="marca" name="marca" required>
            <option>Ivrea</option>
            <option>Panini</option>
            <option>Ovni press</option>
        </select><br>
        <label for="formato">Formato: </label>
        <select id="formato" name="formato" required>
            <option>tanko</option>
            <option>b6</option>
            <option>b6 doble</option>
            <option>a5</option>
        </select><br>
        <label for="titulo">Titulo:</label>
        <input id="titulo" name="titulo" type="text" required><br>
        <label for="autor">Autor:</label>
        <input id="autor" name="autor" type="text" required><br>
        <label for="stock">Stock:</label>
        <input id="stock" name="stock" type="number" min="0" required><br>
        <button type="submit">Cargar</button>
    </form>
    
    `
    formulario.append(div);
    formulario.innerHTML = cargarHTML;
}

agregarNuevoManga.addEventListener("click", nuevoManga);

let agregarAlListado = (id) => {
    const div = document.createElement(`div`);
    let agregar = `<button id="agregar-prod", onclick="agregarProducto(${mangasGuardados[id].id})">Agregar al carrito</button>
    </div>
    `;
    let sinStock = `<b>Sin Stock</b></p>
    </div>
    `;
    let divHTML = `
        <div class="mostrar-productos">
            <h3 class="titulo-manga">"${mangasGuardados[id].titulo}"</h3>
            <p>Autor: ${mangasGuardados[id].autor}<br>
            Editorial: ${mangasGuardados[id].marca} <br>
            Formato: ${mangasGuardados[id].formato}<br>
            Precio: <b>$${mangasGuardados[id].precio}</b></p>`
            
    mangasGuardados[id].stock > 0 ? divHTML +=agregar : divHTML +=sinStock;
    div.innerHTML +=divHTML;
    contenedor.append(div);   
    guardarMangasLS();
};

formulario.addEventListener("submit", (e) =>{
    e.preventDefault();
    let numId = mangasGuardados.length +1;
    let ingresoMarca = document.getElementById("marca").value;
    let ingresoFormato = document.getElementById("formato").value;
    let ingresoTitulo = document.getElementById("titulo").value;
    let ingresoAutor = document.getElementById("autor").value;
    let ingresoStock = parseInt(document.getElementById("stock").value);
    mangasGuardados.push(
        new Manga(
            numId,
            ingresoMarca, 
            ingresoFormato,
            ingresoTitulo,
            ingresoAutor,
            ingresoStock,
            0
        )
    );
    let pos = numId - 1;
    let producto = preciosMarca.find(item => (item.marca === mangasGuardados[pos].marca) && (item.formato === mangasGuardados[pos].formato))
    mangasGuardados[pos].precio = producto.precio;
    agregarAlListado(pos);
    formulario.innerHTML = ""; 
} );


//ver ventas realizadas
let cerrarListaVentas = () => {
    listaVentas.innerHTML = "";
}

listaVentas.addEventListener("click", cerrarListaVentas);

let verVentas = () => {
    const table = document.createElement(`table`);
    let ventasTotales = 0;
    let recaudadoFinal = 0;
    let tablaHTML = `<table id="tabla">
    <tr>
    <th>Titulo</th>
    <th>Cantidad vendida</th>
    <th>Total recaudado</th>
    </tr>`
    for (const producto of mangasGuardados) {
        if(producto.cantidad>0){
            let totalRecaudado = producto.precio * producto.cantidadVendida;
            ventasTotales += producto.cantidadVendida;
            recaudadoFinal += totalRecaudado;
            let fila = `<tr><td>${producto.titulo}</td><td class="fila">${producto.cantidadVendida}</td><td class="fila">$${totalRecaudado}</td></tr>`;
            tablaHTML += fila;
        }
    }
    tablaHTML += `<tr><td>Cantidad Total</td><td class="fila">${ventasTotales}</td><td class="fila">$${recaudadoFinal}</td></tr>
    </table>`
    let botonCerrar = `<button id="cerrar">Cerrar</button>`;
    tablaHTML += botonCerrar;
    listaVentas.append(table);
    listaVentas.innerHTML = tablaHTML;
}

mangasVendidos.addEventListener("click", verVentas);

//renovar Stock
cargarStock.addEventListener("submit", (e) =>{
    e.preventDefault();
    let stock = parseInt(document.getElementById("stock").value);
    let titulo = document.getElementById("titulo").value;
    let index = mangasGuardados.findIndex(item => item.titulo === titulo);
    mangasGuardados[index].stock += stock;
    guardarMangasLS();
    cargarStock.innerHTML = "";
});

let agregarStock = () => {
    const div = document.createElement(`div`);
    let stockHTML = `
    <form id="formulario-carga-stock">
        <label for="titulo">Titulo: </label>
        <select id="titulo" name="titulo" required>`;
        for (const item of mangasGuardados) {
            let opciones = `<option>${item.titulo}</option>`;            
            stockHTML += opciones;
        }
        stockHTML +=`</select>
        <input id="stock" name="stock" type="number" min="0" required>
        <button type="submit">Cargar</button>
    </form>`;
    cargarStock.append(div);
    cargarStock.innerHTML = stockHTML;
}

renovarStock.addEventListener("click", agregarStock);