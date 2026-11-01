import { Directive, ElementRef, OnDestroy, OnInit, inject, input } from '@angular/core';

/** Counts a number up from 0 when visible. Keeps any prefix/suffix: "1000+" "95%" "20+". */
@Directive({ selector: '[appCountUp]' })
export class CountUpDirective implements OnInit, OnDestroy {
  readonly appCountUp = input.required<string>();
  readonly duration = input(1800);

  private readonly el = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;
  private frame = 0;

  ngOnInit() {
    const node = this.el.nativeElement;
    const text = this.appCountUp();
    const m = text.match(/^(\D*)([\d,]+)(.*)$/);
    node.textContent = text;
    if (!m || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const [, prefix, numStr, suffix] = m;
    const target = Number(numStr.replace(/,/g, ''));
    node.textContent = `${prefix}0${suffix}`;

    this.observer = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      this.observer?.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / this.duration());
        const eased = 1 - Math.pow(1 - t, 3);
        node.textContent = `${prefix}${Math.round(target * eased).toLocaleString('en-IN')}${suffix}`;
        if (t < 1) this.frame = requestAnimationFrame(tick);
      };
      this.frame = requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    this.observer.observe(node);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
    cancelAnimationFrame(this.frame);
  }
}
