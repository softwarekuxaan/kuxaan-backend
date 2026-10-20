// Acceso a datos de los enlaces de Google Drive por proyecto.
const clientePrisma = require("../../config/prisma");

// Enlaces de un proyecto, ordenados por fecha de creacion.
function listarEnlacesDeProyecto(idProyecto) {
  return clientePrisma.enlace.findMany({
    where: { idProyecto },
    orderBy: { fechaCreacion: "asc" },
  });
}

function buscarEnlacePorId(idEnlace) {
  return clientePrisma.enlace.findUnique({ where: { idEnlace } });
}

function crearEnlace(datosEnlace) {
  return clientePrisma.enlace.create({ data: datosEnlace });
}

function eliminarEnlace(idEnlace) {
  return clientePrisma.enlace.delete({ where: { idEnlace } });
}

module.exports = {
  listarEnlacesDeProyecto,
  buscarEnlacePorId,
  crearEnlace,
  eliminarEnlace,
};
