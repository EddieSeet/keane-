import { Component, OnInit, Input } from '@angular/core';
import { Movie } from "./movie.model";
import { Genre } from "./genre.model";
import { MovieService } from "./movie.service";
import { GenreService } from "./genre.service";
import { Router } from "@angular/router";
import * as _ from 'lodash';
import { isBoolean } from 'util';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
  providers: [
    MovieService,
    GenreService
  ]
})
export class SummaryComponent implements OnInit {

  searchStr = "";

  genreSelected ;

  movieList: Movie[] = [];
  genreList = []

  constructor(private movieService: MovieService,
               private genreService: GenreService,
    private router: Router) { }

  ngOnInit() {
    // this.movieList = this.movieService.getMovies();


    // this.genreList = this.genreService.getGenres();

    this.movieService.loadMovies2()
      .subscribe(
        (result) => {
          // this.movieList = this.movieService.movieList;
          //console.log(result);
          this.movieList = result;
          console.log(this.movieList);
        }
      );



    // this.movieService.movieAdded.subscribe(
    //   // this acts as a function
    //   () => {
    //     this.movieList = this.movieService.getMovies();
    // });



    this.genreService.loadGenres()
    .subscribe(
      (data)=>
      {
        this.genreList = data
        console.log(this.genreList)
      }
    )


  }

  onViewDetail(movie_id: number) {
    console.log("In View Detail" + movie_id);
    this.router.navigate(['/movie-detail', movie_id]);
  }

  // getGenreName(id) {
  //   let result = 'NIL';

  //   let genre = this.genreService.getGenre(id);

  //   if (genre !== undefined) {
  //     result = genre.genre_name;
  //   }

  //   return result;
  // }

  filteron = false;
  ml = []

  onGenreChange() {
console.log(this.genreSelected)
    
  
  if(this.genreSelected =="All"){
    this.filteron = false
  }
  else{
    this.ml = []
    this.filteron = true
    this.ml = this.movieList.filter(e=> e.genre_name == this.genreSelected)
    // this.ml.push(_.find(this.movieList, ["genre_name", this.genreSelected]))

    
  }
  
  }

  // onDelete(movie_id: number) {
  //   this.movieService.deleteMovie(movie_id)
  //     .subscribe(
  //       (success) => {
  //         if (success) { // successful
  //           this.movieService.movieUpdated.emit();
  //           alert("Record Deleted");
  //         } else {
  //           alert("Delete Failed, please try again.");
  //         }
  //       }
  //     );
  // }


  onDelete(movie_id: number) {
    this.movieService.deleteMovie(movie_id)
      .subscribe(
        (success) => {
          if (success) { 
            // successful
            alert("Record Deleted")
            this.movieService.loadMovies2()
              .subscribe(
                (result) => {
                  // this.movieList = this.movieService.movieList;
                  console.log(result);
                  this.movieList = result;
                  console.log(this.movieList);
                }
              );


          } else {
            alert("Delete Failed, please try again.");
          }
        }
      );
  }


}
