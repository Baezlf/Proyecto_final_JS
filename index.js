class Manga {
    constructor(id, marca, formato, titulo, autor, tomos, stock, precio){
        this.id = id;
        this.marca = marca;
        this.formato = formato;
        this.titulo = titulo;
        this.autor = autor;
        this.tomos = tomos;
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

const manga = [
    new Manga(1, "ivrea", "tanko", "Shaman king", "Hiroyuki Takei", 17, 20, 1550),
    new Manga(2, "ivrea", "tanko", "Chainsaw man", "Tatsuki Fujimoto", 11, 20, 750),
    new Manga(3, "ivrea", "tanko", "Berserk", "Kentaro Miura", 41, 20, 1100),
    new Manga(4, "ivrea", "tanko", "Mushihime", "Masaya Hokazono", 3, 20, 850)
];


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
    let num = manga.length;
    manga.push(
        new Manga(
            num++,
            prompt(`Indique la marca:`).toLowerCase(), 
            prompt(`Indique el formato:`).toLowerCase(),
            prompt(`Indique el titulo:`),
            prompt(`Indique el autor:`),
            parseInt(prompt(`Indique la cantidad de tomos:`)),
            parseInt(prompt(`Idique el stock:`)),
            0
        )
    )
    if(manga.marca === preciosMarca.marca){
        if(manga.formato === preciosMarca.formato){
            manga.precio = preciosMarca.precio;
        }
    }
};

//visualizar el stock
let verStock = () => {
    let titulos = manga.map(item => item.precio).join("\n")//.map(item => item.stock).join("\n");
    alert(titulos);
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