export interface UsuarioDto {
  id?: string;
  name: string;
  lastName: string;
  email: string;
  password?: string;
  consultorio?: string;
  rol?: string;
  //agregar al backend para habilitarlos a rol y consultorio
}
