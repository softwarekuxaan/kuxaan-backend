// Rutas del modulo de enlaces (recursos externos, p. ej. Google Drive).
//   GET    /api/projects/:id/links  -> admin: cualquiera; estudiante: solo sus proyectos
//   POST   /api/projects/:id/links  -> solo administrador
//   DELETE /api/links/:id           -> solo administrador
const express = require("express");
const enlacesController = require("./enlaces.controller");
const envolverAsync = require("../../utils/asyncHandler");
const autenticarUsuario = require("../../middlewares/autenticacion");
const autorizarRoles = require("../../middlewares/autorizacion");
const ROLES = require("../../utils/roles");

const enlacesRouter = express.Router();

enlacesRouter.use(autenticarUsuario);

enlacesRouter.delete(
  "/:id",
  autorizarRoles(ROLES.ADMINISTRADOR),
  envolverAsync(enlacesController.eliminarEnlace)
);

module.exports = enlacesRouter;
