export interface PedidoAPI {
  id_pedido: number;
  id_estadopedido: number;
  total_pagado: number;
  contacto_pedido: string;
  fecha_entrega: string;
  hora_entrega: string;
}

export interface Pedido {
  id_pedido: number;
  id_estadopedido: number;
  total_pagado: number;
  contacto_pedido: string;
  fecha_entrega: string;
  hora_entrega: string;
}

export function mapPedido(api: PedidoAPI): Pedido {
  return {
    id_pedido: api.id_pedido,
    id_estadopedido: api.id_estadopedido,
    total_pagado: api.total_pagado,
    contacto_pedido: api.contacto_pedido,
    fecha_entrega: api.fecha_entrega,
    hora_entrega: api.hora_entrega
  };
}
