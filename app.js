class Producto {
    constructor(id, nombre, precio, categoria) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
    }
}

const menuPrincipal = [
    new Producto(1, "1/4 de Pollo a la Brasa", 22.00, "Pollos"),
    new Producto(2, "1/2 Pollo a la Brasa", 34.00, "Pollos"),
    new Producto(3, "Pollo a la Brasa Entero", 64.00, "Pollos"),
    new Producto(4, "Mostrito de Pollo a la Brasa", 29.00, "Mostritos"),
    new Producto(5, "Arroz Chaufa de Pollo Especial", 19.90, "Chaufas"),
    new Producto(6, "Mollejitas a la Parrilla", 22.00, "Mollejitas"),
    new Producto(7, "Ensalada Fresca Familiar", 12.00, "Ensaladas"),
    new Producto(8, "Chicha Morada Natural 1.5 L", 12.00, "Bebidas")
];

const inventario = new Map();
inventario.set(1, 50);
inventario.set(2, 40);
inventario.set(3, 30);
inventario.set(4, 25);
inventario.set(5, 20);
inventario.set(6, 15);
inventario.set(7, 35);
inventario.set(8, 60);

const categoriasUnicas = new Set();
for (const producto of menuPrincipal) {
    categoriasUnicas.add(producto.categoria);
}

const menuJSON = JSON.stringify(menuPrincipal, null, 2);

function registrarCliente() {
    let nombre = "";
    let dni = "";
    let telefono = "";
    let email = "";

let nombreValido = false;
    while (!nombreValido) { 
        let inputNombre = prompt("Ingrese su nombre completo:");
        if (inputNombre && inputNombre.trim().length > 0) {
            nombre = inputNombre.trim().toUpperCase();
            nombreValido = true; 
        } else {
            alert("Error: El nombre no puede estar vacío.");
        }
    }

const regexDni = /^\d{8}$/;
    let dniValido = false;
    while (!dniValido) {
        let inputDni = prompt("Ingrese su número de DNI (8 dígitos):");
        if (inputDni && regexDni.test(inputDni.trim())) {
            dni = inputDni.trim();
            dniValido = true;
        } else {
            alert("Error: El DNI debe contener exactamente 8 dígitos numéricos.");
        }
    }

const regexTel = /^9\d{8}$/;
    let telValido = false;
    while (!telValido) {
        let inputTel = prompt("Ingrese su número de celular (debe empezar con 9 y tener 9 dígitos):");
        if (inputTel && regexTel.test(inputTel.trim())) {
            telefono = inputTel.trim();
            telValido = true;
        } else {
            alert("Error: Formato de celular incorrecto. Debe iniciar con 9 y tener 9 dígitos.");
        }
    }

    const regexEmail = /^[\w.-]+@[\w-]+\.[a-z]{2,}$/i;
    let emailValido = false;
    while (!emailValido) {
        let inputEmail = prompt("Ingrese su correo electrónico:");
        if (inputEmail && regexEmail.test(inputEmail.trim())) {
            email = inputEmail.trim();
            emailValido = true;
        } else {
            alert("Error: El formato del correo electrónico no es válido.");
        }
    }

    let letrasNombre = nombre.replace(/\s/g, '').slice(0, 3);
    let digitosDni = dni.slice(-4);
    let codigoBase = letrasNombre + digitosDni;
    let codigoFinal = codigoBase.padStart(10, "0");

return {
        nombre: nombre,
        dni: dni,
        telefono: telefono,
        email: email,
        codigo: codigoFinal
    };
}

function procesarCarrito(menu) {
    let items = [];
    let subtotalAcumulado = 0;
    let cantidadTotalArticulos = 0;
    let continuarComprando = true;

    do {
        let menuTexto = "--- MENÚ DE LA POLLERÍA --- \n";
        for (let  i = 0; i < menu.length; i++) {
            menuTexto += "ID: " + menu[i].id + " | " + menu[i].nombre + " -S/ " + menu[i].precio.toFixed(2) + "\n";
        }
        menuTexto += "\nIngrese el ID del producto que desea agregar:";

        let inputId = prompt(menuTexto);

        if(inputId !== null && inputId.trim() !== "") {
            let idSeleccionado = Number(inputId.trim());
            let productoEncontrado = null;

            for (let i = 0; i < menu.length; i++){
                if (menu[i].id === idSeleccionado) {
                    productoEncontrado = menu[i];
                    break;
                }
            }

            if ( productoEncontrado !== null) {
                let inputCantidad = prompt("Ingresa la cantidad para " + productoEncontrado.nombre + " :");

                if (inputCantidad !== null && inputCantidad.trim() !== "") {
                    let cantidad = Number(inputCantidad.trim());

                    if (!isNaN(cantidad) && cantidad > 0) {
                        let subtotalItem = productoEncontrado.precio * cantidad;

                        cantidadTotalArticulos += cantidad;
                        subtotalAcumulado += subtotalItem;

                        items.push({
                            producto: productoEncontrado.nombre,
                            cantidad: cantidad,
                            precioUnitario: productoEncontrado.precio,
                            subtotalItem: subtotalItem
                        });

                        alert("¡Producto agregar con exito!");
                    } else {
                        alert("ERROR: Ingrese un valor númerico valido mayor a 0.");
                    }
                }
            } else {
                alert("ERROR: No se a encontrado ningun producto con el ID ingresado.");
            }
        }


        continuarComprando  = confirm("¿Desea agregar otro producto al carrito?");
    }while (continuarComprando);

    let subtotal = Math.round((subtotalAcumulado + Number.EPSILON) * 100) /100;
    let igv = Math.round(((subtotal * 0.18) + Number.EPSILON) * 100)/100;

    let descuento = 0;
    if(cantidadTotalArticulos % 2 === 0 && cantidadTotalArticulos > 0 ){
        descuento = 5.00;
    }

    let totalFijo = Math.round(((subtotal + igv - descuento) + Number.EPSILON) * 100 ) /100;

    return {
        items: items,
        subtotal: subtotal,
        igv: igv,
        descuento: descuento,
        totalFijo: totalFijo
    };
}
