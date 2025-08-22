import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownloadService } from '../../services/download.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.section.html',
  styleUrl: './hero.section.css'
})
export class Hero {
  private downloadService = inject(DownloadService);
  
  name = 'Dhanish Mehta';
  title = 'Full-Stack Engineer';
  tagline = 'Building scalable, performance-driven web apps with Angular, Java, and TypeScript.';
  
  downloadResume(): void {
    try {
      this.downloadService.downloadResume();
    } catch (error) {
      console.error('Error downloading resume:', error);
      // Fallback: open in new tab if download fails
      window.open('assets/data/resume.pdf', '_blank');
    }
  }

  scrollToContact(): void {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
