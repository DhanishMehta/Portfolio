import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getProjects(): Observable<any> {
    return this.http.get('assets/data/projects.json');
  }

  getSkills(): Observable<any> {
    return this.http.get('assets/data/skills.json');
  }

  getExperience(): Observable<any> {
    return this.http.get('assets/data/experience.json');
  }

  getSocials(): Observable<any> {
    return this.http.get('assets/data/socials.json');
  }
}
