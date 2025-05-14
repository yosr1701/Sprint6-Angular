import { Component, OnInit } from '@angular/core';
import { Vetement } from '../model/vetement.model';
import { CommonModule } from '@angular/common';
import { VetementService } from '../services/vetement.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-vetements',
  standalone: true, // Ajouté pour utiliser le module standalone en Angular 15+
  imports: [CommonModule, RouterLink],
  templateUrl: './vetements.component.html'
})
export class VetementsComponent implements OnInit {

  vetements!: Vetement[];

  constructor(private vetementService: VetementService ,
              public authService : AuthService
            ) { }

  ngOnInit(): void {
    this.vetementService.listeVetements().subscribe(vet => {
      console.log(vet);
      this.vetements = vet;
    });
  }

  supprimerVetement(vet: Vetement): void {
    const conf = confirm("Etes-vous sûr ?");
    if (conf) {
      this.vetementService.supprimerVetement(vet.idVet).subscribe(() => {
        // Réactualiser la liste après la suppression
        this.vetements = this.vetements.filter(v => v.idVet !== vet.idVet);
        console.log('Vêtement supprimé avec succès');
      });
    }
  }
}
