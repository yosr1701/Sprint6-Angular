import { Component, OnInit } from '@angular/core';
import { VetementService } from '../services/vetement.service';
import { Genre } from '../model/genre.model';
import { UpdateGenreComponent } from '../update-genre/update-genre.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-liste-genres',
  imports: [UpdateGenreComponent, CommonModule],
  templateUrl: './liste-genres.component.html',
  styles: ``
})
export class ListeGenresComponent implements OnInit {

  genres!: Genre[];
  updatedGen: Genre = { "idGen": 0, "nomGen": "" }
  ajout:boolean=true;

  constructor(private vetementservice: VetementService , public authService : AuthService) { }

  ngOnInit(): void {
    this.vetementservice.listeGenres().
      subscribe(gens => {
        this.genres = gens._embedded.genres;
        console.log(gens);
      });
  }

  genreUpdated(gen: Genre) {
    console.log("gen updated event", gen);
    this.vetementservice.ajouterGenre(gen).
      subscribe(() => this.chargerGenres());
  }
  chargerGenres() {
    this.vetementservice.listeGenres().
      subscribe(gens => {
        this.genres = gens._embedded.genres;
        console.log(gens);
      });
  }

  updateGen(gen:Genre) {
    this.updatedGen=gen;
    this.ajout=false;
}
}
