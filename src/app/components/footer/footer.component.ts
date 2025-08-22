import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class Footer implements OnInit {
  private dataService = inject(DataService);
  socials: any[] = [];
  currentYear = new Date().getFullYear();

  ngOnInit(): void {
    this.loadSocials();
  }

  private loadSocials(): void {
    this.dataService.getSocials().subscribe({
      next: (data) => {
        this.socials = data;
      },
      error: (error) => {
        console.error('Error loading socials:', error);
        // Fallback to sample data
        this.socials = [
          { name: 'LinkedIn', icon: 'linkedin', url: 'https://linkedin.com/in/yourusername' },
          { name: 'GitHub', icon: 'github', url: 'https://github.com/yourusername' },
          { name: 'Email', icon: 'mail', url: 'mailto:your@email.com' }
        ];
      }
    });
  }
}
