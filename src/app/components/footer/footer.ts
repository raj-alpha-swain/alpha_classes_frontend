import { Component } from '@angular/core';
import { CONTACT, OWNER } from '../../site-data';

@Component({
  selector: 'app-footer',
  template: `
    <footer>
      <svg class="wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,40 C240,90 480,0 720,30 C960,60 1200,10 1440,40 L1440,80 L0,80 Z" />
      </svg>
      <div class="container inner">
        <div class="brand"><span class="mark"><img src="logo.svg" alt="" /></span> Alpha Classes</div>
        <p class="tag">Coaching classes &amp; home tuition by {{ owner.name }}</p>
        <nav>
          <a href="#about">About</a><a href="#hall-of-fame">Hall of Fame</a>
          <a href="#resources">Papers & Videos</a><a href="#contact">Contact</a>
        </nav>
        <p class="links">
          <a [href]="'mailto:' + c.email">{{ c.email }}</a>
          <span>·</span>
          <a [href]="'https://wa.me/' + c.whatsapp" target="_blank" rel="noopener">{{ c.whatsappDisplay }}</a>
        </p>
        <small>© {{ year }} Alpha Classes. All rights reserved.</small>
      </div>
    </footer>
  `,
  styles: `
    footer { position: relative; background: var(--ink); color: rgba(255,255,255,.75); padding: 40px 0 96px; margin-top: 60px; }
    .wave { position: absolute; left: 0; top: -59px; width: 100%; height: 60px; fill: var(--ink); }
    .inner { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 6px; }
    .brand { display: flex; align-items: center; gap: 12px; font: 700 1.5rem var(--display); color: #fff; }
    .mark { width: 44px; height: 44px; border-radius: 12px; display: grid; place-items: center; background: #fff; }
    .mark img { width: 34px; height: 34px; display: block; }
    .tag { margin: 0 0 14px; }
    nav { display: flex; flex-wrap: wrap; justify-content: center; gap: 4px 22px; margin-bottom: 14px; }
    nav a { color: #fff; text-decoration: none; font-weight: 600; font-size: .92rem; opacity: .8; transition: opacity .2s, color .2s; }
    nav a:hover { opacity: 1; color: var(--saffron-2); }
    .links { display: flex; flex-wrap: wrap; justify-content: center; gap: 4px 10px; margin: 0; }
    .links a { color: var(--saffron-2); text-decoration: none; }
    small { margin-top: 18px; opacity: .55; }
  `
})
export class Footer {
  protected readonly c = CONTACT;
  protected readonly owner = OWNER;
  protected readonly year = new Date().getFullYear();
}
