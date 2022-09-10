class Manga {
    constructor(id, marca, formato, titulo, autor, tomo, tomosTotales, stock, precio){
        this.id = id;
        this.marca = marca;
        this.formato = formato;
        this.titulo = titulo;
        this.autor = autor;
        this.tomo = tomo;
        this.tomosTotales = tomosTotales;
        this.stock = stock;
        this.precio = precio;
    }
    venta(cantidad){
        this.stock -= cantidad;
    }
}

class Precios {
    constructor(marcaFormato, precio){
        this.marcaFormato = marcaFormato;
        this.precio = precio;
    }
};

const preciosMarca = [
    new Precios("ivrea tanko", 750),
    new Precios("ivrea b6", 850),
    new Precios("ivrea b6 doble", 1700),
    new Precios("ivrea a5", 2000),
    new Precios("panini tanko", 1100),
    new Precios("panini b6 doble", 1700),
    new Precios("panini a5", 1900),
    new Precios("ovni press b6", 990),
    new Precios("ovni press b6 doble", 1750)
];

const manga = [];

//validar la opcion usuario/admin.
let validar = (a) => {while(a === ""){
    a = prompt(`Usuario incorrecto.
    Indique su nombre: (admin para cargar/ver datos)`);
    }
    return a;
}

//ingreso como admin

//carga de datos
let cargarDatos = () => {
    manga.push(
        new Manga(
            parseInt(prompt(`Indique el id:`)),
            prompt(`Indique la marca:`).toLowerCase(), 
            prompt(`Indique el formato:`).toLowerCase(),
            prompt(`Indique el titulo:`),
            prompt(`Indique el autor:`),
            parseInt(prompt(`Indique el tomo:`)),
            parseInt(prompt(`Indique la cantidad de tomos totales:`)),
            parseInt(prompt(`Idique el stock:`)),
            0
        )
    )
    let pos = manga.length - 1;
    let marcaTipo = `${manga[pos].marca} ${manga[pos].formato}`
    let parametro = false;
    let i = 0;
    while(parametro != true) {
        if (preciosMarca[i].marcaFormato === marcaTipo){
            parametro = true;
        } else if(i === preciosMarca.length){
            parametro = true;
        } else {i++}
    }
    manga[pos].precio = preciosMarca[i].precio;
};

//visualizar el stock
let stock = (manga) => {
    return `"${manga.titulo}" tomo ${manga.tomo} : ${manga.stock} $${manga.precio}`
}

let verStock = () => {
    let stockDisponible = manga.map(stock);
    alert(stockDisponible);
};

//ver las ventas
let verVentas = () => {
    alert(`En proceso.`)
};

//Menu
let menuAdmin = () => {
    let opcion = parseInt(prompt(`Presione: 
    1) para cargar datos.
    2) para ver el stock.
    3) para ver las ventas.
    0) para salir.`));

    while(opcion !== 0){
        switch(opcion){
            case 1: cargarDatos();
            break;
            case 2: verStock();
            break;
            case 3: verVentas();
            break;
            default: alert(`Opcion incorrecta.`);
        }
        opcion = parseInt(prompt(`Presione: 
        1) para cargar datos.
        2) para ver el stock.
        3) para ver las ventas.
        0) para salir.`));
        }
}

//menu ingreso como Usuario

let menuUsuario = (nombre) => {
    alert(`Hola ${nombre}`)
}

//inicio de la web

let nombre = prompt(`Indique su nombre: (admin para cargar/ver datos)`);
nombre = validar(nombre);

if(nombre.toLowerCase() === "admin"){
    menuAdmin();
    alert(`Adios`);
} else {
    menuUsuario(nombre);
}