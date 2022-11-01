import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { MediaQueriesService } from 'src/app/core';
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

  private _subscription: Subscription = new Subscription();

  constructor( private _mediaQueryService: MediaQueriesService) { }

  ngOnInit(): void {
    this._addSubscription();
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

  private _addSubscription() {
    this._subscription.add(
      this._mediaQueryService.isMobile$.subscribe(
          (isMobile) => {
            if(isMobile) {
              if(window.innerWidth > 950) {
                this.config = {
                  slidesPerView: 6,
                  spaceBetween: 20,
                  navigation: true,
                  scrollbar: { draggable: true },
                  direction: "horizontal",
                };
              } else if(window.innerWidth > 930) {
                this.config = {
                  slidesPerView: 5.9,
                  spaceBetween: 20,
                  navigation: true,
                  scrollbar: { draggable: true },
                  direction: "horizontal",
                };
              } else if(window.innerWidth > 920) {
                this.config = {
                  slidesPerView: 5.8,
                  spaceBetween: 20,
                  navigation: true,
                  scrollbar: { draggable: true },
                  direction: "horizontal",
                };
              } else if(window.innerWidth >= 900) {
                this.config = {
                  slidesPerView: 5.7,
                  spaceBetween: 20,
                  navigation: true,
                  scrollbar: { draggable: true },
                  direction: "horizontal",
                };
              } else if(window.innerWidth >= 880) {
                this.config = {
                  slidesPerView: 5.6,
                  spaceBetween: 20,
                  navigation: true,
                  scrollbar: { draggable: true },
                  direction: "horizontal",
                };
              } else if(window.innerWidth >= 860) {
                this.config = {
                  slidesPerView: 5.48,
                  spaceBetween: 20,
                  navigation: true,
                  scrollbar: { draggable: true },
                  direction: "horizontal",
                };
              } else if(window.innerWidth >= 830) {
                this.config = {
                  slidesPerView: 5.3,
                  spaceBetween: 20,
                  navigation: true,
                  scrollbar: { draggable: true },
                  direction: "horizontal",
                };
              } else if(window.innerWidth >= 800) {
                this.config = {
                  slidesPerView: 5.1,
                  spaceBetween: 20,
                  navigation: true,
                  scrollbar: { draggable: true },
                  direction: "horizontal",
                };
              } else if(window.innerWidth >= 770) {
                this.config = {
                  slidesPerView: 4.9,
                  spaceBetween: 20,
                  navigation: true,
                  scrollbar: { draggable: true },
                  direction: "horizontal",
                };
              } else if(window.innerWidth >= 740) {
                this.config = {
                  slidesPerView: 4.7,
                  spaceBetween: 20,
                  navigation: true,
                  scrollbar: { draggable: true },
                  direction: "horizontal",
                };
              } else if(window.innerWidth >= 710) {
                this.config = {
                  slidesPerView: 4.5,
                  spaceBetween: 20,
                  navigation: true,
                  scrollbar: { draggable: true },
                  direction: "horizontal",
                };
              } else if(window.innerWidth >= 680) {
                this.config = {
                  slidesPerView: 4.3,
                  spaceBetween: 20,
                  navigation: true,
                  scrollbar: { draggable: true },
                  direction: "horizontal",
                };
              } else if(window.innerWidth >= 650) {
                this.config = {
                  slidesPerView: 4.1,
                  spaceBetween: 20,
                  navigation: true,
                  scrollbar: { draggable: true },
                  direction: "horizontal",
                };
              } else if(window.innerWidth >= 620) {
                this.config = {
                  slidesPerView: 3.9,
                  spaceBetween: 20,
                  navigation: true,
                  scrollbar: { draggable: true },
                  direction: "horizontal",
                };
              } else {
                this.config = {
                  slidesPerView: 3.8,
                  spaceBetween: 20,
                  navigation: true,
                  scrollbar: { draggable: true },
                  direction: "horizontal",
                };
              }
            }
          }
      )
    );

    this._subscription.add(
      this._mediaQueryService.isMobileXs$.subscribe(
          (isMobile) => {
            if(isMobile) {
              if(window.innerWidth >= 580) {
                this.config = {
                  slidesPerView: 4.9,
                  spaceBetween: 20,
                  navigation: true,
                  scrollbar: { draggable: true },
                  direction: "horizontal",
                };
              } else if(window.innerWidth >= 550) {
                this.config = {
                  slidesPerView: 4.7,
                  spaceBetween: 20,
                  navigation: true,
                  scrollbar: { draggable: true },
                  direction: "horizontal",
                };
              } else if(window.innerWidth >= 530) {
                this.config = {
                  slidesPerView: 4.5,
                  spaceBetween: 20,
                  navigation: true,
                  scrollbar: { draggable: true },
                  direction: "horizontal",
                };
              } else if(window.innerWidth >= 505) {
                this.config = {
                  slidesPerView: 4.3,
                  spaceBetween: 20,
                  navigation: true,
                  scrollbar: { draggable: true },
                  direction: "horizontal",
                };
              } else if(window.innerWidth >= 480) {
                this.config = {
                  slidesPerView: 4.1,
                  spaceBetween: 20,
                  navigation: true,
                  scrollbar: { draggable: true },
                  direction: "horizontal",
                };
              } else if(window.innerWidth >= 460) {
                this.config = {
                  slidesPerView: 3.9,
                  spaceBetween: 20,
                  navigation: true,
                  scrollbar: { draggable: true },
                  direction: "horizontal",
                };
              } else if(window.innerWidth >= 435) {
                this.config = {
                  slidesPerView: 3.7,
                  spaceBetween: 20,
                  navigation: true,
                  scrollbar: { draggable: true },
                  direction: "horizontal",
                };
              } else if(window.innerWidth >= 410) {
                this.config = {
                  slidesPerView: 3.48,
                  spaceBetween: 20,
                  navigation: true,
                  scrollbar: { draggable: true },
                  direction: "horizontal",
                };
              } else if(window.innerWidth >= 390) {
                this.config = {
                  slidesPerView: 3.3,
                  spaceBetween: 20,
                  navigation: true,
                  scrollbar: { draggable: true },
                  direction: "horizontal",
                };
              } else if(window.innerWidth >= 380) {
                this.config = {
                  slidesPerView: 3.2,
                  spaceBetween: 20,
                  navigation: true,
                  scrollbar: { draggable: true },
                  direction: "horizontal",
                };
              } else if(window.innerWidth >= 355) {
                this.config = {
                  slidesPerView: 3.0,
                  spaceBetween: 20,
                  navigation: true,
                  scrollbar: { draggable: true },
                  direction: "horizontal",
                };
              } else if(window.innerWidth >= 335) {
                this.config = {
                  slidesPerView: 2.80,
                  spaceBetween: 20,
                  navigation: true,
                  scrollbar: { draggable: true },
                  direction: "horizontal",
                };
              } else if(window.innerWidth >= 325) {
                this.config = {
                  slidesPerView: 2.74,
                  spaceBetween: 20,
                  navigation: true,
                  scrollbar: { draggable: true },
                  direction: "horizontal",
                };
              } else {
                this.config = {
                  slidesPerView: 2.68,
                  spaceBetween: 20,
                  navigation: true,
                  scrollbar: { draggable: true },
                  direction: "horizontal",
                };
              }
            }
          }
      )
    );
  }
}
