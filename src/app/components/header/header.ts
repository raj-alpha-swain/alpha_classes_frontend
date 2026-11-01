import { Component, DestroyRef, HostListener, afterNextRender, inject, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  protected readonly menuOpen = signal(false);
  protected readonly scrolled = signal(false);
  protected readonly progress = signal(0);
  protected readonly active = signal('');
  protected readonly links = [
    { id: 'about', label: 'About' },
    { id: 'hall-of-fame', label: 'Hall of Fame' },
    { id: 'resources', label: 'Papers & Videos' },
    { id: 'contact', label: 'Contact' },
  ];

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      this.onScroll();
      // Highlight the nav link of the section currently on screen
      const io = new IntersectionObserver(entries => {
        for (const e of entries) if (e.isIntersecting) this.active.set(e.target.id);
      }, { rootMargin: '-45% 0px -50% 0px' });
      this.links.forEach(l => { const s = document.getElementById(l.id); if (s) io.observe(s); });
      destroyRef.onDestroy(() => io.disconnect());
    });
  }

  @HostListener('window:scroll')
  onScroll() {
    const y = window.scrollY;
    this.scrolled.set(y > 24);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    this.progress.set(max > 0 ? (y / max) * 100 : 0);
    if (y < 200) this.active.set('');
  }

  toggle() {
    this.menuOpen.update(v => !v);
    document.body.style.overflow = this.menuOpen() ? 'hidden' : '';
  }
  close() {
    this.menuOpen.set(false);
    document.body.style.overflow = '';
  }
}
