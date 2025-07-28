import type { Alojamiento } from '../types';

export const alojamientosData: Alojamiento[] = [
  {
    id: 1,
    nombre: "Apartamento acogedor en Medellín",
    descripcion: "Hermoso apartamento en el corazón de Medellín con vista panorámica a las montañas. Completamente equipado con todo lo que necesitas para una estancia perfecta. Ubicado en el barrio El Poblado, cerca de restaurantes, cafés y transporte público.",
    imagen: [
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1200061060937602799/original/52a86a8a-e3d1-4dce-ba5b-e944bec72f91.jpeg?im_w=1440",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1200061060937602799/original/d210ade7-bc0c-4fa5-9da4-744303b53f09.jpeg?im_w=1440",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1200061060937602799/original/479a7eca-001e-4a34-ada6-023cbc4eac64.jpeg?im_w=1200",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1200061060937602799/original/3c58a876-ae8f-4310-aad0-847be6b850bb.jpeg?im_w=1440",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1200061060937602799/original/bc76f588-6960-4242-9ab5-3c548050eca2.jpeg?im_w=1440"
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
      { inicio: "2025-02-01", fin: "2025-08-28" },
      { inicio: "2025-03-15", fin: "2025-09-30" }
    ],
    calificacionPromedio: {
      limpieza: 4.9,
      comunicacion: 4.8,
      llegada: 4.7,
      precision: 4.8,
      ubicacion: 4.9,
      precio: 4.7,
      general: 4.8
    },
    comentarios: [
      {
        id: 1,
        usuarioId: "user1",
        usuarioNombre: "María González",
        usuarioAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        fechaEstancia: "2024-11-15",
        fechaComentario: "2024-11-22",
        calificacionGeneral: 5,
        calificaciones: {
          limpieza: 5,
          comunicacion: 5,
          llegada: 4,
          precision: 5,
          ubicacion: 5,
          precio: 4
        },
        comentario: "¡Excelente apartamento! La ubicación es perfecta, muy cerca de todo lo que necesitas en El Poblado. Carolina fue muy atenta y nos dio excelentes recomendaciones. El apartamento estaba impecable y la vista a las montañas es espectacular. Definitivamente regresaríamos.",
        respuestaAnfitrion: {
          fecha: "2024-11-23",
          respuesta: "¡Muchas gracias María! Fue un placer hospedarlos. Espero que hayan disfrutado mucho su visita a Medellín. ¡Los esperamos de vuelta pronto!"
        },
        util: 8
      },
      {
        id: 2,
        usuarioId: "user2",
        usuarioNombre: "Carlos Ramírez",
        usuarioAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        fechaEstancia: "2024-10-20",
        fechaComentario: "2024-10-27",
        calificacionGeneral: 4,
        calificaciones: {
          limpieza: 5,
          comunicacion: 4,
          llegada: 4,
          precision: 4,
          ubicacion: 5,
          precio: 4
        },
        comentario: "Muy buen lugar, cómodo y bien ubicado. El proceso de check-in fue sencillo. Solo un pequeño inconveniente con el aire acondicionado que se resolvió rápidamente. La zona es excelente para salir a caminar y conocer restaurantes.",
        util: 5
      },
      {
        id: 3,
        usuarioId: "user3",
        usuarioNombre: "Ana Sofía Vargas",
        usuarioAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
        fechaEstancia: "2024-09-10",
        fechaComentario: "2024-09-15",
        calificacionGeneral: 5,
        calificaciones: {
          limpieza: 5,
          comunicacion: 5,
          llegada: 5,
          precision: 5,
          ubicacion: 5,
          precio: 5
        },
        comentario: "Perfecto en todos los aspectos. Carolina es una anfitriona increíble, muy comunicativa y dispuesta a ayudar. El apartamento es tal como se muestra en las fotos, muy limpio y cómodo. La ubicación es privilegiada. ¡Altamente recomendado!",
        respuestaAnfitrion: {
          fecha: "2024-09-16",
          respuesta: "¡Qué alegría leer tu comentario Ana Sofía! Gracias por cuidar tan bien el apartamento y por ser huéspedes tan considerados. ¡Siempre serán bienvenidos!"
        },
        util: 12
      }
    ]
  },
  {
    id: 2,
    nombre: "Cabaña rústica en Guatapé",
    descripcion: "Escápate a esta hermosa cabaña frente al lago en Guatapé. Perfecta para desconectarte y disfrutar de la naturaleza. Incluye kayaks y acceso privado al lago. Ideal para parejas o familias pequeñas que buscan tranquilidad.",
    imagen: [
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NjcwODg2NDQzODEyMzQzMDE4/original/f279b37e-6f52-48cf-892f-fae0b8765c5d.jpeg?im_w=1200",
      "https://a0.muscache.com/im/pictures/miso/Hosting-670886443812343018/original/3c9b5304-9ff4-44f4-a3d4-1a0bee90d97f.jpeg?im_w=1440",
      "https://a0.muscache.com/im/pictures/miso/Hosting-670886443812343018/original/521dd886-9885-4abe-b1b8-6f1f16f4caa9.jpeg?im_w=1440",
      "https://a0.muscache.com/im/pictures/miso/Hosting-670886443812343018/original/2507550d-7dcc-4671-be66-688bea5da05c.jpeg?im_w=1440",
      "https://a0.muscache.com/im/pictures/miso/Hosting-670886443812343018/original/07804526-308d-4034-9485-97b6a4fb7b8d.jpeg?im_w=1440"
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
      { inicio: "2025-09-10", fin: "2025-10-30" }
    ],
    calificacionPromedio: {
      limpieza: 4.9,
      comunicacion: 4.8,
      llegada: 4.8,
      precision: 4.9,
      ubicacion: 5.0,
      precio: 4.8,
      general: 4.9
    },
    comentarios: [
      {
        id: 4,
        usuarioId: "user4",
        usuarioNombre: "Diego Morales",
        usuarioAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
        fechaEstancia: "2024-08-15",
        fechaComentario: "2024-08-20",
        calificacionGeneral: 5,
        calificaciones: {
          limpieza: 5,
          comunicacion: 5,
          llegada: 5,
          precision: 5,
          ubicacion: 5,
          precio: 5
        },
        comentario: "¡Increíble experiencia en Guatapé! La cabaña es hermosa, muy cómoda y la vista al lago es de ensueño. Miguel nos recibió de maravilla y los kayaks fueron el toque perfecto. Totalmente recomendado para una escapada romántica o familiar.",
        respuestaAnfitrion: {
          fecha: "2024-08-21",
          respuesta: "¡Muchas gracias Diego! Me alegra saber que disfrutaron tanto de la cabaña y del lago. Es un placer compartir este hermoso lugar con huéspedes como ustedes."
        },
        util: 15
      },
      {
        id: 5,
        usuarioId: "user5",
        usuarioNombre: "Valentina Castro",
        usuarioAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
        fechaEstancia: "2024-07-10",
        fechaComentario: "2024-07-15",
        calificacionGeneral: 5,
        calificaciones: {
          limpieza: 5,
          comunicacion: 4,
          llegada: 5,
          precision: 5,
          ubicacion: 5,
          precio: 4
        },
        comentario: "Lugar mágico para desconectarse. Las vistas son espectaculares y poder usar los kayaks fue fantástico. La cabaña tiene todo lo necesario y está muy bien equipada. Definitivamente volveremos.",
        util: 9
      }
    ]
  },
  {
    id: 3,
    nombre: "Loft moderno en Bogotá",
    descripcion: "Loft de diseño contemporáneo en la Zona Rosa de Bogotá. Perfectamente ubicado para explorar la vida nocturna, restaurantes gourmet y centros comerciales. Decorado con arte local y muebles de diseñador.",
    imagen: [
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTMzMTMzNzI5MTMzODc1MzQ0OQ%3D%3D/original/16dbdfe9-045c-43fb-84d2-e6b4644b793a.jpeg?im_w=1440",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1468947593017750953/original/23447373-ab10-4a52-8cf4-a591a21f0455.jpeg?im_w=1440",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1468947593017750953/original/870c134d-e9fa-4924-86a5-d12a4375d745.jpeg?im_w=1440",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1468947593017750953/original/611bfdba-8cc4-46f5-81a9-0aeac1fe4d27.jpeg?im_w=1440",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1468947593017750953/original/0a9e9d69-5b54-43cf-aa30-0a4101d6f008.jpeg?im_w=1440"
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
      { inicio: "2025-08-01", fin: "2025-11-30" }
    ]
  },
  {
    id: 4,
    nombre: "Casa colonial en Cartagena",
    descripcion: "Encantadora casa colonial en el centro histórico de Cartagena. Con patios internos, arquitectura original y todas las comodidades modernas. A pocos pasos de las murallas y la vida nocturna del centro.",
    imagen: [
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1354611359259821887/original/388678b4-9db3-411e-9226-eb083a104a55.jpeg?im_w=1440",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1354611359259821887/original/682671b8-3303-40d1-aef6-2e3aca8bd347.jpeg?im_w=1200",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1354611359259821887/original/a837a161-9a1c-4a01-a895-44be4e96a0f0.jpeg?im_w=1440",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1354611359259821887/original/c963a1f4-8da8-41d9-a210-8796edabc29a.jpeg?im_w=1440",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1354611359259821887/original/d39ef2b4-08b6-4f21-be44-8f82509a7a23.jpeg?im_w=1440"
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
      { inicio: "2025-07-01", fin: "2025-09-31" }
    ]
  },
  {
    id: 5,
    nombre: "Apartamento frente al mar en Santa Marta",
    descripcion: "Despierta con vista al mar Caribe en este moderno apartamento. Balcón con vista panorámica, piscina en la azotea y acceso directo a la playa. Perfecto para unas vacaciones relajantes.",
    imagen: [
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTAwNjY5MzQxNzY0MDE2NzMx/original/bc4161e8-5ccc-4aba-b7cb-5f477ec47c6d.jpeg?im_w=1200",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTAwNjY5MzQxNzY0MDE2NzMx/original/a9326270-31ff-4a02-94b0-8bcedc981eb4.jpeg?im_w=1440",
      "https://a0.muscache.com/im/pictures/miso/Hosting-900669341764016731/original/a35f2853-e19b-4ae9-a6a0-ef7245411608.jpeg?im_w=1440",
      "https://a0.muscache.com/im/pictures/miso/Hosting-900669341764016731/original/0e270ce2-e486-49ba-bb2f-e11842940afb.jpeg?im_w=1440",
      "https://a0.muscache.com/im/pictures/miso/Hosting-900669341764016731/original/382608f5-ec93-45c3-873a-adf05aecc964.jpeg?im_w=1440"
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
      { inicio: "2025-02-15", fin: "2025-08-31" }
    ]
  },
  {
    id: 6,
    nombre: "Finca campestre en el Eje Cafetero",
    descripcion: "Vive la experiencia auténtica del café colombiano en esta hermosa finca. Tours de café incluidos, cabalgatas, y la tranquilidad del campo. Ideal para familias y grupos que buscan aventura.",
    imagen: [
      "https://a0.muscache.com/im/pictures/hosting/Hosting-47131172/original/d7ed1429-29a1-48c7-83bc-4ea715b80455.jpeg?im_w=1200",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-47131172/original/520bbf16-ebe3-43ea-a329-c79767c27db8.jpeg?im_w=1440",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-47131172/original/b44f7063-293c-437e-8878-2a348a1483dd.jpeg?im_w=1440",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-47131172/original/eacb054a-49e1-453c-8c19-5452ddc99d0f.jpeg?im_w=1440",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-47131172/original/e4de690a-6b9d-465a-b48c-b78f086c2423.jpeg?im_w=1440"
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
      { inicio: "2025-02-01", fin: "2025-12-31" }
    ]
  }
]; 