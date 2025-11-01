// Carga contactos desde la API y los inserta en la tabla

/* 

  {
    "id_contacto": 1,
    "primer_nombre": "JUAN",
    "segundo_nombre": "CAMILO",
    "primer_apellido": "PEREZ",
    "segundo_apellido": "SOSSA",
    "email": "JUANCAMILO@GMAIL.COM",
    "genero": "MASCULINO",
    "telefono": "12345665879",
    "tipo_telefono": "HOGAR",
    "direccion": "BARRIO LA RESERVA",
    "imagen": null
  },

*/

fetch("/contactos")
	.then((res) => res.json())
	.then((data) => {
		const tbody = document.querySelector("#tabla_resultados tbody");
		tbody.innerHTML = "";
		data.forEach((contacto) => {
			const id = contacto.id_contacto ?? "";
			const nombre = [
				contacto.primer_nombre,
				contacto.segundo_nombre,
				contacto.primer_apellido,
				contacto.segundo_apellido,
			]
				.filter(Boolean)
				.join(" ");
			const email = contacto.email ?? "";
			const genero = contacto.genero ?? "";
			const telefono = contacto.telefono ?? "";
			const tipoTel = contacto.tipo_telefono ?? "";
			const direccion = contacto.direccion ?? "";
			const imagen = contacto.imagen ?? "";

			const tr = document.createElement("tr");
			tr.innerHTML = `
          <td>${id}</td>
          <td>${nombre}</td>
          <td>${genero}</td>
          <td>${direccion}</td>
          <td>${tipoTel}</td>
          <td>${email}</td>
          <td>${telefono}</td>
          <td>
            ${imagen
              ? `<img src="${imagen}" alt="foto-${id}" class="thumb">`
              : "Sin imagen"
            }
          </td>
          <td class="actions">
              <button class="btn btn-edit" data-id="${id}">Editar</button>
              <button class="btn btn-delete" data-id="${id}">Eliminar</button>
          </td>
                        `;
			tbody.appendChild(tr);
		});
	})
	.catch((err) => console.error("Error al cargar la información:", err));
