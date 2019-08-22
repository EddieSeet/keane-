import { Component, OnInit } from '@angular/core';
import { Movie } from "../../model/movie.model";
import {Genre} from "../../model/genre.model"

import { MovieService } from "../../services/movie.service";
import { GenreService } from "../../services/genre.service";
import { ActivatedRoute, Router } from "@angular/router";
import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
//  providers: [Movie]
})
export class MovieDetailComponent implements OnInit {

  // currentMovie : Movie = new Movie(100, "", "", "", 200, "","", "")
  // currentGenre : Genre = new Genre(200, "", "")

  //store movie data from server.
  // selectedMovie: Movie = new Movie(100, "", "", "", 200, "", "", "");
  

  showEditForm: boolean = false;
  selectedMovie: Movie 

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public movieService: MovieService,
    ) { }

  id

  ngOnInit() {

    console.log("movie id from param:")
    console.log(this.activatedRoute.snapshot.params['movie_id']);

    //getting movieid from the url param.
    this.id = this.activatedRoute.snapshot.params['movie_id']

    //getting data back
    this.movieService.getMovies(this.id).subscribe(
      (data: any) => {
        // console.log(data)

        console.log( data[0]["studio"])

        this.selectedMovie = new Movie(
          //  data[0]["actors"],          
          //  data[0]["genre_desc"],
          //  data[0]["genre_id"],
          //  data[0]["genre_name"],
          //  data[0]["image_url"],
          //  data[0]["movie_id"],
          //  data[0]["studio"],
          //  data[0]["title"]
          data[0]["movie_id"],
          data[0]["title"],
          data[0]["actors"],          
          data[0]["studio"],
          data[0]["genre_id"],
          data[0]["genre_name"],
          data[0]["genre_desc"],
          data[0]["image_url"],
 


          // this.selectedMovie.actors = data[0]["actors"],          
          // this.selectedMovie.genre_desc = data[0]["genre_desc"],
          // this.selectedMovie.genre_id = data[0]["genre_id"],
          // this.selectedMovie.genre_name = data[0]["genre_name"],
          // this.selectedMovie.image_url = data[0]["image_url"],
          // this.selectedMovie.movie_id = data[0]["movie_id"],
          // this.selectedMovie.studio = data[0]["studio"],
          // this.selectedMovie.title = data[0]["title"]
        )
      

        // this.selectedMovie.image_url = data[0]["image_url"]
        // this.selectedMovie.title = data[0]["title"]
        // this.selectedMovie.actors = data[0]["actors"]
        // this.selectedMovie.studio = data[0]["studio"]
        // this.selectedMovie.genre_name = data[0]["genre_name"]
        // this.selectedMovie.genre_desc = data[0]["genre_desc"]
      }
    )

    
    if (this.selectedMovie === undefined) {
      this.router.navigate(['not-found']);
    }


  }
//end of ngoninit



//onupdate (edit)
  onUpdate(
    title: string,
    actors: string,
    studio: string,
    //genre_id: number,
    genre_name: string,
    genre_desc: string,
    image_url:string
    ) {

      
      this.selectedMovie.title = title
      this.selectedMovie.actors = actors
      this.selectedMovie.studio = studio

      this.selectedMovie.genre_name = genre_name
      this.selectedMovie.genre_desc = genre_desc
      this.selectedMovie.image_url = image_url



      // let updateInfo = new Movie(
      // //changed to this.id
      // this.id,
      // title,
      // actors,
      // studio,
      // genre_id,
      // genre_name,
      // genre_desc,
      // this.selectedMovie.image_url)


      this.movieService.updateMovie(this.selectedMovie, this.id).subscribe(
        (data:any)=>{console.log(data)},
        (err:any) => {console.log(err)}
      )
      
//the one line below is his original code
//    this.movieService.updateMovie(updateInfo)


    // getcoworker(id: any) {
    //   const httpHeaders = new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'auth-token': this.UserService.auth_token
    //   })
    //   const options = {
    //     headers: httpHeaders
    //   }
    //   return this.httpClient.get<any>(this.url + ":3000/api/get/coworkers/" + id, options)
    //     .pipe(
    //       tap(data => console.log(data)),
    //       catchError(this.handleError)
    //     )
    // }

    // this.movieService.updateMovie(updateInfo).subscribe(
    //   (success) => {
    //     if (success) { //successful
    //       this.toggleShowEditForm();
    //       alert("Record Updated");
    //       this.selectedMovie.image_url = updateInfo.image_url;
    //       this.selectedMovie.title = updateInfo.title;
    //       this.selectedMovie.actors = updateInfo.actors;
    //       this.selectedMovie.studio = updateInfo.studio;
    //       this.selectedMovie.genre_name = updateInfo.genre_name;
    //       this.selectedMovie.genre_desc = updateInfo.genre_desc;
    //     }
    //     else {
    //       this.toggleShowEditForm();
    //       alert("Update Failed, Please try again.")
    //     }
    //   }
    // );
  
  }







  toggleShowEditForm() {
    this.showEditForm = !this.showEditForm;
  }

}
