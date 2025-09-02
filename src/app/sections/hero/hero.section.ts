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
  roles = [
    'Full Stack Engineer',
    'Frontend Engineer',
    'Certified Angular Developer',
    'Solutions Expert',
    'Graphic Designer',
    'Integration Engineer',
    'Architect',
    'Prompt Engineer'
  ];
  currentRole = '';
  private roleIndex = 0;
  private charIndex = 0;
  private typingForward = true;
  private pauseTimeout: any;

  constructor() {
    this.startTypewriter();
  }

  private startTypewriter() {
    setTimeout(() => this.typewriterStep(), 500);
  }

  private typewriterStep() {
    const role = this.roles[this.roleIndex];
    if (this.typingForward) {
      this.charIndex++;
      this.currentRole = role.substring(0, this.charIndex);
      if (this.charIndex === role.length) {
        this.typingForward = false;
        this.pauseTimeout = setTimeout(() => this.typewriterStep(), 1200); // Delay before erasing
        return;
      }
    } else {
      this.charIndex--;
      this.currentRole = role.substring(0, this.charIndex);
      if (this.charIndex === 0) {
        this.typingForward = true;
        this.roleIndex = (this.roleIndex + 1) % this.roles.length;
      }
    }
    setTimeout(() => this.typewriterStep(), 100);
  }
  
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
