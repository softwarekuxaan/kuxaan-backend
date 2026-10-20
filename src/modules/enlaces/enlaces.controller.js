// Controller del modulo de enlaces (recursos externos por proyecto).
const enlacesService = require("./enlaces.service");
const { enviarExito } = require("../../utils/respuestas");
const obtenerIdNumerico = require("../../utils/parametros");

async function listarEnlacesDeProyecto(peticion, respuesta) {
  const idProyecto = obtenerIdNumerico(peticion.params.id, "idProyecto");
  const listaEnlaces = await enlacesService.obtenerEnlacesDeProyecto(
    idProyecto,
    peticion.usuario
  );
  return enviarExito(respuesta, listaEnlaces);
}

async function crearEnlace(peticion, respuesta) {
  const idProyecto = obtenerIdNumerico(peticion.params.id, "idProyecto");
  const enlaceCreado = await enlacesService.registrarEnlace(idProyecto, peticion.body);
  return enviarExito(respuesta, enlaceCreado, 201, "Enlace registrado correctamente");
}

async function eliminarEnlace(peticion, respuesta) {
  const idEnlace = obtenerIdNumerico(peticion.params.id, "idEnlace");
  await enlacesService.eliminarEnlace(idEnlace);
  return enviarExito(respuesta, null, 200, "Enlace eliminado correctamente");
}

module.exports = {
  listarEnlacesDeProyecto,
  crearEnlace,
  eliminarEnlace,
};
