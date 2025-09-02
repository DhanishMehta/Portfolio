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
    { icon: '📱', label: 'Phone', value: '+91 7893357319' }
  ];

  summary = "I'm a solutions and problem-solving specialist with a passion for delivering results across full stack, frontend, backend, design, graphic design, automation, scripting, and more. I thrive on tackling complex challenges and building scalable, reliable, and creative solutions for any need.";
}
