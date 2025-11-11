export interface ClienteAPI {
  id_cliente: number;
  id_usuario: number;
  cli_nom : string;
  cli_correo : string;
}

export interface Cliente {
  id_cliente: number;
  id_usuario: number;
  cli_nom: string;
  cli_correo: string;
}

export function mapUsuario(apiData: ClienteAPI): Cliente {
  return {
    id_cliente: apiData.id_cliente,
    id_usuario: apiData.id_usuario,
    cli_nom: apiData.cli_nom,
    cli_correo: apiData.cli_correo
  };
}