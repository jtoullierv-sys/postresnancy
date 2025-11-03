// src/app/models/postre.model.ts

// Lo que llega desde la API o JSON temporal
export interface ExtraAPI {
  id_extra: number;
  nombre_extra: string;
  tipo_extra: string;
  peso_extra: number;
  precio_extra: number;
  estado_Extra: { type: string; data: number[] };
}


// Lo que usaremos dentro de la app
export interface Extra {
  id: number;
  nombre: string;
  tipo: string;
  peso: number;
  precio: number;
  estado: boolean;
}

// 🧩 Función para convertir API → App
export function mapExtra(apiData: ExtraAPI): Extra {
  return {
    id: apiData.id_extra,
    nombre: apiData.nombre_extra,
    tipo: apiData.tipo_extra,
    peso: apiData.peso_extra,
    precio: apiData.precio_extra,
    estado: apiData.estado_Extra?.data?.[0] === 1
  };
}