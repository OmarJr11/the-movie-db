import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from 'src/app/core/models/movie.model';
import SwiperCore, { SwiperOptions, Navigation } from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation]);
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  @Input() movies!: Movie[];
  @Input() mouseover!: boolean;
  @Input() isMovie!: boolean;
  @Output() selectedMovie = new EventEmitter<Movie>();
  @Output() goToMovie = new EventEmitter<{movie: Movie, isMovie: boolean}>();

  config: SwiperOptions = {
    slidesPerView: 'auto',
    spaceBetween: 20,
    navigation: true,
    scrollbar: { draggable: true },
    direction: "horizontal",
  };

  constructor() { }

  ngOnInit(): void {
  }

  selectMovie(movie: Movie) {
    if(this.mouseover) {
      this.selectedMovie.emit(movie);
    }
  }

  goToMovieEmit(movie: Movie) {
    this.goToMovie.emit({movie, isMovie: this.isMovie});
  }

  searchImage(movie: Movie) {
    return 'https://image.tmdb.org/t/p/original' + movie.poster_path
  }
}
