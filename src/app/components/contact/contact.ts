import { Component, signal } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';
import { TiltDirective } from '../../shared/tilt.directive';
import { CONTACT } from '../../site-data';

@Component({
  selector: 'app-contact',
  imports: [RevealDirective, TiltDirective],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {
  protected readonly c = CONTACT;
  protected readonly copied = signal(false);
  protected readonly whatsappLink =
    `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`;
  protected readonly gmailLink =
    `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT.email}&su=${encodeURIComponent('Enquiry about Alpha Classes')}`;
  protected readonly mailtoLink = `mailto:${CONTACT.email}?subject=${encodeURIComponent('Enquiry about Alpha Classes')}`;

  async copyEmail() {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch { /* clipboard blocked — the address is still visible */ }
  }
}
