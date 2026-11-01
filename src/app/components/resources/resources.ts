import { Component, inject, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RevealDirective } from '../../shared/reveal.directive';
import { DEMO_PAPERS, DEMO_VIDEOS, Video } from '../../site-data';

type Tab = 'papers' | 'videos';

@Component({
  selector: 'app-resources',
  imports: [RevealDirective],
  templateUrl: './resources.html',
  styleUrl: './resources.css'
})
export class Resources {
  private readonly sanitizer = inject(DomSanitizer);
  protected readonly papers = DEMO_PAPERS;
  protected readonly videos = DEMO_VIDEOS;
  protected readonly tab = signal<Tab>('papers');
  /** Only the clicked video loads its YouTube player — keeps the page fast. */
  protected readonly playing = signal<string | null>(null);

  select(t: Tab) {
    this.tab.set(t);
    this.playing.set(null);
  }

  thumb(v: Video) { return `https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`; }

  embed(v: Video): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube-nocookie.com/embed/${encodeURIComponent(v.youtubeId)}?autoplay=1&rel=0`);
  }
}
