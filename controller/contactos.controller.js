import { conexion } from "../db/conexionbd.js";

async function manegarConsultas(consulta, res) {
	try {
		const [rows] = await conexion.query(consulta);
		res.status(200).json(rows);
	} catch (err) {
		console.error("Error en la consulta:", err);
		res.status(500).json({ error: "Error en la consulta" });
	}
}

export const getDatosContactosCompletos = async (req, res) => {
	const consulta = `
      SELECT 
        c.id_contacto,
        c.primer_nombre,
        c.segundo_nombre,
        c.primer_apellido,
        c.segundo_apellido,
        c.email,
        g.detalle_genero AS genero,
        c.telefono,
        t.detalle_tipo_telefono AS tipo_telefono,
        d.detalle_direccion AS direccion,
        c.imagen
      FROM contacto c
      INNER JOIN genero g
          ON c.id_genero=g.id_genero
      INNER JOIN tipo_telefono t
          ON c.id_tipo_telefono=t.id_tipo_telefono
      INNER JOIN direccion d
          ON c.id_direccion=d.id_direccion
      ORDER BY c.id_contacto ASC
  `;
	manegarConsultas(consulta, res);
};

export const getGeneros = async (req, res) => {
	const consulta = `
    SELECT * FROM genero
  `;
	manegarConsultas(consulta, res);
};

export const getTiposTelefono = async (req, res) => {
	const consulta = `
    SELECT * FROM tipo_telefono
  `;
	manegarConsultas(consulta, res);
};

export const getDirecciones = async (req, res) => {
	const consulta = `
    SELECT * FROM direccion
  `;
	manegarConsultas(consulta, res);
};

export const getContactosPorBarrio = async (req, res) => {
	const consulta = `
    SELECT d.detalle_direccion AS barrio, COUNT(c.id_contacto) AS cantidad
    FROM contacto c
    INNER JOIN direccion d ON c.id_direccion = d.id_direccion
    GROUP BY d.detalle_direccion
  `;
	manegarConsultas(consulta, res);
};

export const crearContacto = async (req, res) => {
	const {
		primer_nombre,
		segundo_nombre,
		primer_apellido,
		segundo_apellido,
		id_genero,
		id_direccion,
		id_tipo_telefono,
		email,
		telefono,
		imagen,
	} = req.body;

	if (
		!primer_nombre ||
		!primer_apellido ||
		!email ||
		!id_genero ||
		!telefono ||
		!id_tipo_telefono ||
		!id_direccion
	) {
		return res.status(400).json({ error: "Faltan campos obligatorios" });
	}

	const consulta = `

    INSERT INTO contacto (
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      id_genero,
      id_direccion,
      id_tipo_telefono,
      email,
      telefono,
      imagen
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
	const values = [
		primer_nombre,
		segundo_nombre,
		primer_apellido,
		segundo_apellido,
		id_genero,
		id_direccion,
		id_tipo_telefono,
		email,
		telefono,
		imagen,
	];

	const [resultado] = await conexion.query(consulta, values);
	res.status(201).json({ id: resultado.insertId });
};
