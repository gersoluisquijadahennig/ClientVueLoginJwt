export interface LoginInput {
  run: string;
  password: string;
}

export interface SessionData {
    id_usuario: string;
    personas_id: string;
    id_perfil: string;
    id_establecimiento: string;
    nom_establecimiento: string;
    email: string;
    runUsu: string;
    serv: string;
    desc_usuario: string;
    direccion_ip: string;
    alias_usuario: string;
    cambio_clave: string;
    habilita_depuracion: string;
    proyecto_predeterminado: string;
    access_token: string;
  }


export interface Me{
  id : string;
  name : string;
  email : string;
  email_verified_at : string;
  created_at : string;
  updated_at : string;
}
