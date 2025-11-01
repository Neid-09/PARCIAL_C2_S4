import express from "express";
import contactosRouter from "./controller/contactos.routes.js";

const app = express();
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.static("public"));
app.use('/contactos', contactosRouter);

app.get("/", (req, res) => {
	res.render("index", { currentPath: "/" });
});

app.get("/crearContacto", (req, res) => {
	res.render("crearContacto", { currentPath: "/crearContacto" });
});

app.get("/estadisticas", (req, res) => {
	res.render("estadisticas", { currentPath: "/estadisticas" });
});

app.listen(8080, () => {
	console.log("servidor activo en http://localhost:8080");
});
