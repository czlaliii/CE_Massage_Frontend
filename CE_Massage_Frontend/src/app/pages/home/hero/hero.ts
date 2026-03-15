import { Component, ElementRef, ViewChild } from '@angular/core';
import { Socials } from '../../../shared/socials/socials';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [Socials],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero implements AfterViewInit {
  @ViewChild('heroVideo')
  videoRef!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit(): void {
    const video = this.videoRef.nativeElement;

    const showVideo = () => video.classList.add('loaded');

    video.addEventListener('playing', showVideo);

    video.addEventListener('canplay', showVideo);

    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        video.muted = true;
        video.play().catch(() => {});
      });
    }
  }
}
