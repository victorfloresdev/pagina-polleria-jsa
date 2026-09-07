# pagina-polleria-jsa
## 1. Gestión de Datos y Estructuras

**Responsable:** Víctor Flores

### Objetivo del Módulo
Construir la base de datos simulada del sistema utilizando programación orientada a objetos, colecciones especializadas y notación JSON. Este módulo actúa como el generador de los datos iniciales que el resto de los módulos consumirá.

### Responsabilidades Técnicas
* Definir la clase `Producto` implementando el método `constructor` para inicializar propiedades.
* Instanciar un arreglo lineal (`menuPrincipal`) con múltiples objetos creados a partir de la clase.
* Implementar la colección estructurada `Map` (`inventario`) para vincular el ID de cada producto con su stock disponible.
* Implementar la colección estructurada `Set` (`categoriasUnicas`) para extraer las categorías del menú sin valores duplicados.
* Aplicar `JSON.stringify` para transformar el arreglo de objetos en una cadena de texto JSON.
* Declarar todas las estructuras como constantes globales en la parte superior del código.

### Contrato de Datos (Salidas)
Este módulo no recibe parámetros de entrada. Su responsabilidad es exportar las siguientes variables exactas para los demás módulos:

1. **`menuPrincipal` (Array de Objetos)**
   * `id`: Number (ejemplo: 1)
   * `nombre`: String (ejemplo: "1/4 de Pollo a la Brasa")
   * `precio`: Number (ejemplo: 22.00)
   * `categoria`: String (ejemplo: "Pollos")

2. **`inventario` (Map)**
   * Clave: Number (`id` del producto)
   * Valor: Number (stock disponible)

3. **`categoriasUnicas` (Set)**
   * Valores: String (categorías extraídas del menú)

4. **`menuJSON` (String)**
   * Serialización formateada de la variable `menuPrincipal`.
   * 

## 2. Validación y Manipulación de Cadenas

Responsable: Axel Rabanal 
Objetivo del Módulo: 
Gestionar la interacción inicial con el cliente capturando sus datos personales mediante ventanas emergentes (`prompt()`), aplicando transformaciones de texto y garantizando la integridad de la información mediante validaciones estrictas con expresiones regulares antes de permitir el inicio del pedido.

Responsabilidades Técnicas:
* Diseñar la función principal `registrarCliente()` controlando el flujo mediante bucles `while` y variables de estado (booleanos invertidos tipo `!esValido`) para prevenir bloqueos de memoria y evitar el uso de bucles infinitos.
* Aplicar los métodos `trim()` para limpieza de espacios y `toUpperCase()` para estandarizar cadenas.
* Validar el formato del DNI utilizando el método `test()` y la expresión regular `/^\d{8}$/`.
* Validar el número de celular peruano con la expresión regular `/^9\d{8}$/`.
* Validar el correo electrónico con la expresión regular `/^[\w.-]+@[\w-]+\.[a-z]{2,}$/i`, usando la bandera `i`.
* Generar un código de cliente único de 10 caracteres utilizando `slice()` para la extracción y `padStart()` para el relleno.

Contrato de Datos (Salidas):  
La función no requiere parámetros de entrada y retorna obligatoriamente un **Objeto Literal** con la siguiente estructura:
* `nombre`: Tipo String (ejemplo: "JUAN PEREZ")
* `dni`: Tipo String (ejemplo: "70123456")
* `telefono`: Tipo String (ejemplo: "987654321")
* `email`: Tipo String (ejemplo: "juan.perez@email.com")
* `codigo`: Tipo String (ejemplo: "000JUA3456")

## 4. Procesamiento Funcional de Arreglos
**Responsable:** Sara

### Objetivo del Módulo
Recibir los ítems del carrito procesados por el Integrante 3 y aplicar un enfoque declarativo para extraer estadísticas y dar formato final a la información, utilizando exclusivamente métodos de orden superior y arrow functions.

### Responsabilidades Técnicas
* Reemplazar las funciones tradicionales por el operador flecha (`=>`) en todos los callbacks del módulo.
* Emplear `map()` para transformar el arreglo de ítems del carrito en un arreglo de cadenas formateadas para la boleta.
* Utilizar `filter()` para extraer los productos cuyo subtotal supere S/ 30.00 (productos destacados).
* Aplicar `reduce()` para acumular la cantidad total de artículos comprados.
* Usar `forEach()` para recorrer los productos destacados y construir una cadena con sus nombres.

### Contrato de Datos (Entradas y Salidas)
**Entrada:** Arreglo de ítems del carrito, cada uno con `producto`, `cantidad`, `precioUnitario` y `subtotalItem`.

**Salida:** Objeto Literal con:
* `reciboEstructurado`: Array de Strings (líneas formateadas).
* `cantidadCalculada`: Number (total de artículos).
* `destacados`: String (nombres de productos destacados separados por guion).
