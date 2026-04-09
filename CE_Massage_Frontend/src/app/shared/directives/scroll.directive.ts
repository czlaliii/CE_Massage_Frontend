import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';

@Directive({
    selector: '[scrollAnimate]',
    standalone: true
})
export class ScrollAnimateDirective implements AfterViewInit {

    @Input() animation: 'fade-up' | 'fade-in' | 'zoom-in' = 'fade-up';
    @Input() delay: number = 0;

    constructor(private el: ElementRef) {}

    ngAfterViewInit() {
        const element = this.el.nativeElement;

        element.classList.add('sa-init', this.animation);

        // 👉 delay hozzáadása
        element.style.transitionDelay = `${this.delay}ms`;

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