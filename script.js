function calcularPrecio() {
    const margenGanancia = parseFloat(document.getElementById('margenGanancia').value);
    const valorDolarCripto = parseFloat(document.getElementById('valorDolarCripto').value);
    const mensajeError = document.getElementById('mensajeError');
    const resultado = document.getElementById('resultado');

    mensajeError.innerHTML = ''; // Limpiar mensajes anteriores
    resultado.innerHTML = ''; // Limpiar resultados anteriores
    resultado.style.opacity = '0'; // Ocultar el resultado temporalmente

    // Validaciones
    if (isNaN(margenGanancia) || isNaN(valorDolarCripto)) {
        mensajeError.innerHTML = 'Por favor, ingrese el margen de ganancia y el valor del dólar cripto.';
        return;
    }
    if (margenGanancia < 0 || margenGanancia > 100 || valorDolarCripto <= 0) {
        mensajeError.innerHTML = 'Por favor, ingrese valores válidos. (El margen debe estar entre 0% y 100%)';
        return;
    }

    // Obtener todas las cantidades y precios de seguidores ingresados
    const cantidades = document.querySelectorAll('.cantidadSeguidores');
    const precios = document.querySelectorAll('.precioSeguidores');

    cantidades.forEach((cantidadInput, index) => {
        const cantidadSeguidores = parseFloat(cantidadInput.value);
        const precioDolares = parseFloat(precios[index].value);

        if (!isNaN(cantidadSeguidores) && cantidadSeguidores > 0 && !isNaN(precioDolares) && precioDolares > 0) {
            const precioCostoARS = precioDolares * valorDolarCripto;
            const gananciaARS = precioCostoARS * (margenGanancia / 100);
            const precioVentaARS = precioCostoARS + gananciaARS;
            const precioVentaUSD = precioVentaARS / valorDolarCripto;

            resultado.innerHTML += `
                <div class="precio">
                    <strong>${cantidadSeguidores} seguidores:</strong><br>
                    Precio de venta: ${precioVentaARS.toFixed(2)} ARS<br>
                    Precio de venta: ${precioVentaUSD.toFixed(2)} USD
                </div>
            `;
        }
    });

    resultado.style.opacity = '1'; // Mostrar el resultado con una pequeña animación
}

// Agregar más campos de seguidores y precio
document.getElementById('agregarSeguidores').addEventListener('click', function() {
    const container = document.getElementById('seguidoresContainer');
    const newGroup = document.createElement('div');
    newGroup.classList.add('seguidores-group');
    newGroup.innerHTML = `
        <label for="cantidadSeguidores">Cantidad de seguidores:</label>
        <input type="number" class="cantidadSeguidores" min="0" placeholder="Ingrese la cantidad de seguidores">
        
        <label for="precioSeguidores">Precio en dólares (USD):</label>
        <input type="number" class="precioSeguidores" min="0" step="0.01" placeholder="Ingrese el precio en USD">
    `;
    container.appendChild(newGroup);
});
