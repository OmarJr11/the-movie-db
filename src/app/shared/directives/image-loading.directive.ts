import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: 'img[appImageLoading]',
  host: {
    '[src]': 'src',
  },
})
export class ImageLoadingDirective implements OnInit {
  @Input() urlCustom!: string;
  @Input() appImageLoading!: string;
  @Input() src!: string;
  @Input() loading: boolean = true;

  saveClass: string = '';
  loadingSpinner = 'assets/images/icons/spinner.svg';

  @HostBinding('attr.src') srcAttr!: string;
  @HostBinding('attr.class') class!: string;

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.srcAttr = '';
    this.saveClass = this.elementRef.nativeElement.className;
    
    this.srcAttr = this.loading ? 'assets/images/spinner.svg' : '';
  }

  @HostListener('window:load')
  loadImage() {
    this.class = this.saveClass;
    this.srcAttr = this.src;
  }

  @HostListener('error')
  errorToLoad() {
    this.src = this.urlCustom ? this.urlCustom : 'assets/images/video-camera.png';
    this.srcAttr = this.src;
    this.class = 'error-image';
  }
}
