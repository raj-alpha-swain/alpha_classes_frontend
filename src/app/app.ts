import { Component, HostListener, signal } from '@angular/core';
import { Header } from './components/header/header';
import { Hero } from './components/hero/hero';
import { About } from './components/about/about';
import { HallOfFame } from './components/hall-of-fame/hall-of-fame';
import { Resources } from './components/resources/resources';
import { Contact } from './components/contact/contact';
import { Footer } from './components/footer/footer';
import { CONTACT } from './site-data';

@Component({
  selector: 'app-root',
  imports: [Header, Hero, About, HallOfFame, Resources, Contact, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly whatsappLink =
    `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`;
  protected readonly showTop = signal(false);

  @HostListener('window:scroll')
  onScroll() { this.showTop.set(window.scrollY > 900); }

  toTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }
}
