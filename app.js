import express from "express";
import { conexion } from "./db/conexionbd.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// == PARA OBTENER DATOS COMPLETOS ==
app.get("/contactos", (req, res) => {
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
	conexion.query(consulta, (err, respuesta) => {
		if (err) {
			throw err;
		}
		res.json(respuesta);
	});
});

// == OBTENER GENEROS ==
app.get("/generos", (req, res) => {
	const consulta = `
    SELECT * FROM genero
  `;

	conexion.query(consulta, (err, respuesta) => {
		if (err) {
			throw err;
		}
		res.json(respuesta);
	});
});

// == OBTENER TIPOS_TELEFONO ==
app.get("/tipos_telefono", (req, res) => {
	const consulta = `
    SELECT * FROM tipo_telefono
  `;

	conexion.query(consulta, (err, respuesta) => {
		if (err) {
			throw err;
		}
		res.json(respuesta);
	});
});

// == OBTENER DIRECCIONES ==
app.get("/direcciones", (req, res) => {
	const consulta = `
    SELECT * FROM direccion
  `;

	conexion.query(consulta, (err, respuesta) => {
		if (err) {
			throw err;
		}
		res.json(respuesta);
	});
});

// == CREAR CONTACTO ==
app.post("/contactos", (req, res) => {
	const {
		primer_nombre,
		segundo_nombre,
		primer_apellido,
		segundo_apellido,
		email,
		id_genero,
		telefono,
		id_tipo_telefono,
		id_direccion,
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

  conexion.query(consulta, [
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
  ], (err, resultado) => {
    if (err) {
      throw err;
    }
    res.status(201).json({ id: resultado.insertId });
  });
});

// == TRAER CANTIDAD DE PERSONAS POR BARRIO ==

app.get("/personas_por_barrio", (req, res) => {
	const consulta = `
    SELECT d.detalle_direccion AS barrio, COUNT(c.id_contacto) AS cantidad
    FROM contacto c
    INNER JOIN direccion d ON c.id_direccion = d.id_direccion
    GROUP BY d.detalle_direccion
  `;

	conexion.query(consulta, (err, respuesta) => {
		if (err) {
			throw err;
		}
		res.json(respuesta);
	});
});

app.listen(8080, () => {
	console.log("servidor activo en http://localhost:8080");
});
