import express from "express";
import contactosRouter from "./contacto/contactos.routes.js";
import { getContactosPorBarrio, getDatosContactosCompletos, getDirecciones, getGeneros, getTiposTelefono } from "./contacto/contactos.service.js";

const app = express();
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.static("public"));
app.use('/contactos', contactosRouter);

app.get("/", async (req, res) => {
	const contactos = await getDatosContactosCompletos();
	res.render("index", { currentPath: "/", contactos });
});

app.get("/crearContacto", async (req, res) => {
	const generos = await getGeneros();
	const tiposTelefono = await getTiposTelefono();
	const direcciones = await getDirecciones();
	res.render("crearContacto", { currentPath: "/crearContacto", generos, tiposTelefono, direcciones });
});

app.get("/estadisticas", async (req, res) => {
	const contactosPorBarrio = await getContactosPorBarrio();
	console.log(contactosPorBarrio);
	res.render("estadisticas", { currentPath: "/estadisticas" , contactosPorBarrio });
});

app.listen(8080, () => {
	console.log("servidor activo en http://localhost:8080");
});
