import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VetementService } from '../services/vetement.service';
import { Vetement } from '../model/vetement.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Genre } from '../model/genre.model';

@Component({
  selector: 'app-update-vetement',
  imports: [FormsModule,CommonModule],
  templateUrl: './update-vetement.component.html',
  styles: ``
})
export class UpdateVetementComponent implements OnInit{

  currentVetement= new Vetement();
  genres! : Genre[];
  updatedGenId! : number ; 

  constructor(private activatedRoute: ActivatedRoute,
            private router :Router,
             private vetementService : VetementService){}

             ngOnInit(): void {
              this.vetementService.listeGenres().subscribe(gens => {
                this.genres = gens._embedded.genres;
                console.log(gens);
              });
            
              this.vetementService.consulterVetement(this.activatedRoute.snapshot.params['id'])
                .subscribe(vet => {
                  this.currentVetement = vet;
                  // On peut maintenant accéder au genre sans erreur
                  this.updatedGenId = this.currentVetement.genre.idGen;
                });
            }
            

  updateVetement(){
    //console.log(this.currentVetement);
    //this.currentVetement.genre = this.vetementService.consulterGenre(this.updatedGenId);
    this.currentVetement.genre = this.genres.
 find(gen => gen.idGen == this.updatedGenId)!;
    this.vetementService.updateVetement(this.currentVetement).subscribe(vet =>
      {this.router.navigate(['vetements']);})
    ;
  }
}
