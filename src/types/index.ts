export interface FiltrosBusqueda {
  ubicacion?: string;
  fechaEntrada?: string;
  fechaSalida?: string;
  huespedes?: number;
  precioMin?: number;
  precioMax?: number;
  amenidades?: string[];
}

export interface Ubicacion {
  ciudad: string;
  pais: string;
  coordenadas?: {
    lat: number;
    lng: number;
  };
}

export interface Anfitrion {
  nombre: string;
  avatar: string;
  fechaRegistro: string;
}

export interface FechaDisponible {
  inicio: string;
  fin: string;
}

export interface Alojamiento {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string[];
  precio: number;
  ubicacion: Ubicacion;
  huespedes: number;
  habitaciones: number;
  camas: number;
  banos: number;
  anfitrion: Anfitrion;
  amenidades: string[];
  calificacion: number;
  numResenas: number;
  disponible: boolean;
  fechasDisponibles?: FechaDisponible[];
  comentarios?: Comentario[];
  calificacionPromedio?: CalificacionPromedio;
}

// Tipos para autenticación
export interface User {
  id: string;
  email: string;
  nombre: string;
  apellido: string;
  avatar?: string;
  telefono?: string;
  fechaNacimiento?: string;
  descripcion?: string;
  esAnfitrion: boolean;
  fechaRegistro: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  nombre: string;
  apellido: string;
  telefono?: string;
  fechaNacimiento?: string;
}

export interface Reserva {
  id: number;
  alojamientoId: number;
  fechaEntrada: string;
  fechaSalida: string;
  huespedes: number;
  precioTotal: number;
  estado: 'pendiente' | 'confirmada' | 'cancelada';
}

// Tipos para comentarios y calificaciones
export interface Comentario {
  id: number;
  usuarioId: string;
  usuarioNombre: string;
  usuarioAvatar: string;
  fechaEstancia: string;
  fechaComentario: string;
  calificacionGeneral: number;
  calificaciones: {
    limpieza: number;
    comunicacion: number;
    llegada: number;
    precision: number;
    ubicacion: number;
    precio: number;
  };
  comentario: string;
  respuestaAnfitrion?: {
    fecha: string;
    respuesta: string;
  };
  util: number; // número de personas que encontraron útil el comentario
}

export interface CalificacionPromedio {
  limpieza: number;
  comunicacion: number;
  llegada: number;
  precision: number;
  ubicacion: number;
  precio: number;
  general: number;
} 