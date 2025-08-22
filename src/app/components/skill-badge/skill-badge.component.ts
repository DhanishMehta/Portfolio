import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skill-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skill-badge.component.html',
  styleUrl: './skill-badge.component.css'
})
export class SkillBadge {
  @Input() name: string = '';
  @Input() icon: string = '';
  @Input() level: string = '';
  @Input() experience: string = '';
  @Input() description: string = '';
  @Input() projects: string[] = [];
  @Input() proficiency: number = 0; // 0-100 for heatmap

  isExpanded = signal(false);

  toggleExpand(): void {
    this.isExpanded.set(!this.isExpanded());
  }

  getProficiencyColor(): string {
    if (this.proficiency >= 80) return 'bg-green-500';
    if (this.proficiency >= 60) return 'bg-blue-500';
    if (this.proficiency >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  }

  getProficiencyWidth(): string {
    return `${this.proficiency}%`;
  }
}
