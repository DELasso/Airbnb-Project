export interface Alojamiento {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string[];
  precio: number;
  ubicacion: {
    ciudad: string;
    pais: string;
    coordenadas?: {
      lat: number;
      lng: number;
    };
  };
  huespedes: number;
  habitaciones: number;
  camas: number;
  banos: number;
  anfitrion: {
    nombre: string;
    avatar: string;
    fechaRegistro: string;
  };
  amenidades: string[];
  calificacion: number;
  numResenas: number;
  disponible: boolean;
  fechasDisponibles?: {
    inicio: string;
    fin: string;
  }[];
}

export interface FiltrosBusqueda {
  ubicacion?: string;
  fechaEntrada?: string;
  fechaSalida?: string;
  huespedes?: number;
  precioMin?: number;
  precioMax?: number;
  amenidades?: string[];
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