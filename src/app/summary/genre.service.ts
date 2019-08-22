import { Injectable, EventEmitter } from '@angular/core';
import { Genre } from "./genre.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  genreAdded = new EventEmitter <void> ();

  // private genreList : Genre [] = [
  //   // new Genre(201, "Spy", "James is a superficial character that is a spy."),
  //   // new Genre(202, "Thriller", "Ethan Hunt always saves the world when they are in trouble."),
  //   // new Genre(203, "Superhero", "Avengers are a bunch of superheroes."),
  //   // new Genre(204, "Action", "These drivers know how to race fast and furious.")
  // ];

  constructor(public httpClient: HttpClient) { }

  loadGenres() {
    return this.httpClient.get<Genre[]>("http://localhost:3000/api/genres")
      .pipe(
        map(
          (genres) => {
            // this.genreList = genres;
            return genres;
          },
          (error) => {
            console.log(error);
          }
        )
      );
  }

  addGenre(newGenreInfo) {

    const httpHeaders = new HttpHeaders({
        "Content-Type": "application/json",
        "Cache-Control": "no-cache"
      });

    const options = {
      headers: httpHeaders
    }

    this.httpClient.post<Genre>("/api/genres", 
    {info: newGenreInfo}, options)
      .subscribe((respone) => {
          // this.genreList.push(respone);
          this.genreAdded.emit();
        }
      );

  }

  // addGenre(newGenreInfo) {
  //   this.genreList.push(newGenreInfo);
  // }

  // getGenres() {
  //   return this.genreList.slice();
  // }

//   getGenre(genre_id: number) {
//     for(let genre of this.genreList) {
//       if (genre.genre_id == genre_id) {
//         return genre;
//       }
//     }
//     return undefined;
//   }
 }
