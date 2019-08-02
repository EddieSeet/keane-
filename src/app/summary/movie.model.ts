export class Movie {
  subscribe(data: any, any: any): Movie {
    throw new Error("Method not implemented.");
  }
  updateMovie: any;
    constructor (public movie_id: number,
                 public title: string, 
                 public actors: string,
                 public studio: string, 
                 public genre_id:number, 
                 public genre_name: string,
                 public genre_desc: string,
                 public image_url: string) {
    }
}