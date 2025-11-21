import { Router } from "express";
import * as contactosController from "./contactos.controller.js";

const contactosRouter = Router();

contactosRouter.get("/", contactosController.getDatosContactosCompletos);

contactosRouter.get("/generos", contactosController.getGeneros);

contactosRouter.get("/tipos_telefono", contactosController.getTiposTelefono);

contactosRouter.get("/direcciones", contactosController.getDirecciones);

contactosRouter.post("/", contactosController.crearContacto);

contactosRouter.get("/contactos_por_barrio", contactosController.getContactosPorBarrio);

export default contactosRouter;