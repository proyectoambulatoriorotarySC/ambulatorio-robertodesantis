const days = ["lunes", "martes", "miercoles", "jueves", "viernes"];

const buildCronograma = (config = {}) =>
  days.reduce((accumulator, day) => {
    const turnos = config[day] ?? [];
    accumulator[day] = {
      mañana: turnos.includes("mañana"),
      tarde: turnos.includes("tarde"),
    };
    return accumulator;
  }, {});

const scheduleMorning = buildCronograma({
  lunes: ["mañana"],
  martes: ["mañana"],
  miercoles: ["mañana"],
  jueves: ["mañana"],
  viernes: ["mañana"],
});

const scheduleAfternoon = buildCronograma({
  lunes: ["tarde"],
  martes: ["tarde"],
  miercoles: ["tarde"],
  jueves: ["tarde"],
  viernes: ["tarde"],
});

const scheduleFull = buildCronograma({
  lunes: ["mañana", "tarde"],
  martes: ["mañana", "tarde"],
  miercoles: ["mañana", "tarde"],
  jueves: ["mañana", "tarde"],
  viernes: ["mañana", "tarde"],
});

const scheduleAlternating = buildCronograma({
  lunes: ["mañana"],
  martes: ["tarde"],
  miercoles: ["mañana"],
  jueves: ["tarde"],
  viernes: ["mañana"],
});

export const institutionalContent = {
  mision:
    "Brindar atención médica ética, humana y oportuna a la comunidad de Ventuari y Puerto Ordaz, con precios solidarios y vocación de servicio.",
  vision:
    "Ser el ambulatorio de referencia en atención primaria y especializada, reconocidos por nuestra cercanía, resolución clínica y compromiso social.",
  historia:
    "El Ambulatorio Roberto De Santis nació como iniciativa comunitaria del Rotary Club para acercar servicios médicos confiables a la población local.",
};

export const consultationPackages = [
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
];

export const supportServices = [
  {
    title: "Laboratorio Clínico",
    detail: "Horario de lunes a viernes en la mañana.",
    accent: "blue",
  },
  {
    title: "Rayos X",
    detail: "Atención en horario de mañana durante días laborables.",
    accent: "teal",
  },
  {
    title: "Servicios Especiales",
    detail: "Citología, biopsia y ecos especiales con cita previa.",
    accent: "gold",
  },
];

export const specialtyCatalog = [
  {
    id: "alergologia",
    nombre: "Alergología",
    medicos: ["Dra. Claudia Rojas"],
    textoHorarioPlano: "Lunes a viernes por la mañana.",
    estudioIncluido: "Evaluación alérgica + pruebas básicas",
    cronograma: scheduleMorning,
  },
  {
    id: "anestesiologia",
    nombre: "Anestesiología",
    medicos: ["Dr. Pablo Herrera"],
    textoHorarioPlano: "Martes y jueves por la tarde.",
    estudioIncluido: "Valoración preoperatoria",
    cronograma: scheduleAfternoon,
  },
  {
    id: "cardiologia",
    nombre: "Cardiología",
    medicos: ["Dr. Luis Alejandro"],
    textoHorarioPlano: "Lunes, miércoles y viernes por la tarde.",
    estudioIncluido: "Consulta cardiológica + electrocardiograma",
    cronograma: buildCronograma({
      lunes: ["tarde"],
      miercoles: ["tarde"],
      viernes: ["tarde"],
    }),
  },
  {
    id: "cardiologia-pediatrica",
    nombre: "Cardiología Pediátrica",
    medicos: ["Dra. Karla Medina"],
    textoHorarioPlano: "Martes y jueves por la mañana.",
    estudioIncluido: "Consulta pediátrica especializada",
    cronograma: buildCronograma({
      martes: ["mañana"],
      jueves: ["mañana"],
    }),
  },
  {
    id: "cirugia-general",
    nombre: "Cirugía General",
    medicos: ["Dr. Andrés Lugo"],
    textoHorarioPlano: "Lunes a viernes en horario mixto.",
    estudioIncluido: "Consulta quirúrgica y seguimiento postoperatorio",
    cronograma: scheduleFull,
  },
  {
    id: "cirugia-mastologica",
    nombre: "Cirugía Mastológica",
    medicos: ["Dra. Mariela Pérez"],
    textoHorarioPlano: "Miércoles y viernes por la mañana.",
    estudioIncluido: "Valoración mamaria y control quirúrgico",
    cronograma: buildCronograma({
      miercoles: ["mañana"],
      viernes: ["mañana"],
    }),
  },
  {
    id: "dermatologia",
    nombre: "Dermatología",
    medicos: ["Dra. Eliana Rivas"],
    textoHorarioPlano: "Lunes a viernes por la tarde.",
    estudioIncluido: "Consulta dermatológica general",
    cronograma: scheduleAfternoon,
  },
  {
    id: "endocrinologia",
    nombre: "Endocrinología",
    medicos: ["Dr. Sergio Medina"],
    textoHorarioPlano: "Lunes, martes y jueves por la mañana.",
    estudioIncluido: "Control metabólico y hormonal",
    cronograma: buildCronograma({
      lunes: ["mañana"],
      martes: ["mañana"],
      jueves: ["mañana"],
    }),
  },
  {
    id: "gastroenterologia",
    nombre: "Gastroenterología",
    medicos: ["Dr. José Bermúdez"],
    textoHorarioPlano: "Martes, miércoles y viernes por la tarde.",
    estudioIncluido: "Evaluación digestiva integral",
    cronograma: buildCronograma({
      martes: ["tarde"],
      miercoles: ["tarde"],
      viernes: ["tarde"],
    }),
  },
  {
    id: "ginecologia",
    nombre: "Ginecología",
    medicos: ["Dra. Rosabel Campos"],
    textoHorarioPlano: "Lunes a viernes en la mañana y en la tarde.",
    estudioIncluido: "Eco pélvico o transvaginal",
    cronograma: scheduleFull,
  },
  {
    id: "mastologia",
    nombre: "Mastología",
    medicos: ["Dra. María López"],
    textoHorarioPlano: "Lunes y jueves por la mañana.",
    estudioIncluido: "Valoración mamaria y seguimiento clínico",
    cronograma: buildCronograma({
      lunes: ["mañana"],
      jueves: ["mañana"],
    }),
  },
  {
    id: "medicina-interna",
    nombre: "Medicina Interna",
    medicos: ["Dr. Carlos Pérez"],
    textoHorarioPlano: "Lunes a viernes en horario mixto.",
    estudioIncluido: "Consulta general de adultos",
    cronograma: scheduleFull,
  },
  {
    id: "nefrologia",
    nombre: "Nefrología",
    medicos: ["Dra. Ana Figuera"],
    textoHorarioPlano: "Martes y jueves por la mañana.",
    estudioIncluido: "Control renal y presión arterial",
    cronograma: buildCronograma({
      martes: ["mañana"],
      jueves: ["mañana"],
    }),
  },
  {
    id: "neumonologia",
    nombre: "Neumonología",
    medicos: ["Dr. Guillermo Suárez"],
    textoHorarioPlano: "Lunes, miércoles y viernes por la mañana.",
    estudioIncluido: "Evaluación respiratoria y espirometría",
    cronograma: buildCronograma({
      lunes: ["mañana"],
      miercoles: ["mañana"],
      viernes: ["mañana"],
    }),
  },
  {
    id: "neurologia",
    nombre: "Neurología",
    medicos: ["Dra. Verónica Torres"],
    textoHorarioPlano: "Martes y viernes por la tarde.",
    estudioIncluido: "Consulta neurológica especializada",
    cronograma: buildCronograma({
      martes: ["tarde"],
      viernes: ["tarde"],
    }),
  },
  {
    id: "odontologia",
    nombre: "Odontología",
    medicos: ["Dra. Inés González"],
    textoHorarioPlano: "Lunes a viernes por la mañana.",
    estudioIncluido: "Consulta odontológica general",
    cronograma: scheduleMorning,
  },
  {
    id: "oftalmologia",
    nombre: "Oftalmología",
    medicos: ["Dr. Ricardo Gil"],
    textoHorarioPlano: "Martes, jueves y viernes por la mañana.",
    estudioIncluido: "Evaluación visual y fondo de ojo",
    cronograma: buildCronograma({
      martes: ["mañana"],
      jueves: ["mañana"],
      viernes: ["mañana"],
    }),
  },
  {
    id: "otorrinolaringologia",
    nombre: "Otorrinolaringología",
    medicos: ["Dra. Sonia Márquez"],
    textoHorarioPlano: "Lunes, miércoles y viernes por la tarde.",
    estudioIncluido: "Consulta de oído, nariz y garganta",
    cronograma: buildCronograma({
      lunes: ["tarde"],
      miercoles: ["tarde"],
      viernes: ["tarde"],
    }),
  },
  {
    id: "pediatria",
    nombre: "Pediatría",
    medicos: ["Dra. Elena Mendoza", "Dr. Carlos Rivero"],
    textoHorarioPlano: "Martes y jueves por la mañana.",
    estudioIncluido: "Consulta pediátrica + control de niño sano",
    cronograma: buildCronograma({
      martes: ["mañana"],
      jueves: ["mañana"],
    }),
  },
  {
    id: "psicologia",
    nombre: "Psicología",
    medicos: ["Dra. Laura Salazar"],
    textoHorarioPlano: "Lunes a viernes en la tarde.",
    estudioIncluido: "Atención psicológica individual",
    cronograma: scheduleAfternoon,
  },
  {
    id: "psiquiatria",
    nombre: "Psiquiatría",
    medicos: ["Dr. Ernesto Falcón"],
    textoHorarioPlano: "Lunes, miércoles y viernes por la mañana.",
    estudioIncluido: "Consulta psiquiátrica integral",
    cronograma: buildCronograma({
      lunes: ["mañana"],
      miercoles: ["mañana"],
      viernes: ["mañana"],
    }),
  },
  {
    id: "traumatologia",
    nombre: "Traumatología",
    medicos: ["Dr. Jesús Álvarez"],
    textoHorarioPlano: "Martes, jueves y viernes por la tarde.",
    estudioIncluido: "Atención de lesiones y control ortopédico",
    cronograma: buildCronograma({
      martes: ["tarde"],
      jueves: ["tarde"],
      viernes: ["tarde"],
    }),
  },
  {
    id: "urologia",
    nombre: "Urología",
    medicos: ["Dr. José Requena"],
    textoHorarioPlano: "Lunes a viernes por la mañana.",
    estudioIncluido: "Eco prostático o testicular",
    cronograma: scheduleMorning,
  },
  {
    id: "laboratorios",
    nombre: "Laboratorios",
    medicos: ["Personal de apoyo"],
    textoHorarioPlano: "Lunes a viernes en la mañana.",
    estudioIncluido: "Toma de muestras y resultados básicos",
    cronograma: scheduleMorning,
  },
];

export const specialtySections = [
  {
    title: "Alergología",
    details: "Atención especializada para alergias respiratorias, cutáneas y alimentarias.",
  },
  {
    title: "Cardiología",
    details: "Control cardiovascular, ECG y seguimiento de pacientes con riesgo cardíaco.",
  },
  {
    title: "Ginecología",
    details: "Chequeos preventivos, control prenatal y estudios de apoyo en consulta.",
  },
];

export const defaultHomeHero = {
  eyebrow: "Salud integral a precios solidarios",
  title: "Ética y Calidez Humana a tu servicio",
  summary:
    "Comprometidos con el bienestar de la comunidad de Ventuari y Puerto Ordaz mediante atención médica oportuna, cercana y eficiente.",
};

export const makeFallbackSchedule = (name = "") => {
  const normalized = name.toLowerCase();

  if (normalized.includes("cardio") || normalized.includes("cirug") || normalized.includes("gine")) {
    return scheduleFull;
  }

  if (normalized.includes("pediatr") || normalized.includes("psic")) {
    return scheduleAlternating;
  }

  return scheduleMorning;
};

export { buildCronograma };