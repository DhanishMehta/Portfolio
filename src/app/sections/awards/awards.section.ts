import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Award {
  title: string;
  issuer: string;
  year: number | null;
}

@Component({
  selector: 'app-awards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './awards.section.html',
  styleUrl: './awards.section.css'
})
export class AwardsSection {
  awards: Award[] = [];
  expanded = false;
  readonly AWARD_LIMIT = 6;

  get visibleAwards() {
    return this.expanded ? this.awards : this.awards.slice(0, this.AWARD_LIMIT);
  }

  toggleExpand() {
    this.expanded = !this.expanded;
  }

  constructor() {
    fetch('assets/data/awards.json')
      .then(res => res.json())
      .then(data => this.awards = data);
  }
}
