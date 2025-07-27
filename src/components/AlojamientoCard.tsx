// src/components/AlojamientoCard.tsx
type Alojamiento = {
  id: number;
  nombre: string;
  imagen: string;
  precio: number;
  ubicacion: string;
};

export default function AlojamientoCard({ alojamiento }: { alojamiento: Alojamiento }) {
  return (
    <div className="rounded-lg shadow-md overflow-hidden bg-white">
      <img src={alojamiento.imagen} alt={alojamiento.nombre} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-bold">{alojamiento.nombre}</h2>
        <p className="text-sm text-gray-600">{alojamiento.ubicacion}</p>
        <p className="mt-2 font-semibold">${alojamiento.precio} / noche</p>
      </div>
    </div>
  );
}
