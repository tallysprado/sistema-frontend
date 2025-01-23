import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IUsuario, Usuario } from '../../models/usuario.models';
import { Observable } from 'rxjs';
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

  updateUsuario(id: number, usuario: Usuario) {
    return this.http.put(`${this.api}/v1/usuario/update/${id}`, usuario);
  }

  findAll() : Observable<IUsuario[]> {
    return this.http.get<IUsuario[]>(`${this.api}/v1/usuario/all`);
  }

  findById(id: number) : Observable<IUsuario> {
    return this.http.get<IUsuario>(`${this.api}/v1/usuario/${id}`);
  }
}
