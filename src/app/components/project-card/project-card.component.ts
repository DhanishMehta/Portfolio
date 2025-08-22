import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css'
})
export class ProjectCard {
  @Input() title: string = '';
  @Input() shortDescription: string = '';
  @Input() longDescription: string = '';
  @Input() image: string = '';
  @Input() tech: string[] = [];
  @Input() github: string = '';
  @Input() demo: string = '';

  @Output() viewDetails = new EventEmitter<any>();

  onClickCard(): void {
    this.viewDetails.emit({
      title: this.title,
      shortDescription: this.shortDescription,
      longDescription: this.longDescription,
      image: this.image,
      tech: this.tech,
      github: this.github,
      demo: this.demo
    });
  }
}
