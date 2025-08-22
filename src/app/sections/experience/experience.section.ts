import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineItem } from '../../components/timeline-item/timeline-item.component';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, TimelineItem],
  templateUrl: './experience.section.html',
  styleUrl: './experience.section.css'
})
export class Experience implements OnInit {
  private dataService = inject(DataService);
  experience: any[] = [];

  isModalOpen = signal(false);
  selectedItem = signal<any | null>(null);

  ngOnInit(): void {
    this.loadExperience();
  }

  onViewDetails(item: any): void {
    this.selectedItem.set(item);
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
    this.selectedItem.set(null);
  }

  private loadExperience(): void {
    this.dataService.getExperience().subscribe({
      next: (data) => {
        this.experience = data;
      },
      error: (error) => {
        console.error('Error loading experience:', error);
        // Fallback to sample data
        this.experience = [
          {
            company: 'Tech Solutions Inc.',
            role: 'Software Engineer',
            duration: '2022 - Present',
            description: 'Developed scalable web applications using Angular and cloud technologies. Led a team of 3 developers and implemented CI/CD pipelines.',
            logo: 'assets/images/tech-solutions-logo.png'
          },
          {
            company: 'Web Innovators',
            role: 'Frontend Developer',
            duration: '2020 - 2022',
            description: 'Built responsive UIs and reusable components for client projects. Collaborated with designers and backend developers.',
            logo: 'assets/images/web-innovators-logo.png'
          }
        ];
      }
    });
  }
}
