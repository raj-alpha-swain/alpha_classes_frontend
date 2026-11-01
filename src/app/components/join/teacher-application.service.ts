import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_BASE_URL } from '../../api.config';

export interface TeacherApplication {
  fullName: string;
  email: string;
  phone: string;
  highestQualification: string;
  otherQualifications: string;
  subjects: string;
  classesPreferred: string;
  experienceYears: number | null;
  location: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class TeacherApplicationService {
  private readonly http = inject(HttpClient);

  submit(data: TeacherApplication, resume: File) {
    const form = new FormData();
    Object.entries(data).forEach(([k, v]) => form.append(k, v == null ? '' : String(v)));
    form.append('resume', resume, resume.name);
    return this.http.post<{ message: string }>(`${API_BASE_URL}/teacher-applications`, form);
  }
}
