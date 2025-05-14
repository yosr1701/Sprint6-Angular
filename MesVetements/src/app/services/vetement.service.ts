import { Injectable } from '@angular/core';
import { Vetement } from '../model/vetement.model';
import { Genre } from '../model/genre.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiURL } from '../config';
import { GenreWrapper } from '../model/genreWrapped.model';
import { AuthService } from './auth.service';




// httpOptions cad json
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class VetementService {

  apiURLGen: string = 'http://localhost:8081/vetements/gen';
  vetements!: Vetement[];
  genres!: Genre[];
  token!: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    /* this.genres = [
      { idGen : 1 , nomGen : "Femme" },
      { idGen : 2 , nomGen : "Homme" }
    ] */
    /* this.vetements= [
      {idVetement : 1, nomVetement : "veste", prixVetement : 300, dateCreation : new Date("01/14/2024"), genre : { idGen : 1 , nomGen : "Femme" }},
      {idVetement : 2, nomVetement : "robe", prixVetement : 450, dateCreation : new Date("12/17/2025"), genre : { idGen : 1 , nomGen : "Femme" }},
      {idVetement : 3, nomVetement :"chemise", prixVetement : 90, dateCreation : new Date("02/20/2024"), genre : { idGen : 2 , nomGen : "Homme" }}   
    ]; */
  }

  /* listeVetements(): Vetement[] {
    return this.vetements;
  } */


  listeVetements(): Observable<Vetement[]> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<Vetement[]>(apiURL + "/all", { headers: httpHeaders });
  }

  /* ajouterVetement(vet: Vetement){
    this.vetements.push(vet);
  } */

  ajouterVetement(vet: Vetement): Observable<Vetement> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.post<Vetement>(apiURL + "/addvet", vet, { headers: httpHeaders });
  }

  supprimerVetement(id: number) {
    const url = `${apiURL}/delvet/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.delete(url, { headers: httpHeaders });
  }


  consulterVetement(id: number): Observable<Vetement> {
    const url = `${apiURL}/getbyid/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<Vetement>(url, { headers: httpHeaders });
  }

  updateVetement(vet: Vetement): Observable<Vetement> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.put<Vetement>(apiURL + "/updatevet", vet, { headers: httpHeaders });
  }



  /*listeGenre():Observable<Genre[]>{
    return this.http.get<Genre[]>(apiURL+"/genre");
    }
   listeGenres(): Genre[] {
    return this.genres;
  }
  
  consulterGenre(id: number): Genre {
    return this.genres.find(gen => gen.idGen == id)!;
  } */
  listeGenres(): Observable<GenreWrapper> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<GenreWrapper>(this.apiURLGen, { headers: httpHeaders }
    );
  }

  rechercherParGenre(idGen: number): Observable<Vetement[]> {
    const url = `${apiURL}/vetGen/${idGen}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<Vetement[]>(url, { headers: httpHeaders });

  }
  rechercherParNom(nom: string): Observable<Vetement[]> {
    const url = `${apiURL}/vetsByName/${nom}`;
    return this.http.get<Vetement[]>(url);
  }
  ajouterGenre(gen: Genre): Observable<Genre> {
    let jwt = this.authService.getToken(); 
  jwt = "Bearer " + jwt;
  let httpHeaders = new HttpHeaders({ 
    "Authorization": jwt,
    "Content-Type": "application/json"
  });
  return this.http.post<Genre>(this.apiURLGen, gen, { headers: httpHeaders }); 

  }

}
