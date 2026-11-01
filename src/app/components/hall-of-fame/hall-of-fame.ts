import { Component, ElementRef, inject, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Avatar } from '../avatar/avatar';
import { RevealDirective } from '../../shared/reveal.directive';
import { HALL_OF_FAME } from '../../site-data';

/** How many cards show before "View all". */
const FEATURED = 4;

@Component({
  selector: 'app-hall-of-fame',
  imports: [Avatar, RevealDirective, NgTemplateOutlet],
  templateUrl: './hall-of-fame.html',
  styleUrl: './hall-of-fame.css'
})
export class HallOfFame {
  private readonly host = inject(ElementRef<HTMLElement>);

  protected readonly students = HALL_OF_FAME;
  protected readonly featured = HALL_OF_FAME.slice(0, FEATURED);
  protected readonly rest = HALL_OF_FAME.slice(FEATURED);
  protected readonly expanded = signal(false);
  /** Cards turned to their "now" side (tap on phones, hover on desktop). */
  protected readonly flipped = signal(new Set<number>());

  toggle(i: number) {
    this.flipped.update(s => {
      const n = new Set(s);
      n.has(i) ? n.delete(i) : n.add(i);
      return n;
    });
  }

  toggleAll() {
    const collapsing = this.expanded();
    this.expanded.set(!collapsing);
    // When closing a long list, bring the section back into view instead of leaving the visitor far below it
    if (collapsing) this.host.nativeElement.querySelector('section')?.scrollIntoView({ behavior: 'smooth' });
  }
}
