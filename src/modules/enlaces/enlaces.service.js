// Logica de negocio de los enlaces externos (Google Drive) por proyecto.
// Reglas:
//   - Cualquier usuario autenticado puede listar los enlaces, pero un
//     estudiante solo los de sus propios proyectos.
//   - Solo el administrador agrega o elimina enlaces.
const enlacesRepository = require("./enlaces.repository");
const proyectosService = require("../proyectos/proyectos.service");
const asignacionesService = require("../asignaciones/asignaciones.service");
const ErrorAplicacion = require("../../utils/errores");
const ROLES = require("../../utils/roles");

async function obtenerEnlacesDeProyecto(idProyecto, usuarioAutenticado) {
  await proyectosService.obtenerProyectoPorId(idProyecto);

  // Un estudiante solo consulta los enlaces de los proyectos asignados.
  if (usuarioAutenticado.rol === ROLES.ESTUDIANTE) {
    await asignacionesService.asegurarAsignacion(
      usuarioAutenticado.idAlumno,
      idProyecto
    );
  }

  return enlacesRepository.listarEnlacesDeProyecto(idProyecto);
}

async function registrarEnlace(idProyecto, datosEntrada) {
  await proyectosService.obtenerProyectoPorId(idProyecto);

  const titulo = String(datosEntrada.titulo || "").trim();
  const url = String(datosEntrada.url || "").trim();

  if (!titulo) {
    throw new ErrorAplicacion("El titulo del enlace es obligatorio", 400);
  }
  if (titulo.length > 150) {
    throw new ErrorAplicacion("El titulo no puede superar 150 caracteres", 400);
  }

  let urlValidada;
  try {
    urlValidada = new URL(url);
  } catch {
    throw new ErrorAplicacion("La url del enlace no es valida", 400);
  }
  if (!["http:", "https:"].includes(urlValidada.protocol)) {
    throw new ErrorAplicacion("La url del enlace debe usar http o https", 400);
  }
  if (url.length > 500) {
    throw new ErrorAplicacion("La url no puede superar 500 caracteres", 400);
  }

  return enlacesRepository.crearEnlace({ idProyecto, titulo, url });
}

async function eliminarEnlace(idEnlace) {
  const enlaceEncontrado = await enlacesRepository.buscarEnlacePorId(idEnlace);

  if (!enlaceEncontrado) {
    throw new ErrorAplicacion("Enlace no encontrado", 404);
  }

  return enlacesRepository.eliminarEnlace(idEnlace);
}

module.exports = {
  obtenerEnlacesDeProyecto,
  registrarEnlace,
  eliminarEnlace,
};
