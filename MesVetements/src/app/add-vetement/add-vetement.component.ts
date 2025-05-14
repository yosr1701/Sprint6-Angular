import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Vetement } from '../model/vetement.model';
import { VetementService } from '../services/vetement.service';
import { Genre } from '../model/genre.model';
import { Router } from '@angular/router';
import { GenreWrapper } from '../model/genreWrapped.model';

@Component({
  selector: 'app-add-vetement',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-vetement.component.html',

})
export class AddVetementComponent implements OnInit {

  genres!: Genre[];
  newIdGen!: number;
  newGen!: Genre;
  newVetement = new Vetement();


  message: string = '';


  constructor(private vetementService: VetementService,
    private router: Router) { }

  ngOnInit(): void {
    //this.genres = this.vetementService.listeGenres();
    this.vetementService.listeGenres()
    .subscribe(gens => { this.genres = gens._embedded.genres;
      console.log(gens);
    }); 
  }

  addVetement() {
    this.newVetement.genre = this.genres.find(gen => gen.idGen == this.newIdGen)!;
    this.vetementService.ajouterVetement(this.newVetement)
      .subscribe(vet => {
        console.log(vet);
        this.router.navigate(['vetements']);
      });
  }
  /*  {
       //console.log(this.newVetement);
      //this.newGen = this.vetementService.consulterGenre(this.newIdGen);
      this.newVetement.genre = this.newGen;
      this.vetementService.ajouterVetement(this.newVetement);
      this.message =  this.newVetement.nomVetement + "' ajouté avec succès !";
      this.router.navigate(['vetements'])
    } */


}
