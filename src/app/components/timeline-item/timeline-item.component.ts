import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-timeline-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline-item.component.html',
  styleUrl: './timeline-item.component.css'
})
export class TimelineItem {
  @Input() company: string = '';
  @Input() role: string = '';
  @Input() duration: string = '';
  @Input() description: string = '';
  @Input() logo: string = '';

  @Output() viewDetails = new EventEmitter<any>();

  onClickItem(): void {
    this.viewDetails.emit({
      company: this.company,
      role: this.role,
      duration: this.duration,
      description: this.description,
      logo: this.logo
    });
  }
}
