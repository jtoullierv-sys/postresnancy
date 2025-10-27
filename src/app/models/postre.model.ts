// src/app/models/postre.model.ts

// Lo que llega desde la API o JSON temporal
export interface PostreAPI {
  id_postre: number;
  descripcion_postre: string;
  imagen_postre: string; // En el JSON usaremos una URL (no binario)
  categoria: string;
  precio_postre: string;
  estado_postre: number;
  personalizacion: { type: string; data: number[] };
}

// Lo que usaremos dentro de la app
export interface Postre {
  id: number;
  descripcion: string;
  precio: number;
  imagen: string;
  categoria: string;
  activo: boolean;
  personalizable: boolean;
}

// 🧩 Función para convertir API → App
export function mapPostre(apiData: PostreAPI): Postre {
  const imagen =
    typeof apiData.imagen_postre === 'string'
      ? apiData.imagen_postre
      : 'assets/postres/default.jpg'; // Imagen por defecto si falta

  return {
    id: apiData.id_postre,
    descripcion: apiData.descripcion_postre,
    precio: parseFloat(apiData.precio_postre),
    imagen,
    categoria: apiData.categoria,
    activo: apiData.estado_postre === 1,
    personalizable: apiData.personalizacion?.data?.[0] === 1
  };
}