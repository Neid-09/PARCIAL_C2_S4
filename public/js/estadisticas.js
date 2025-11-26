/* // Función para crear una barra de progreso
function crearBarraProgreso(label, cantidad, porcentaje, color) {
	return `
    <div class="progress-item">
      <div class="progress-header">
        <span class="progress-label">${label}</span>
        <span class="progress-value">${cantidad} (${porcentaje.toFixed(1)}%)</span>
      </div>
      <div class="progress-bar-container">
        <div class="progress-bar" style="width: ${porcentaje}%; background: ${color};">
          <span class="progress-percentage">${porcentaje.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  `;
}

// Paleta de colores para las barras
const colores = [
	"linear-gradient(135deg, #4a9eff 0%, #2c7fd9 100%)",
	"linear-gradient(135deg, #10b981 0%, #059669 100%)",
	"linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
	"linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
	"linear-gradient(135deg, #ec4899 0%, #db2777 100%)",
	"linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
	"linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
	"linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)",
	"linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
	"linear-gradient(135deg, #a855f7 0%, #9333ea 100%)",
];

// === CARGAR DISTRIBUCIÓN POR BARRIO DESDE API ===
fetch("/contactos/contactos_por_barrio")
	.then((res) => res.json())
	.then((data) => {
		// Calcular total de contactos
		const totalContactos = data.reduce((sum, item) => sum + item.cantidad, 0);

		// Actualizar estadísticas generales
		document.getElementById("total_contactos").textContent = totalContactos;
		document.getElementById("total_barrios").textContent = data.length;
		document.getElementById("promedio_por_barrio").textContent = (
			totalContactos / data.length
		).toFixed(1);

		// Ordenar barrios por cantidad (descendente)
		const barriosOrdenados = data.sort((a, b) => b.cantidad - a.cantidad);

		// Generar barras de progreso para barrios
		const barriosContainer = document.getElementById("barrios_container");
		barriosContainer.innerHTML = "";
		barriosOrdenados.forEach((item, index) => {
			const porcentaje = (item.cantidad / totalContactos) * 100;
			const color = colores[index % colores.length];
			barriosContainer.innerHTML += crearBarraProgreso(
				item.barrio,
				item.cantidad,
				porcentaje,
				color
			);
		});
	})
	.catch((error) => {
		console.error("Error al cargar distribución por barrio:", error);
	});
 */