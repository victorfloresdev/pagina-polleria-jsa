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

function iniciarSistema() {
    try {
        const cliente = registrarCliente();

        const financiero = typeof procesarCarrito === 'function' 
            ? procesarCarrito(menuPrincipal)
            : {
                items: [{ producto: "1/4 de Pollo a la Brasa", cantidad: 2, precioUnitario: 22, subtotalItem: 44 }],
                subtotal: 44.00,
                igv: 7.92,
                descuento: 0.00,
                totalFijo: 51.92
            };

        const estadisticas = typeof procesarEstadisticas === 'function'
            ? procesarEstadisticas(financiero.items)
            : {
                reciboEstructurado: ["2x 1/4 de Pollo a la Brasa (S/ 22.00) = S/ 44.00"],
                cantidadCalculada: 2,
                destacados: "1/4 de Pollo a la Brasa"
            };

        let itemsHTML = "";
        estadisticas.reciboEstructurado.forEach(linea => {
            itemsHTML += `<li>${linea}</li>`;
        });

        const boletaHTML = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; padding: 20px; border: 2px solid #333; border-radius: 8px; background-color: #fff8f0;">
                <h1 style="text-align: center; color: #8b0000; margin-bottom: 5px;">Pollería Nuevo Norte</h1>
                <h3 style="text-align: center; color: #555; margin-top: 0;">Boleta Electrónica Virtual</h3>
                <hr style="border: 1px solid #ddd;">
                <p><strong>Código de Cliente:</strong> ${cliente.codigo}</p>
                <p><strong>Cliente:</strong> ${cliente.nombre}</p>
                <p><strong>DNI:</strong> ${cliente.dni} | <strong>Teléfono:</strong> ${cliente.telefono}</p>
                <p><strong>Email:</strong> ${cliente.email}</p>
                <hr style="border: 1px solid #ddd;">
                <h3>Detalle de la Compra (${estadisticas.cantidadCalculada} productos):</h3>
                <ul>
                    ${itemsHTML}
                </ul>
                <p><strong>Productos Destacados (> S/ 30):</strong> ${estadisticas.destacados || "Ninguno"}</p>
                <hr style="border: 1px solid #ddd;">
                <p><strong>Subtotal:</strong> S/ ${financiero.subtotal.toFixed(2)}</p>
                <p><strong>IGV (18%):</strong> S/ ${financiero.igv.toFixed(2)}</p>
                <p><strong>Descuento Aplicado:</strong> S/ ${financiero.descuento.toFixed(2)}</p>
                <h2 style="color: #8b0000;">Total a Pagar: S/ ${financiero.totalFijo.toFixed(2)}</h2>
            </div>
        `;

        document.body.innerHTML = boletaHTML;

        console.log("Transacción completada exitosamente.");
        console.log("Serialización JSON del pedido:", JSON.stringify({ cliente, financiero, estadisticas }, null, 2));

    } catch (error) {
        console.error("Detalle técnico del error en el sistema:", error);
        document.body.innerHTML = `
            <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 50px auto; padding: 20px; border: 2px solid #d9534f; border-radius: 8px; background-color: #f2dede; color: #a94442; text-align: center;">
                <h2>Error en el Procesamiento</h2>
                <p>Ocurrió un inconveniente al procesar la transacción o se canceló una entrada de datos.</p>
                <p><small>Por favor, recargue la página para intentarlo nuevamente.</small></p>
            </div>
        `;
    }
}

window.onload = iniciarSistema;
