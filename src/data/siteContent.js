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

const emptySchedule = () => buildCronograma({});

const scheduleMorning = buildCronograma({
  lunes: ["mañana"],
  martes: ["mañana"],
  miercoles: ["mañana"],
  jueves: ["mañana"],
  viernes: ["mañana"],
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
    "Prestar servicios médicos y odontológicos comunitarios mediante programas orientados a la promoción, prevención, diagnóstico, tratamiento, rehabilitación y mejoramiento de la calidad de salud de la sociedad venezolana a entes naturales y jurídicos a través de una sólida red de servicios oportunos, fundamentados en la ética, la calidez humana, la tecnología apropiada y la coordinación con entidades públicas y privadas, con la eficiencia en el uso de los recursos de forma confiable y segura.",
  vision:
    "Ser líder regional en la prestación de servicios integrales de salud en el área preventiva y curativa, logrando la satisfacción de los usuarios, mediante una red de centros médicos, constituido por personal técnico y profesional capacitado, especializado y humano, con procesos de vanguardia que permitan mejor relación entre las comunidades y el movimiento rotario.",
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
    id: "cardiologia",
    nombre: "Cardiología",
    icon: "Heart",
    medicos: ["Dr. Loris Seaton"],
    textoHorarioPlano: "De martes a viernes en la mañana.",
    estudioIncluido: "",
    cronograma: buildCronograma({
      martes: ["mañana"],
      miercoles: ["mañana"],
      jueves: ["mañana"],
      viernes: ["mañana"],
    }),
  },
  {
    id: "cirugia",
    nombre: "Cirugía",
    icon: "Scissors",
    medicos: ["Dra. Yanira Colina"],
    textoHorarioPlano: "Martes y jueves en la mañana.",
    estudioIncluido: "",
    cronograma: buildCronograma({
      martes: ["mañana"],
      jueves: ["mañana"],
    }),
  },
  {
    id: "dermatologia",
    nombre: "Dermatología",
    icon: "ScanFace",
    medicos: ["Dr. Nestor Tórres"],
    textoHorarioPlano: "Lunes en la mañana.",
    estudioIncluido: "",
    cronograma: buildCronograma({
      lunes: ["mañana"],
    }),
  },
  {
    id: "gastroenterologia",
    nombre: "Gastroenterología",
    icon: "Apple",
    medicos: ["Dr. Luis Arévalo"],
    textoHorarioPlano: "Martes y jueves en la tarde.",
    estudioIncluido: "",
    cronograma: buildCronograma({
      martes: ["tarde"],
      jueves: ["tarde"],
    }),
  },
  {
    id: "ginecologia-obstetricia",
    nombre: "Ginecología y Obstetricia",
    icon: "Venus",
    medicos: ["Dr. Fued Nasser", "Dra. Rosabel Campos", "Dra. Yadith Castro"],
    textoHorarioPlano: "De lunes a viernes en la mañana y en la tarde.",
    estudioIncluido: "",
    cronograma: scheduleFull,
  },
  {
    id: "mastologia",
    nombre: "Mastología",
    icon: "Scan",
    medicos: ["Dra. Aracelis Matamoros"],
    textoHorarioPlano: "Lunes en la mañana.",
    estudioIncluido: "",
    cronograma: buildCronograma({
      lunes: ["mañana"],
    }),
  },
  {
    id: "medicina-general",
    nombre: "Medicina general",
    icon: "Stethoscope",
    medicos: ["Dra. Elvira Bueno"],
    textoHorarioPlano: "De lunes a viernes en la mañana.",
    estudioIncluido: "",
    cronograma: scheduleMorning,
  },
  {
    id: "medicina-interna",
    nombre: "Medicina Interna",
    icon: "Activity",
    medicos: ["Dr. Gastón Lozano", "Dra. Karelys Valero"],
    textoHorarioPlano: "De lunes a viernes en la mañana y en la tarde.",
    estudioIncluido: "",
    cronograma: scheduleFull,
  },
  {
    id: "nefrologia",
    nombre: "Nefrología",
    icon: "Droplets",
    medicos: ["Dra. Elizabeth Vargas"],
    textoHorarioPlano: "Miércoles y viernes en la mañana.",
    estudioIncluido: "",
    cronograma: buildCronograma({
      miercoles: ["mañana"],
      viernes: ["mañana"],
    }),
  },
  {
    id: "neumonologia",
    nombre: "Neumonología",
    icon: "Wind",
    medicos: ["Dra. Karen Sosa"],
    textoHorarioPlano: "Jueves en la mañana.",
    estudioIncluido: "",
    cronograma: buildCronograma({
      jueves: ["mañana"],
    }),
  },
  {
    id: "nutricion-dietetica",
    nombre: "Nutrición y dietética",
    icon: "Scale",
    medicos: ["Dra. Dairubys Romero"],
    textoHorarioPlano: "Lunes y miércoles en la tarde.",
    estudioIncluido: "",
    cronograma: buildCronograma({
      lunes: ["tarde"],
      miercoles: ["tarde"],
    }),
  },
  {
    id: "odontologia",
    nombre: "Odontología",
    icon: "Tooth",
    medicos: ["Dra. Mayra García", "Dra. Yorvelys Gómez", "Dra. Janett Núñez"],
    textoHorarioPlano: "De lunes a viernes en la mañana y de martes a jueves en la tarde.",
    estudioIncluido: "",
    cronograma: buildCronograma({
      lunes: ["mañana"],
      martes: ["mañana", "tarde"],
      miercoles: ["mañana", "tarde"],
      jueves: ["mañana", "tarde"],
      viernes: ["mañana"],
    }),
  },
  {
    id: "oftalmologia",
    nombre: "Oftalmología",
    icon: "Eye",
    medicos: ["Dr. Juan Carlos Figueroa", "Dra. Omarilys Bastardo", "Dr. Rafael Burgos"],
    textoHorarioPlano: "De lunes a viernes en la mañana.",
    estudioIncluido: "",
    cronograma: scheduleMorning,
  },
  {
    id: "otorrinolaringologia",
    nombre: "Otorrinolaringología",
    icon: "Ear",
    medicos: ["Dra. Ingrid Moreno", "Dra. Emily Carrillo"],
    textoHorarioPlano: "Lunes y miércoles en la mañana.",
    estudioIncluido: "",
    cronograma: buildCronograma({
      lunes: ["mañana"],
      miercoles: ["mañana"],
    }),
  },
  {
    id: "pediatria",
    nombre: "Pediatría",
    icon: "Baby",
    medicos: ["Dra. Emma Graterol", "Dra. Susy Khouri", "Dra. Zodil Vásquez"],
    textoHorarioPlano: "De lunes a viernes en la mañana y de lunes a jueves en la tarde.",
    estudioIncluido: "",
    cronograma: buildCronograma({
      lunes: ["mañana", "tarde"],
      martes: ["mañana", "tarde"],
      miercoles: ["mañana", "tarde"],
      jueves: ["mañana", "tarde"],
      viernes: ["mañana"],
    }),
  },
  {
    id: "psicologia",
    nombre: "Psicología",
    icon: "BrainCircuit",
    medicos: ["Dra. Karina García", "Dra. Daniela Santoyo"],
    textoHorarioPlano: "Miércoles en la tarde.",
    estudioIncluido: "",
    cronograma: buildCronograma({
      miercoles: ["tarde"],
    }),
  },
  {
    id: "traumatologia",
    nombre: "Traumatología",
    icon: "Bone",
    medicos: ["Dr. Michael Vásquez", "Dra. Génesis Vale"],
    textoHorarioPlano: "Martes y jueves en la mañana y en la tarde.",
    estudioIncluido: "",
    cronograma: buildCronograma({
      martes: ["mañana", "tarde"],
      jueves: ["mañana", "tarde"],
    }),
  },
  {
    id: "urologia",
    nombre: "Urología",
    icon: "Filter",
    medicos: ["Dr. Julio Labady", "Dr. Julio Vilera"],
    textoHorarioPlano: "Lunes en la tarde, viernes en la tarde y miércoles en la mañana y en la tarde.",
    estudioIncluido: "",
    cronograma: buildCronograma({
      lunes: ["tarde"],
      miercoles: ["mañana", "tarde"],
      viernes: ["tarde"],
    }),
  },
  {
    id: "laboratorio",
    nombre: "Laboratorio",
    icon: "FlaskConical",
    medicos: ["Dra. Yaniris Núñez"],
    textoHorarioPlano: "Lunes a viernes en la mañana.",
    estudioIncluido: "",
    cronograma: scheduleMorning,
  },
  {
    id: "rayos-x",
    nombre: "Rayos X",
    icon: "Radiation",
    medicos: ["Dr. Nelson Pérez"],
    textoHorarioPlano: "Lunes a viernes en la mañana.",
    estudioIncluido: "",
    cronograma: scheduleMorning,
  },
  {
    id: "patologia",
    nombre: "Patología",
    icon: "Microscope",
    medicos: ["Dra. Herminia Duque"],
    textoHorarioPlano: "Consultar disponibilidad.",
    estudioIncluido: "",
    cronograma: emptySchedule(),
  }
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
