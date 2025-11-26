/* const genero = document.getElementById("id_genero");
const tipoTelefono = document.getElementById("id_tipo_telefono");
const direccion = document.getElementById("id_direccion");

// Función para mostrar alertas
function mostrarAlerta(mensaje, tipo = "success") {
	// Eliminar alertas existentes
	const alertasExistentes = document.querySelectorAll(".alert");
	alertasExistentes.forEach((alerta) => alerta.remove());

	// Crear nueva alerta
	const alerta = document.createElement("div");
	alerta.className = `alert alert-${tipo}`;

	// Icono según el tipo
	const icono =
		tipo === "success"
			? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`
			: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;

	alerta.innerHTML = `
    <div class="alert-icon">${icono}</div>
    <span>${mensaje}</span>
    <button class="alert-close" onclick="this.parentElement.remove()">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>
  `;

	document.body.appendChild(alerta);

	// Auto-cerrar después de 5 segundos
	setTimeout(() => {
		alerta.classList.add("hiding");
		setTimeout(() => alerta.remove(), 300);
	}, 5000);
}

// Fetch generos
fetch("/contactos/generos")
	.then((res) => res.json())
	.then((data) => {
		data.forEach((item) => {
			const option = document.createElement("option");
			option.value = item.id_genero;
			option.textContent = item.detalle_genero;
			genero.appendChild(option);
		});
	});

// Fetch tipos de telefono
fetch("/contactos/tipos_telefono")
	.then((res) => res.json())
	.then((data) => {
		data.forEach((item) => {
			const option = document.createElement("option");
			option.value = item.id_tipo_telefono;
			option.textContent = item.detalle_tipo_telefono;
			tipoTelefono.appendChild(option);
		});
	});

// Fetch direcciones
fetch("/contactos/direcciones")
	.then((res) => res.json())
	.then((data) => {
		data.forEach((item) => {
			const option = document.createElement("option");
			option.value = item.id_direccion;
			option.textContent = item.detalle_direccion;
			direccion.appendChild(option);
		});
	}); */

/* // == ENVIAR FORMULARIO ==
const formulario = document.getElementById("form_crear_contacto");
formulario.addEventListener("submit", (e) => {
	e.preventDefault();

	const formData = new FormData(formulario);
	const datos = {};

	formData.forEach((value, key) => {
		datos[key] = value;
	});

	fetch("/contactos", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(datos),
	})
		.then((res) => res.json())
		.then((data) => {
			console.log("Contacto creado:", data);
			mostrarAlerta("¡Contacto creado exitosamente!", "success");

			// Limpiar formulario después de 2 segundos
			formulario.reset();

		})
		.catch((error) => {
			console.error("Error al crear contacto:", error);
			mostrarAlerta(
				"Error al crear el contacto. Por favor, intenta nuevamente.",
				"error"
			);
		});
}); */
const formulario = document.getElementById("form_crear_contacto");
formulario.addEventListener("submit", (e) => {
	e.preventDefault();
	const formData = new FormData(formulario);
	const datos = {};
	formData.forEach((value, key) => {
		datos[key] = value;
	});

	fetch("/contactos", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(datos),
	})
		.then((res) => res.json())
		.then(async (data) => {
			console.log("Contacto creado:", data);
			await Swal.fire({
				title: "¡Éxito!",
				text: "Contacto creado exitosamente.",
				icon: "success",
			});
			formulario.reset();
		})
		.catch((error) => {
			console.error("Error al crear contacto:", error);
			Swal.fire({
				title: "Error",
				text: "Hubo un problema al crear el contacto.",
				icon: "error",
			});
		});
});
