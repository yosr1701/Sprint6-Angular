import { Component, OnInit } from '@angular/core';
import { Vetement } from '../model/vetement.model';
import { CommonModule } from '@angular/common';
import { Genre } from '../model/genre.model';
import { FormsModule } from '@angular/forms';
import { VetementService } from '../services/vetement.service';

@Component({
  selector: 'app-recherche-par-genre',
  imports: [CommonModule,FormsModule],
  templateUrl: './recherche-par-genre.component.html',
  styles: ``
})
export class RechercheParGenreComponent implements OnInit {
  vetements! : Vetement[];
  genres! : Genre[];
  IdGenre! : number;

  constructor(private vetementservice : VetementService){}

  ngOnInit(): void {

    this.vetementservice.listeGenres().subscribe(gens => {this.genres = gens._embedded.genres; 
      console.log(gens)});

      this.vetementservice.listeVetements().subscribe(vets => { 
        console.log(vets); 
        this.vetements = vets; 
        }); 
      
  }

  onChange(){
    this.vetementservice.rechercherParGenre(this.IdGenre).
    subscribe(vets =>{this.vetements=vets});
  }

}
