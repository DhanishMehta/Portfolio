import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCard } from '../../components/project-card/project-card.component';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectCard],
  templateUrl: './projects.section.html',
  styleUrl: './projects.section.css'
})
export class Projects implements OnInit {
  private dataService = inject(DataService);
  projects: any[] = [];

  isModalOpen = signal(false);
  selectedProject = signal<any | null>(null);

  ngOnInit(): void {
    this.loadProjects();
  }

  onViewDetails(project: any): void {
    this.selectedProject.set(project);
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
    this.selectedProject.set(null);
  }

  private loadProjects(): void {
    this.dataService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
      },
      error: (error) => {
        console.error('Error loading projects:', error);
        // Fallback to sample data aligned with new schema
        this.projects = [
          {
            title: 'Personal Portfolio',
            shortDescription: 'A modern, responsive portfolio built with Angular and Tailwind CSS.',
            longDescription: 'A production-ready personal portfolio with dark/light theme, responsive sections, JSON-driven content, animations, and Netlify/GitHub Pages deployment.',
            image: 'assets/images/portfolio.png',
            tech: ['Angular', 'Tailwind CSS', 'TypeScript'],
            github: 'https://github.com/yourusername/portfolio',
            demo: 'https://your-portfolio-demo.com'
          }
        ];
      }
    });
  }
}
