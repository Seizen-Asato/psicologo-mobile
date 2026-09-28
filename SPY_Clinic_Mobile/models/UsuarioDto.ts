export interface UsuarioDto {
  id?: string;
  name: string;
  lastName: string;
  email: string;
  password?: string;
  consultorio?: string;
  role?: string;
}
