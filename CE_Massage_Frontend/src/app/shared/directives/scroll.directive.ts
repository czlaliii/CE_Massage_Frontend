import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';

@Directive({
    selector: '[scrollAnimate]',
    standalone: true
})
export class ScrollAnimateDirective implements AfterViewInit {

    @Input() animation: 'fade-up' | 'fade-in' | 'zoom-in' = 'fade-up';

    constructor(private el: ElementRef) {}

    ngAfterViewInit() {
    const element = this.el.nativeElement;

    // alap class
    element.classList.add('sa-init', this.animation);

    const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            element.classList.add('sa-visible');
        }
        });
    },
    { threshold: 0.2 }
    );

    observer.observe(element);
    }
}