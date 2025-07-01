export const MESSAGES = {
    ERROR: 'Algo ha ido mal...',
    INCORRECT_CREDENTIALS: 'Usuario o contraseña incorrecta',
    SUCCESSFUL: '¡Autentificacion exitosa!',
    LOADING: 'Cargando...',
    REGISTERED_IDENTITY_CARD: 'La cedula de identidad se encuentra registrada',
    EMAIL_IS_REGISTERED: 'El correo electronico se encuentra registrado',
    PHONE_NUMBER_IS_REGISTERED: 'El numero de telefono se encuentra registrado',
    RECORD_ADDED_SUCCESSFULLY: '¡Registro añadido con exito!',
    ERROR_SELECTED_GENDER: "Indique un sexo",
    ERROR_SELECTED_COURSE: "Indique el año a cursar",
    ERROR_INVALID_FORMAT_IDENTIFICATION: "Indique un numero de identificación valido",
    ERROR_INVALID_FORMAT_PHONE: "Indique un numero de telefono valido"
}

export const API_ERRORS = {
    TOKEN_EXPIRED: 'jwt expired'
}

export const USERS_ROLES = {
    DIRECTOR: 'DIRECTOR',
    REPRESENTATIVE: 'REPRESENTANTE',
    TEACHER: 'DOCENTE'
}

export const REPRESENTATIVES_STATUS = {
    SOLVENT: 'SOLVENTE',
    INSOLVENT: 'INSOLVENTE'
}

export const GENDERS = {
    MALE: 'MASCULINO',
    FEMALE: 'FEMENINO'
}

export const STUDENTS_STATUS = {
    PENDUNDER_REVIEW: "REVISION",
    VERIFIED: "VERIFICADO"
}

export const YEARS_TO_STUDY = {
    FIRST_YEAR: 1 ,
    SECOND_YEAR: 2,
    THIRD_YEAR: 3,
    FOURTH_YEAR: 4,
    FIFTH_YEAR: 5
}

export const BANKS = {
    BDV: "Banco de Venezuela",
    BANESCO: "Banesco",
    MERCANTIL: "Mercantil",
    PROVINCIAL: "Banco Provincial",
    BANCAMIGA: "Bancamiga"
}

export const ARRAY_BANKS = [
    { name: "Banco de Venezuela" },
    { name: "Banesco" },
    { name: "Mercantil" },
    { name: "Banco Provincial" },
    { name: "Bancamiga" }
]

export const ARRAY_CONCEPTS = [
    { label: "Inscripción", concept: "INSCRIPCION", amount: 100 },
    { label: "Mensualidad", concept: "MENSUALIDAD", amount: 50 },
    { label: "Boletin de notas", concept: "BN", amount: 25 },
    { label: "Constancia de estudios", concept: "CE", amount: 30 }
]