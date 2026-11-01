import { Component, DestroyRef, afterNextRender, inject, signal } from '@angular/core';
import { Avatar } from '../avatar/avatar';
import { CountUpDirective } from '../../shared/count-up.directive';
import { TiltDirective } from '../../shared/tilt.directive';
import { ABOUT_CLASSES, HALL_OF_FAME, OWNER } from '../../site-data';

@Component({
  selector: 'app-hero',
  imports: [Avatar, CountUpDirective, TiltDirective],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class Hero {
  protected readonly owner = OWNER;
  protected readonly classes = ABOUT_CLASSES;
  protected readonly faces = HALL_OF_FAME.slice(0, 4);
  /** Floating maths/science symbols in the background (x/y in % of the hero). */
  protected readonly symbols = [
    { s: 'π', x: 6, y: 18 }, { s: '∑', x: 46, y: 12 }, { s: '√x', x: 88, y: 30 }, { s: '∫', x: 14, y: 62 },
    { s: 'Δ', x: 52, y: 70 }, { s: '∞', x: 93, y: 78 }, { s: 'θ', x: 34, y: 40 }, { s: 'x²', x: 72, y: 8 },
    { s: 'λ', x: 3, y: 88 }, { s: 'H₂O', x: 62, y: 46 },
  ];
  protected readonly typed = signal(ABOUT_CLASSES.rotatingWords[0]);

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const words = ABOUT_CLASSES.rotatingWords;
      let w = 0, len = words[0].length, deleting = true;
      let timer: ReturnType<typeof setTimeout>;
      const step = () => {
        len += deleting ? -1 : 1;
        if (len === 0) { deleting = false; w = (w + 1) % words.length; }
        this.typed.set(words[w].slice(0, len));
        let delay = deleting ? 40 : 90;
        if (!deleting && len === words[w].length) { deleting = true; delay = 1900; }
        timer = setTimeout(step, delay);
      };
      timer = setTimeout(step, 2400);
      destroyRef.onDestroy(() => clearTimeout(timer));
    });
  }
}
