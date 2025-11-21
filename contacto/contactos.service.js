import { conexion } from "../db/conexionbd.js";

export const getDatosContactosCompletos = async () => {
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
	return manegarConsultas(consulta);
};

export const getGeneros = async () => {
	const consulta = `
    SELECT * FROM genero
  `;
	return manegarConsultas(consulta);
};

export const getTiposTelefono = async () => {
	const consulta = `
    SELECT * FROM tipo_telefono
  `;
	return manegarConsultas(consulta);
};

export const getDirecciones = async () => {
	const consulta = `
    SELECT * FROM direccion
  `;
	return manegarConsultas(consulta);
};

export const getContactosPorBarrio = async () => {
	const consulta = `
    SELECT d.detalle_direccion AS barrio, COUNT(c.id_contacto) AS cantidad
    FROM contacto c
    INNER JOIN direccion d ON c.id_direccion = d.id_direccion
    GROUP BY d.detalle_direccion
  `;
	return manegarConsultas(consulta);
};

export const crearContacto = async (contacto) => {
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
		contacto.primer_nombre,
		contacto.segundo_nombre,
		contacto.primer_apellido,
		contacto.segundo_apellido,
		contacto.id_genero,
		contacto.id_direccion,
		contacto.id_tipo_telefono,
		contacto.email,
		contacto.telefono,
		contacto.imagen,
	];

	const [resultado] = await conexion.query(consulta, values);
  return { id_insertado: resultado.insertId };
};

const manegarConsultas = async (consulta) => {
	try {
		const [rows] = await conexion.query(consulta);
		return rows;
	} catch (err) {
		console.error("Error en la consulta:", err);
		throw new Error("Error en la consulta");
	}
};
