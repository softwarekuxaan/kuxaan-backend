// Controller del modulo de proyectos.
const proyectosService = require("./proyectos.service");
const enlacesService = require("../enlaces/enlaces.service");
const { enviarExito } = require("../../utils/respuestas");
const obtenerIdNumerico = require("../../utils/parametros");

async function listarProyectos(peticion, respuesta) {
  const listaProyectos = await proyectosService.obtenerProyectos();
  return enviarExito(respuesta, listaProyectos);
}

async function obtenerProyecto(peticion, respuesta) {
  const idProyecto = obtenerIdNumerico(peticion.params.id, "idProyecto");
  const proyecto = await proyectosService.obtenerProyectoPorId(idProyecto);
  return enviarExito(respuesta, proyecto);
}

async function estudiantesDeProyecto(peticion, respuesta) {
  const idProyecto = obtenerIdNumerico(peticion.params.id, "idProyecto");
  const estudiantes = await proyectosService.obtenerEstudiantesDeProyecto(idProyecto);
  return enviarExito(respuesta, estudiantes);
}

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

async function crearProyecto(peticion, respuesta) {
  const proyectoCreado = await proyectosService.registrarProyecto(peticion.body);
  return enviarExito(respuesta, proyectoCreado, 201, "Proyecto registrado correctamente");
}

async function actualizarProyecto(peticion, respuesta) {
  const idProyecto = obtenerIdNumerico(peticion.params.id, "idProyecto");
  const proyectoActualizado = await proyectosService.actualizarProyecto(
    idProyecto,
    peticion.body
  );
  return enviarExito(respuesta, proyectoActualizado, 200, "Proyecto actualizado correctamente");
}

async function eliminarProyecto(peticion, respuesta) {
  const idProyecto = obtenerIdNumerico(peticion.params.id, "idProyecto");
  await proyectosService.eliminarProyecto(idProyecto);
  return enviarExito(respuesta, null, 200, "Proyecto eliminado correctamente");
}

module.exports = {
  listarProyectos,
  obtenerProyecto,
  estudiantesDeProyecto,
  listarEnlacesDeProyecto,
  crearEnlace,
  crearProyecto,
  actualizarProyecto,
  eliminarProyecto,
};
