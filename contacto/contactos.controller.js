import * as ServiceContacto from "./contactos.service.js";

export const getDatosContactosCompletos = async (req, res) => {
	const contactos = await ServiceContacto.getDatosContactosCompletos();
	try{

		res.status(200).json(contactos);
	}
	catch (error) {
		console.error("Error al obtener los contactos:", error);
		res.status(500).json({ error: "Error interno del servidor" });
	}
};

export const getGeneros = async (req, res) => {
	const generos = await ServiceContacto.getGeneros();
	try {
		res.status(200).json(generos);
	} catch (error) {
		console.error("Error al obtener los géneros:", error);
		res.status(500).json({ error: "Error interno del servidor" });
	}
};

export const getTiposTelefono = async (req, res) => {
	const tiposTelefono = await ServiceContacto.getTiposTelefono();
	try {
		res.status(200).json(tiposTelefono);
	} catch (error) {
		console.error("Error al obtener los tipos de teléfono:", error);
		res.status(500).json({ error: "Error interno del servidor" });
	}
};

export const getDirecciones = async (req, res) => {
	const direcciones = await ServiceContacto.getDirecciones();
	try {
		res.status(200).json(direcciones);
	} catch (error) {
		console.error("Error al obtener las direcciones:", error);
		res.status(500).json({ error: "Error interno del servidor" });
	}
};

export const getContactosPorBarrio = async (req, res) => {
	const contactosPorBarrio = await ServiceContacto.getContactosPorBarrio();
	try {
		res.status(200).json(contactosPorBarrio);
	} catch (error) {
		console.error("Error al obtener los contactos por barrio:", error);
		res.status(500).json({ error: "Error interno del servidor" });
	}
};

export const crearContacto = async (req, res) => {
	const nuevoContacto = req.body;
	const resultado = await ServiceContacto.crearContacto(nuevoContacto);
	try {
		res.status(201).json(resultado);
	} catch (error) {
		console.error("Error al crear el contacto:", error);
		res.status(500).json({ error: "Error interno del servidor" });
	}
};
