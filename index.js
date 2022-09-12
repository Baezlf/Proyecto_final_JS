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
    constructor(marca, formato, precio){
        this.marca = marca;
        this.formato = formato;
        this.precio = precio;
    }
};

const preciosMarca = [
    new Precios("ivrea", "tanko", 750),
    new Precios("ivrea", "b6", 850),
    new Precios("ivrea", "b6 doble", 1700),
    new Precios("ivrea", "a5", 2000),
    new Precios("panini", "tanko", 1100),
    new Precios("panini", "b6 doble", 1700),
    new Precios("panini", "a5", 1900),
    new Precios("ovni press", "b6", 990),
    new Precios("ovni press", "b6 doble", 1750)
];

const manga = [//id, marca, formato, titulo, autor, tomo, tomosTotales, stock, precio
    new Manga(1, "ivrea", "b6 doble", "Shaman king", "Hiroyuki Takei", 1, 17, 30, 1700),
    new Manga(2, "ivrea", "b6 doble", "Shaman king", "Hiroyuki Takei", 2, 17, 20, 1700),
    new Manga(3, "ivrea", "b6 doble", "Shaman king", "Hiroyuki Takei", 3, 17, 25, 1700),
    new Manga(4, "ivrea", "tanko", "Chainsaw man", "Tatsuki Fujimoto", 9, 11, 15, 750),
    new Manga(5, "ivrea", "tanko", "Chainsaw man", "Tatsuki Fujimoto", 10, 11, 10, 750),
    new Manga(6, "panini", "tanko", "Berserk", "Kentaro Miura", 1, 41, 10, 1100),
    new Manga(7, "panini", "tanko", "Berserk", "Kentaro Miura", 2, 41, 15, 1100),
    new Manga(8, "ivrea", "b6", "Mushihime", "Masaya Hokazono", 1, 3, 15, 850),
    new Manga(9, "ivrea", "b6", "Mushihime", "Masaya Hokazono", 2, 3, 10, 850),
    new Manga(10, "ivrea", "b6", "Mushihime", "Masaya Hokazono", 3, 3, 10, 850)
];
//validar la opcion usuario/admin.
let validar = (a) => {while(a === ""){
    a = prompt(`Usuario incorrecto.
    Indique su nombre: (admin para cargar/ver datos)`);
    }
    return a;
}

//validar marca
let validarMarca = (ingresoMarca) => {
    ingresoMarca = prompt(`Indique la marca:`).toLowerCase();
    let verif = preciosMarca.some(item => item.marca === ingresoMarca)
    while(verif !== true){
        ingresoMarca = prompt(`Ingreso incorrecto.
        Ingrese la marca nuevamente:`).toLowerCase();
        verif = preciosMarca.some(item => item.marca === ingresoMarca);
    }
    return ingresoMarca;
}

//validar formato
let validarFormato = (ingresoFormato, ingresoMarca) => {
    ingresoFormato = prompt(`Indique el formato:`).toLowerCase();
    let verif = preciosMarca.some(item => (item.marca === ingresoMarca) && (item.formato === ingresoFormato))
    while(verif !== true){
        ingresoFormato = prompt(`Ingreso incorrecto.
        Ingrese el formato nuevamente:`).toLowerCase();
        verif = preciosMarca.some(item => (item.marca === ingresoMarca) && (item.formato === ingresoFormato));
    }
    return ingresoFormato;
}

//ingreso como admin

//carga de datos
let cargarDatos = () => {
    let numId = manga.length;
    let ingresoMarca;
    let ingresoFormato;
    manga.push(
        new Manga(
            numId++,
            ingresoMarca = validarMarca(ingresoMarca), 
            ingresoFormato = validarFormato(ingresoFormato, ingresoMarca),
            prompt(`Indique el titulo:`),
            prompt(`Indique el autor:`),
            parseInt(prompt(`Indique el tomo:`)),
            parseInt(prompt(`Indique la cantidad de tomos totales:`)),
            parseInt(prompt(`Idique el stock:`)),
            0
        )
    );
    let pos = manga.length - 1;
    let marca = manga[pos].marca
    let formato = manga[pos].formato
    let producto = preciosMarca.find(item => (item.marca === marca) && (item.formato === formato))
    manga[pos].precio = producto.precio;
};

//visualizar el stock
let verStock = () => {
    let mensaje = manga.map(obj => {
        return `"${obj.titulo}" tomo ${obj.tomo} : ${obj.stock} $${obj.precio}`
    }).join("\n");
    alert(mensaje);
}

//ver las ventas
let verVentas = () => {
    alert(`En proceso.`)
};

//Menu administrador
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