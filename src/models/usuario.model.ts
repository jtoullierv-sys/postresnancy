export interface UsuarioAPI {
  nombre: string;
  contrasena: string;
}

export interface Usuario {
  nombre: string;
  contrasena: string;
}

export function mapUsuario(apiData: UsuarioAPI): Usuario {
  return {
    nombre: apiData.nombre,
    contrasena: apiData.contrasena
  };
}