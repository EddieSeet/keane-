import { Component, OnInit } from '@angular/core';
import { Movie } from "../movie.model";
import { Genre } from "../genre.model";
import { MovieService } from "../movie.service";
import { GenreService } from "../genre.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  // currentMovie : Movie = new Movie(100, "", "", "", 200, "","", "")
  // currentGenre : Genre = new Genre(200, "", "")

  selectedMovie: Movie = new Movie(100, "", "", "", 200, "", "", "");

  showEditForm: boolean = false;

  constructor(public router: Router,
    public activatedRoute: ActivatedRoute,
    public movieService: MovieService) { }
id

  ngOnInit() {
    console.log(this.activatedRoute.snapshot.params['movie_id']);

    this.id = this.activatedRoute.snapshot.params['movie_id']
    //  this.movieService.getMovies(id)
    //   .subscribe((data: any) => {

    //   }, (err: any) => {
    //     console.log(err)
    //   })

    this.movieService.getMovies(this.id).subscribe(

      (data: any) => {
        // console.log(data)
        this.selectedMovie.image_url = data[0]["image_url"]
        this.selectedMovie.title = data[0]["title"]
        this.selectedMovie.actors = data[0]["actors"]
        this.selectedMovie.studio = data[0]["studio"]
        this.selectedMovie.genre_name = data[0]["genre_name"]
        this.selectedMovie.genre_desc = data[0]["genre_desc"]
      }
    )

    if (this.selectedMovie === undefined) {
      this.router.navigate(['not-found']);
    }
  }




  onUpdate(
    title: string,
    actors: string,
    studio: string,
    genre_id: number,
    genre_name: string,
    genre_desc: string) {

    console.log(
      `
       - ${title} 
    - ${actors}
     - ${studio}
      - ${genre_id}
       - ${genre_name}
        - ${genre_desc}`);


    let updateInfo = new Movie(
      //changed to this.id
      this.id,
      title,
      actors,
      studio,
      genre_id,
      genre_name,
      genre_desc,
      this.selectedMovie.image_url);
      this.movieService.updateMovie(updateInfo)
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
