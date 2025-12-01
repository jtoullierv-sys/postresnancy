// src/app/models/extra.model.ts

export interface ExtraAPI {
  id_extra: number;
  nombre_extra: string;
  tipo_extra: string;
  peso_extra: string;
  precio_extra: number;
  estado_extra: boolean;
}

// App model
export interface Extra {
  id: number;
  nombre: string;
  tipo: string;
  peso: number;
  precio: number;
  estado: boolean;
}

// MAPP PERMITIDO POR TU JSON REAL
export function mapExtra(apiData: ExtraAPI): Extra {
  return {
    id: apiData.id_extra,
    nombre: apiData.nombre_extra,
    tipo: apiData.tipo_extra,
    peso: Number(apiData.peso_extra),
    precio: apiData.precio_extra,
    estado: apiData.estado_extra
  };
}
