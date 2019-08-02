import { Injectable, EventEmitter } from '@angular/core';
import { Movie } from "./movie.model";
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  genreSelected = -1;

  movieUpdated = new EventEmitter<void>();
  movieAdded = new EventEmitter <void> ();

  private movieList : Movie [] = [
    // new Movie(101, "James Bond 007", "Daniel Craig, Pierce Brosnan, Sean Connery", "Pinewood Studios", 201, "Spy", "James is a superficial character that is a spy.", "assets/img/jamesbond.jpg"),
    // new Movie(102, "Mission Impossible", "Tom Cruise, Simon Pegg, Ving Rhames", "Tom Cruise Studios", 202, "Thriller", "Ethan Hunt always saves the world when they are in trouble.", "assets/img/missionimp.jpg"),
    // new Movie(103, "The Avengers", "Robert Downey Jr, Chris Evans, Chris Hemsworth", "Marvel Studios", 203, "Superhero", "Avengers are a bunch of superheroes.", "assets/img/avengers.jpg"),
    // new Movie(104, "Fast & Furious", "Vin Diesel, Dwayne Johnson, Jason Statham", "Furious Studios", 204, "Action", "These drivers know how to race fast and furious.", "assets/img/fastnfurious.jpg")
  ];

  constructor(public httpClient: HttpClient) { }


  loadMovies2() {
    return this.httpClient.get<Movie[]>("http://localhost:3000/api/movies2")
      .pipe(
        map(
          (movies) => {
            console.log(movies);
            this.movieList = movies;
            return movies;
          },
          (error) => {
            console.log(error);
          }
        )
      );
  }

  addMovie(newMovieInfo) {

    const httpHeaders = new HttpHeaders({
        "Content-Type": "application/json",
        "Cache-Control": "no-cache"
      });

    const options = {
      headers: httpHeaders
    }

    this.httpClient.post<Movie>("/api/movies", 
    {info: newMovieInfo}, options)
      .subscribe((respone) => {
          this.movieList.push(respone);
          this.movieAdded.emit();
        }
      );

  }

  // addMovie(newMovieInfo) {
  //   this.movieList.push(newMovieInfo);
  // }

  // getMovies(id:any) {
    
  //   //return this.movieList.slice();
  //   console.log("get a movie")
  //   return this.httpClient.get<any>("http://localhost:3000/api/movies/" + id)
  //   .pipe(
  //     tap(data=>
  //       console.log(data))
  //   )

  // }

  getMovies(id:any){
    return this.httpClient.get<any>("http://localhost:3000/api/movies/"+id )
    .pipe(
      tap(data=>{
        console.log(data);
      })
    )
  }

  getMoviesByGenre(genre_id) {
    if (this.genreSelected == -1) {
      return this.movieList.slice();
    }
    
  }


  // getMovie(movie_id: number) {
  //   for(let movie of this.movieList) {
  //     if (movie.movie_id == movie_id) {
  //       return movie;
  //     }
  //   }
  //   return undefined;
  // }

  getMovie(movie_id: number) {
    return this.movieList.find(
      movie => { return movie.movie_id == movie_id }, movie_id
    );
  }

  updateMovie(updateInfo: Movie){

    console.log(updateInfo)
var    id = updateInfo.movie_id


    return this.httpClient.put<any>("http://localhost:3000/api/movies/" + id, updateInfo).subscribe(
      data=>{console.log(data)}
    )
    

    
    // const movie_id = updateInfo.movie_id;
    // delete updateInfo['movie_id'];

    // return this.httpClient.put<{success:boolean}>
    // (`http://localhost:3000/api/movies/${movie_id}`, 
    // {info: updateInfo})
    // .pipe(map(
    //   (result) => {
    //     return (result.success == true);
    //   },
    //   (error) => {
    //     console.log(error);
    //     return false;
    //   }
    // ));

  }

  deleteMovie(movie_id: number){
    return this.httpClient.delete<{success:boolean}>
    (`http://localhost:3000/api/movies/${movie_id}`)
    .pipe(map(
      (result) => {
        return (result.success == true);
      },
      (error) => {
        console.log(error);
        return false;
      }
    ));
  }

}
