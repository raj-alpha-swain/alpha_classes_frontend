import { Directive, ElementRef, HostListener, inject, input } from '@angular/core';

/** Subtle 3D tilt that follows the mouse. Sets --rx, --ry, --mx, --my on the element. */
@Directive({ selector: '[appTilt]' })
export class TiltDirective {
  readonly maxTilt = input(8);
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly enabled =
    typeof matchMedia !== 'undefined' &&
    matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches;

  @HostListener('pointermove', ['$event'])
  move(e: PointerEvent) {
    if (!this.enabled) return;
    const node = this.el.nativeElement;
    const r = node.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    node.style.setProperty('--ry', `${(x - 0.5) * this.maxTilt() * 2}deg`);
    node.style.setProperty('--rx', `${(0.5 - y) * this.maxTilt() * 2}deg`);
    node.style.setProperty('--mx', `${x * 100}%`);
    node.style.setProperty('--my', `${y * 100}%`);
  }

  @HostListener('pointerleave')
  leave() {
    const node = this.el.nativeElement;
    node.style.setProperty('--rx', '0deg');
    node.style.setProperty('--ry', '0deg');
  }
}
