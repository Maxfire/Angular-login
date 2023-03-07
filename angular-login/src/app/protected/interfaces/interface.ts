// Interfaz Usuario
export interface User {
  uid: string;
  email?: string;
  name: string;
  isDeleting?: false;
}

// Interfaz de respuesta de Usuario
export interface UserResponse {
  _id: string;
  name: string;
  email: string;
  password: string;
  __v?: string;
}

// Interfaz general de respuesta
export interface GeneralResponse {
  ok: boolean;
  msg?: string;
  usuario?: UserResponse;
}
