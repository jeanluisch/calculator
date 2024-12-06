document.getElementById("calculate-btn").addEventListener("click", () => {
    const riskPercentage = parseFloat(document.getElementById("risk-percentage").value);
    const pips = parseFloat(document.getElementById("pips").value);

    if (!riskPercentage || !pips) {
        alert("Por favor, introduce valores válidos.");
        return;
    }

    const lotSizes = [5000, 10000, 25000, 50000, 100000];
    const resultsTable = document.getElementById("results-table");
    resultsTable.innerHTML = "";

    lotSizes.forEach((lotSize) => {
        const result = ((lotSize * riskPercentage / 100) / pips).toFixed(2);
        const row = `<tr><td>${(lotSize / 1000)}K</td><td>${result}</td></tr>`;
        resultsTable.innerHTML += row;
    });

    // Guardar valores en localStorage
    localStorage.setItem("riskPercentage", riskPercentage);
    localStorage.setItem("pips", pips);
    localStorage.setItem("resultsTable", resultsTable.innerHTML);
});

// Recuperar valores al cargar la página
window.addEventListener("load", () => {
    const savedRiskPercentage = localStorage.getItem("riskPercentage");
    const savedPips = localStorage.getItem("pips");
    const savedResultsTable = localStorage.getItem("resultsTable");

    if (savedRiskPercentage) {
        document.getElementById("risk-percentage").value = savedRiskPercentage;
    }

    if (savedPips) {
        document.getElementById("pips").value = savedPips;
    }

    if (savedResultsTable) {
        document.getElementById("results-table").innerHTML = savedResultsTable;
    }
});
