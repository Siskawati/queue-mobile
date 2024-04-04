import { jwtDecode } from 'jwt-decode';
import "core-js/stable/atob"

export function decodeToken<T>(token: string) {
  return jwtDecode(token) as T;
}