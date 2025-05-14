import { Component, OnInit } from '@angular/core';
import { VetementService } from '../services/vetement.service';
import { Vetement } from '../model/vetement.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchFilterPipe } from '../search-filter.pipe';

@Component({
  selector: 'app-recherche-par-nom',
  imports: [CommonModule,FormsModule,SearchFilterPipe],
  templateUrl: './recherche-par-nom.component.html',
  styles: ``
})
export class RechercheParNomComponent implements OnInit {

  nomVet! : string ;
  vetements! : Vetement[];
  allProduits! : Vetement[];
  searchTerm!: string;

  constructor(private vetementservice : VetementService){}

  ngOnInit(): void {
    this.vetementservice.listeVetements().subscribe(vets => {
      console.log(vets);
      this.vetements = vets; 
      });
      //this.vetements = [];
    }
    rechercherVets()
    {
      if (this.nomVet)
        this.vetementservice.rechercherParNom(this.nomVet).subscribe(vets=> {
        this.vetements = vets;
        console.log(vets)});
      else 
      this.vetementservice.listeVetements().subscribe(vets => {
        console.log(vets);
        this.vetements = vets;
        });
      }

      onKeyUp(filterText : string){
        this.vetements = this.allProduits.filter(item =>
        item.nomVet.toLowerCase().includes(filterText));
        }
        
      
}


