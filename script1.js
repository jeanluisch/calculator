function calcularLote() {
    const porcentaje = parseFloat(document.getElementById('porcentaje').value);
    const pips = parseFloat(document.getElementById('pips').value);
    const resultadosDiv = document.getElementById('resultados');

    const cuentas = [5000, 10000, 25000, 50000, 100000];
    let resultadoHTML = '';

    cuentas.forEach(cuenta => {
        const montoARiesgar = cuenta * (porcentaje / 100);
        const lote = montoARiesgar / pips;
        resultadoHTML += `<p>${cuenta} = ${lote.toFixed(2)}</p>`;
    });

    resultadosDiv.innerHTML = resultadoHTML;
}