import { Routes } from '@angular/router';
import { VetementsComponent } from './vetements/vetements.component';
import { AddVetementComponent } from './add-vetement/add-vetement.component';
import { UpdateVetementComponent } from './update-vetement/update-vetement.component';
import { RechercheParGenreComponent } from './recherche-par-genre/recherche-par-genre.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { ListeGenresComponent } from './liste-genres/liste-genres.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { vetementGuard } from './vetement.guard';
import { RegisterComponent } from './register/register.component';


export const routes: Routes = [
    {path:"vetements", component : VetementsComponent},
    {path:"add-vetement", component : AddVetementComponent ,canActivate: [vetementGuard]},
    {path:"updateVetement/:id", component : UpdateVetementComponent},
    {path:"rechercheParGenre", component : RechercheParGenreComponent},
    {path: "rechercheParNom", component : RechercheParNomComponent},
    {path: "listeGneres", component : ListeGenresComponent},
    {path: "login" , component : LoginComponent},
    {path:"app-forbidden",component : ForbiddenComponent},
    {path:'register',component:RegisterComponent},
    {path:"",redirectTo: "vetements",pathMatch: "full"}
];
