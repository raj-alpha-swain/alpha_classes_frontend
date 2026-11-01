import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RevealDirective } from '../../shared/reveal.directive';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { TeacherApplication, TeacherApplicationService } from './teacher-application.service';

const MAX_MB = 5;
const ALLOWED = ['pdf', 'doc', 'docx'];

@Component({
  selector: 'app-join',
  imports: [ReactiveFormsModule, RevealDirective],
  templateUrl: './join.html',
  styleUrl: './join.css'
})
export class Join {
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(TeacherApplicationService);

  protected readonly maxMb = MAX_MB;
  protected readonly resume = signal<File | null>(null);
  protected readonly fileError = signal('');
  protected readonly status = signal<'idle' | 'sending' | 'sent' | 'error'>('idle');
  protected readonly serverError = signal('');

  protected readonly qualificationOptions = [
    'Graduate (B.A. / B.Sc. / B.Com.)', 'Post Graduate (M.A. / M.Sc. / M.Com.)',
    'B.Tech / B.E.', 'M.Tech / M.E.', 'B.Ed. / M.Ed.', 'Ph.D.', 'Other',
  ];

  protected readonly form = this.fb.nonNullable.group({
    fullName: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[+]?[0-9 ]{10,15}$/)]],
    highestQualification: ['', Validators.required],
    otherQualifications: ['', Validators.maxLength(1000)],
    subjects: ['', [Validators.required, Validators.maxLength(200)]],
    classesPreferred: ['', Validators.maxLength(100)],
    experienceYears: [null as number | null, [Validators.min(0), Validators.max(60)]],
    location: ['', Validators.maxLength(100)],
    message: ['', Validators.maxLength(2000)],
  });

  protected readonly dragging = signal(false);
  private readonly value = toSignal(this.form.valueChanges, { initialValue: this.form.getRawValue() });

  /** How much of the required part of the application is filled in (for the progress bar). */
  protected readonly completion = computed(() => {
    const v = this.value();
    const required = ['fullName', 'email', 'phone', 'highestQualification', 'subjects'] as const;
    const done = required.filter(k => this.form.controls[k].valid && String(v[k] ?? '').trim()).length
      + (this.resume() ? 1 : 0);
    return Math.round((done / (required.length + 1)) * 100);
  });

  readonly steps = [
    { n: '01', t: 'Fill in your details', d: 'Qualifications, subjects and experience.' },
    { n: '02', t: 'Upload your resume', d: 'PDF or Word — it goes straight to Prof. Swain.' },
    { n: '03', t: 'Get a call back', d: 'We reach out on WhatsApp or email.' },
  ];

  invalid(name: string) {
    const c = this.form.get(name);
    return !!c && c.invalid && (c.touched || c.dirty);
  }

  onFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!this.handleFile(input.files?.[0] ?? null)) input.value = '';
  }

  onDragOver(e: DragEvent) { e.preventDefault(); this.dragging.set(true); }
  onDragLeave(e: DragEvent) { e.preventDefault(); this.dragging.set(false); }
  onDrop(e: DragEvent) {
    e.preventDefault();
    this.dragging.set(false);
    this.handleFile(e.dataTransfer?.files?.[0] ?? null);
  }

  removeFile(e: Event, input: HTMLInputElement) {
    e.preventDefault();
    e.stopPropagation();
    input.value = '';
    this.resume.set(null);
  }

  /** Returns false if the file was rejected. */
  private handleFile(file: File | null): boolean {
    this.fileError.set('');
    this.resume.set(null);
    if (!file) return true;
    const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
    if (!ALLOWED.includes(ext)) {
      this.fileError.set('Please upload a PDF or Word (.doc / .docx) file.');
      return false;
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      this.fileError.set(`File is too large. Maximum size is ${MAX_MB} MB.`);
      return false;
    }
    this.resume.set(file);
    return true;
  }

  submit() {
    this.form.markAllAsTouched();
    if (!this.resume()) this.fileError.set('Please attach your resume.');
    if (this.form.invalid || !this.resume()) return;

    this.status.set('sending');
    this.serverError.set('');
    this.api.submit(this.form.getRawValue() as TeacherApplication, this.resume()!).subscribe({
      next: () => {
        this.status.set('sent');
        this.form.reset();
        this.resume.set(null);
      },
      error: (err: HttpErrorResponse) => {
        this.status.set('error');
        this.serverError.set(err.error?.message
          ?? 'We could not send your application right now. Please try again, or email your resume to us directly.');
      },
    });
  }

  reset() { this.status.set('idle'); }
}
