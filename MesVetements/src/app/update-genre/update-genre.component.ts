import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Genre } from '../model/genre.model';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-update-genre',
  imports: [FormsModule ],
  templateUrl: './update-genre.component.html',
  styles: ``
})
export class UpdateGenreComponent implements OnInit {

  @Input()
  genre! : Genre;

  constructor( public authService : AuthService){}

  @Output()
  genreUpdated = new EventEmitter<Genre>();
  
  @Input()
  ajout!:boolean;
  
  ngOnInit(): void {
    console.log("ngOnInit du composant UpdateCategorie ",this.genre);
  }

  saveGenre(){
    this.genreUpdated.emit(this.genre);
}



}
