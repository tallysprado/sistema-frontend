import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Usuario } from '../../models/usuario.models';
@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {
  private api = environment.api;
  constructor(private http: HttpClient) { }

  criarUsuario(usuario: Usuario) {
    return this.http.post(`${this.api}/v1/usuario/save`, usuario);
  }

  findByFilter(usuario: Usuario) {
    return this.http.post(`${this.api}/v1/usuario/filter`, usuario);
  }

  findAll() {
    return this.http.get(`${this.api}/v1/usuario/all`);
  }
}
