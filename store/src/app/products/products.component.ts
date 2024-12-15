import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  images: string[] = ['assets/bag1.jpg', 'assets/case1.jpg', 'assets/shoe1.png'];
  currentSlide: number = 0;
  autoSlideInterval: any;
  isHovered: boolean = false;

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    clearInterval(this.autoSlideInterval);
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      if (!this.isHovered) {
        this.moveSlide(1);
      }
    }, 2000); // Change slide every 3 seconds
  }

  moveSlide(direction: number) {
    this.currentSlide += direction;
    const totalSlides = this.images.length;
    if (this.currentSlide < 0) {
      this.currentSlide = totalSlides - 1;
    } else if (this.currentSlide >= totalSlides) {
      this.currentSlide = 0;
    }
  }

  getTransform() {
    const offset = -this.currentSlide * 100;
    return `translateX(${offset}%)`;
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.isHovered = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isHovered = false;
  }
}