import { Component } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';
import { ABOUT_CLASSES, OWNER } from '../../site-data';

@Component({
  selector: 'app-about',
  imports: [RevealDirective],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {
  protected readonly owner = OWNER;
  protected readonly classes = ABOUT_CLASSES;
}
