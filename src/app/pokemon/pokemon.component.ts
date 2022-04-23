import { Component, OnInit, ViewChild } from '@angular/core';
//import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})

export class PokemonComponent implements OnInit {

  displayedColumns : string[] = ['id', 'name', 'image'];
  data: any[] = [];
  dataSource = new MatTableDataSource<any>(this.data);
  index : number;
  elementsPerPage : number;
  //@ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private pokemonService : PokemonService) {
    this.index = 0;
    this.elementsPerPage = 10;
  }

  ngOnInit(): void {
    this.getPokemons(this.index);
  }

  getPokemons(offset : number){
    this.pokemonService.getDataPokemons(offset).subscribe(
      res => {
        let pokemonData = {};
        this.data = [];
        res.results.forEach((poke: { name: any; url:any; id: any; image:any;}) => {
          this.pokemonService.getPokemon(poke.url).subscribe(resp => {
            console.log(resp);
            pokemonData = {
              id: resp.id,
              name: poke.name,
              image: resp.sprites.front_default
            };
            this.data.push(pokemonData);
            this.dataSource = new MatTableDataSource<any>(this.data);
          })
        });
      },
      err => {
        console.log(err);

      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  nextList(){
    this.index = this.index+this.elementsPerPage;
    console.log(this.index);
    this.getPokemons(this.index)
  }
  prevList(){
    this.index = this.index-this.elementsPerPage;
    console.log(this.index);
    this.getPokemons(this.index)
  }

}
