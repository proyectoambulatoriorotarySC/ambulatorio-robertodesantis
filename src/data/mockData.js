// src/data/mockData.js

/**
 * 1. COLECCIÓN: configuracion
 * Documento único: "global"
 * Propósito: Controlar el banner de alertas de contingencia, datos de pie de página y ecografías disponibles.
 */
export const mockConfiguracionGlobal = {
  avisoActivo: true,
  textoAviso: "Jornada de vacunación pediátrica este viernes 15. / El Dr. Pérez no pasará consulta esta tarde.",
  telefonoContacto: "0414-191-5455",
  horarioGeneral: "De lunes a viernes (7:30am-3:00pm)",
  direccionFisica: "Av. Norte Sur 4 Parcela 296-14-01 Ventuari. Cerca de la intersección con la Av. Atlántico.",
  consultasIntegrales: [
    {
      title: "Cardiología + EKG",
      detail: "Consulta integral con electrocardiograma en una sola visita.",
    },
    {
      title: "Ginecología + Eco",
      detail: "Eco pélvico o transvaginal según la indicación médica.",
    },
    {
      title: "Urología + Eco",
      detail: "Evaluación urológica con eco prostático o testicular.",
    },
    {
      title: "Cirugía + Eco abdominal",
      detail: "Valoración quirúrgica con apoyo diagnóstico inmediato.",
    },
  ],
  serviciosAdicionales: [
    "Eco de tiroides",
    "Eco de piel y partes blandas",
    "Eco doppler",
    "Citología",
    "Biopsia (consultar con antelación)"
  ]
};

/**
 * 2. COLECCIÓN: especialidades
 * Documentos múltiples (El ID de cada documento en Firestore debería ser el nombre en minúsculas sin acentos, ej: 'ginecologia-obstetricia')
 * Propósito: Mostrar a los pacientes el catálogo médico y permitir el filtrado avanzado por día o turno.
 */
export const mockEspecialidades = [
  {
    id: "ginecologia-obstetricia", // ID sugerido para el documento en Firestore
    nombre: "Ginecología y Obstetricia",
    medicos: [
      "Fued Nasser",
      "Rosabel Campos",
      "Yadith Castro"
    ],
    textoHorarioPlano: "De lunes a viernes en la mañana y en la tarde.",
    estudioIncluido: "Consulta + un eco pélvico o un eco transvaginal",
    cronograma: {
      lunes:     { mañana: true, tarde: true },
      martes:    { mañana: true, tarde: true },
      miercoles: { mañana: true, tarde: true },
      jueves:    { mañana: true, tarde: true },
      viernes:   { mañana: true, tarde: true }
    }
  },
  {
    id: "pediatria",
    nombre: "Pediatría",
    medicos: [
      "Dra. Elena Mendoza",
      "Dr. Carlos Rivero"
    ],
    textoHorarioPlano: "Martes y Jueves por la mañana.",
    estudioIncluido: "Consulta pediátrica + control de niño sano",
    cronograma: {
      lunes:     { mañana: false, tarde: false },
      martes:    { mañana: true,  tarde: false },
      miercoles: { mañana: false, tarde: false },
      jueves:    { mañana: true,  tarde: false },
      viernes:   { mañana: false, tarde: false }
    }
  },
  {
    id: "cardiologia",
    nombre: "Cardiología",
    medicos: [
      "Dr. Luis Alejandro"
    ],
    textoHorarioPlano: "Lunes, Miércoles y Viernes por la tarde.",
    estudioIncluido: "Consulta cardiológica + Electrocardiograma (ECG)",
    cronograma: {
      lunes:     { mañana: false, tarde: true },
      martes:    { mañana: false, tarde: false },
      miercoles: { mañana: false, tarde: true },
      jueves:    { mañana: false, tarde: false },
      viernes:   { mañana: false, tarde: true }
    }
  }
];