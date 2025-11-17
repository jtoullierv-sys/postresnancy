export interface PagoAPI {
  id_pedido: number;
  medio_pago: string;
  imagen_pago: string;
  fecha_pago: string;
}

export interface Pago {
  id_pedido: number;
  medio_pago: string;
  imagen_pago: string;
  fecha_pago: string;
}

export function mapPago(api: PagoAPI): Pago {
  return {
    id_pedido: api.id_pedido,
    medio_pago: api.medio_pago,
    imagen_pago: api.imagen_pago,
    fecha_pago: api.fecha_pago
  };
}
