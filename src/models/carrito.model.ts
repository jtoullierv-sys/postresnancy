export interface CarritoAPI {
  id_carrito: number;
  cantidad_postre: number;
  subtotal_carrito: number;
  id_cliente: number;
  id_postre: number;
  id_extra: number;
}

export interface Carrito {
  id_carrito: number;
  cantidad_postre: number;
  subtotal_carrito: number;
  id_cliente: number;
  id_postre: number;
  id_extra: number;
}

export function mapExtra(apiData: CarritoAPI): Carrito {
  return {
    id_carrito: apiData.id_carrito,
    cantidad_postre: apiData.cantidad_postre,
    subtotal_carrito: apiData.subtotal_carrito,
    id_cliente: apiData.id_cliente,
    id_postre: apiData.id_postre,
    id_extra: apiData.id_extra
  };
}