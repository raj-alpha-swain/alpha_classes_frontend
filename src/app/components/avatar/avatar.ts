import { Component, computed, input, signal } from '@angular/core';

/** Shows a photo; if the file is missing, shows the person's initials instead. */
@Component({
  selector: 'app-avatar',
  template: `
    @if (!failed()) {
      <img [src]="src()" [alt]="name()" (error)="failed.set(true)" loading="lazy" />
    } @else {
      <span class="initials" aria-hidden="true">{{ initials() }}</span>
    }
  `,
  styles: `
    :host { display: block; overflow: hidden; background: linear-gradient(135deg, var(--ink), var(--ink-soft)); }
    img { width: 100%; height: 100%; object-fit: cover; }
    .initials {
      width: 100%; height: 100%; display: grid; place-items: center;
      color: var(--saffron); font-family: var(--display); font-weight: 700; font-size: 2.4em;
    }
  `
})
export class Avatar {
  readonly src = input.required<string>();
  readonly name = input.required<string>();
  protected readonly failed = signal(false);
  protected readonly initials = computed(() =>
    this.name().replace(/^(Prof|Dr|Mr|Mrs|Ms)\.?\s+/i, '')
      .split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase());
}
