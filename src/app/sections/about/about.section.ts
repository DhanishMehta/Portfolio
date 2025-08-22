import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.section.html',
  styleUrl: './about.section.css'
})
export class About {
  highlights = [
    { icon: '📍', label: 'Location', value: 'Hyderabad, India' },
    { icon: '💼', label: 'Experience', value: '2 Years' },
    { icon: '✉️', label: 'Email', value: 'dhanish.workspace@gmail.com' },
    { icon: '📱', label: 'Phone', value: '+91 98360 63063' }
  ];

  summary = 'Full-Stack Engineer with 2 years experience building scalable web apps using Angular, Java, and TypeScript. Focused on clean architecture and performance.';
}
