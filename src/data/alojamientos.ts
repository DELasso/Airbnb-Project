import type { Alojamiento } from '../types';

export const alojamientosData: Alojamiento[] = [
  {
    id: 1,
    nombre: "Apartamento acogedor en Medellín",
    descripcion: "Hermoso apartamento en el corazón de Medellín con vista panorámica a las montañas. Completamente equipado con todo lo que necesitas para una estancia perfecta. Ubicado en el barrio El Poblado, cerca de restaurantes, cafés y transporte público.",
    imagen: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1574691250077-03a929faece5?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop"
    ],
    precio: 120000,
    ubicacion: {
      ciudad: "Medellín",
      pais: "Colombia",
      coordenadas: {
        lat: 6.2442,
        lng: -75.5812
      }
    },
    huespedes: 4,
    habitaciones: 2,
    camas: 2,
    banos: 2,
    anfitrion: {
      nombre: "Carolina Restrepo",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1c5?w=100&h=100&fit=crop&crop=face",
      fechaRegistro: "marzo de 2019"
    },
    amenidades: ["WiFi", "Cocina", "TV", "Aire acondicionado", "Estacionamiento"],
    calificacion: 4.8,
    numResenas: 127,
    disponible: true,
    fechasDisponibles: [
      { inicio: "2024-02-01", fin: "2024-02-28" },
      { inicio: "2024-03-15", fin: "2024-04-30" }
    ]
  },
  {
    id: 2,
    nombre: "Cabaña rústica en Guatapé",
    descripcion: "Escápate a esta hermosa cabaña frente al lago en Guatapé. Perfecta para desconectarte y disfrutar de la naturaleza. Incluye kayaks y acceso privado al lago. Ideal para parejas o familias pequeñas que buscan tranquilidad.",
    imagen: [
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1551632436-cbf8dd35addd?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1618767689160-da3fb810aad7?w=400&h=300&fit=crop"
    ],
    precio: 200000,
    ubicacion: {
      ciudad: "Guatapé",
      pais: "Colombia",
      coordenadas: {
        lat: 6.2329,
        lng: -75.1586
      }
    },
    huespedes: 6,
    habitaciones: 3,
    camas: 3,
    banos: 2,
    anfitrion: {
      nombre: "Miguel Ángel Torres",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      fechaRegistro: "enero de 2020"
    },
    amenidades: ["WiFi", "Cocina", "Chimenea", "Kayaks", "Jardín privado", "Parrilla"],
    calificacion: 4.9,
    numResenas: 89,
    disponible: true,
    fechasDisponibles: [
      { inicio: "2024-02-10", fin: "2024-05-30" }
    ]
  },
  {
    id: 3,
    nombre: "Loft moderno en Bogotá",
    descripcion: "Loft de diseño contemporáneo en la Zona Rosa de Bogotá. Perfectamente ubicado para explorar la vida nocturna, restaurantes gourmet y centros comerciales. Decorado con arte local y muebles de diseñador.",
    imagen: [
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556909114-4f6e3c0ca584?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1571624436279-b272aff752b5?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop"
    ],
    precio: 180000,
    ubicacion: {
      ciudad: "Bogotá",
      pais: "Colombia",
      coordenadas: {
        lat: 4.6097,
        lng: -74.0817
      }
    },
    huespedes: 2,
    habitaciones: 1,
    camas: 1,
    banos: 1,
    anfitrion: {
      nombre: "Alejandra Martínez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      fechaRegistro: "septiembre de 2021"
    },
    amenidades: ["WiFi", "Cocina", "TV", "Aire acondicionado", "Gimnasio", "Terraza"],
    calificacion: 4.7,
    numResenas: 203,
    disponible: true,
    fechasDisponibles: [
      { inicio: "2024-02-01", fin: "2024-06-30" }
    ]
  },
  {
    id: 4,
    nombre: "Casa colonial en Cartagena",
    descripcion: "Encantadora casa colonial en el centro histórico de Cartagena. Con patios internos, arquitectura original y todas las comodidades modernas. A pocos pasos de las murallas y la vida nocturna del centro.",
    imagen: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1505791938895-1537094a8cdf?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=300&fit=crop"
    ],
    precio: 350000,
    ubicacion: {
      ciudad: "Cartagena",
      pais: "Colombia",
      coordenadas: {
        lat: 10.3910,
        lng: -75.4794
      }
    },
    huespedes: 8,
    habitaciones: 4,
    camas: 4,
    banos: 3,
    anfitrion: {
      nombre: "Ricardo Mendoza",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      fechaRegistro: "junio de 2018"
    },
    amenidades: ["WiFi", "Cocina", "TV", "Aire acondicionado", "Patio", "Piscina", "Servicio de limpieza"],
    calificacion: 4.6,
    numResenas: 156,
    disponible: true,
    fechasDisponibles: [
      { inicio: "2024-03-01", fin: "2024-07-31" }
    ]
  },
  {
    id: 5,
    nombre: "Apartamento frente al mar en Santa Marta",
    descripcion: "Despierta con vista al mar Caribe en este moderno apartamento. Balcón con vista panorámica, piscina en la azotea y acceso directo a la playa. Perfecto para unas vacaciones relajantes.",
    imagen: [
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop"
    ],
    precio: 280000,
    ubicacion: {
      ciudad: "Santa Marta",
      pais: "Colombia",
      coordenadas: {
        lat: 11.2408,
        lng: -74.2120
      }
    },
    huespedes: 4,
    habitaciones: 2,
    camas: 2,
    banos: 2,
    anfitrion: {
      nombre: "Sofia Valencia",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
      fechaRegistro: "febrero de 2020"
    },
    amenidades: ["WiFi", "Cocina", "TV", "Aire acondicionado", "Piscina", "Acceso a playa", "Balcón"],
    calificacion: 4.9,
    numResenas: 94,
    disponible: true,
    fechasDisponibles: [
      { inicio: "2024-02-15", fin: "2024-08-31" }
    ]
  },
  {
    id: 6,
    nombre: "Finca campestre en el Eje Cafetero",
    descripcion: "Vive la experiencia auténtica del café colombiano en esta hermosa finca. Tours de café incluidos, cabalgatas, y la tranquilidad del campo. Ideal para familias y grupos que buscan aventura.",
    imagen: [
      "https://images.unsplash.com/photo-1586861203927-800a5acdcc4d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1542652734-4c8ffe3ea97a?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop"
    ],
    precio: 150000,
    ubicacion: {
      ciudad: "Salento",
      pais: "Colombia",
      coordenadas: {
        lat: 4.6319,
        lng: -75.5714
      }
    },
    huespedes: 10,
    habitaciones: 5,
    camas: 6,
    banos: 4,
    anfitrion: {
      nombre: "Carlos Henao",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      fechaRegistro: "abril de 2017"
    },
    amenidades: ["WiFi", "Cocina", "Chimenea", "Tours de café", "Cabalgatas", "Jardín", "Parrilla", "Hamacas"],
    calificacion: 4.8,
    numResenas: 167,
    disponible: true,
    fechasDisponibles: [
      { inicio: "2024-02-01", fin: "2024-12-31" }
    ]
  }
]; 