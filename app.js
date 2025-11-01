import express from "express";
import contactosRouter from "./controller/contactos.routes.js";

const app = express();

app.use(express.json());
app.use('/contactos', contactosRouter);
app.use(express.static("public"));

app.listen(8080, () => {
	console.log("servidor activo en http://localhost:8080");
});
