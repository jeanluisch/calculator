// Variables globales para los datos de los gráficos
let sumatoriaDias = []; // Sumatorias del día
let fechas = []; // Fechas correspondientes
let resultados = { SL: 0, TP: 0 }; // Contador de resultados

// Manejo de Formulario y Tabla
document.getElementById("data-form").addEventListener("submit", function (e) {
    e.preventDefault();

    // Obtener valores del formulario
    const fecha = document.getElementById("fecha").value;
    const activo = document.getElementById("activo").value;
    const resultado = document.getElementById("resultado").value;
    const sumatoria = parseInt(document.getElementById("sumatoria").value);

    // Validación simple
    if (!fecha || !activo || isNaN(sumatoria)) return;

    // Agregar fila a la tabla
    const tabla = document.querySelector("#resultados-tabla tbody");
    const nuevaFila = `
        <tr>
            <td>${fecha}</td>
            <td>${activo}</td>
            <td>${resultado}</td>
            <td>${sumatoria}</td>
        </tr>
    `;
    tabla.innerHTML += nuevaFila;

    // Actualizar datos globales
    fechas.push(fecha);
    sumatoriaDias.push(sumatoria);
    resultados[resultado] = (resultados[resultado] || 0) + 1;

    // Actualizar gráficos
    actualizarGraficos();
});

// Inicializar gráficos
let graficoBarras, graficoCircular;

function inicializarGraficos() {
    // Gráfico de Barras
    const ctxBarras = document.getElementById("grafico-barras").getContext("2d");
    graficoBarras = new Chart(ctxBarras, {
        type: "bar",
        data: {
            labels: fechas,
            datasets: [
                {
                    label: "Sumatoria del Día",
                    data: sumatoriaDias,
                    backgroundColor: "rgba(75, 192, 192, 0.5)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });

    // Gráfico Circular
    const ctxCircular = document.getElementById("grafico-circular").getContext("2d");
    graficoCircular = new Chart(ctxCircular, {
        type: "pie",
        data: {
            labels: ["SL", "TP"],
            datasets: [
                {
                    label: "Distribución de Resultados",
                    data: [resultados.SL, resultados.TP],
                    backgroundColor: ["rgba(255, 99, 132, 0.5)", "rgba(54, 162, 235, 0.5)"],
                    borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
        },
    });
}

// Actualizar gráficos dinámicamente
function actualizarGraficos() {
    // Actualizar datos del gráfico de barras
    graficoBarras.data.labels = fechas;
    graficoBarras.data.datasets[0].data = sumatoriaDias;
    graficoBarras.update();

    // Actualizar datos del gráfico circular
    graficoCircular.data.datasets[0].data = [resultados.SL, resultados.TP];
    graficoCircular.update();
}

// Inicializar los gráficos al cargar la página
inicializarGraficos();
