import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private url: string = "https://pokeapi.co/api/v2/pokemon";

  constructor(private http : HttpClient) { }

  getDataPokemons(index: number){
    return this.http.get<any>(`${this.url}?limit=10&offset=${index}`);
  }

  getPokemon(urlPokemon : string){
    let id = urlPokemon.split('/').slice(-2).join('');
    return this.http.get<any>(`${this.url}/${id}`);
  }
}
