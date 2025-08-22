import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DownloadService } from '../../services/download.service';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.section.html',
  styleUrl: './contact.section.css'
})
export class Contact {
  private downloadService = inject(DownloadService);
  private emailService = inject(EmailService);
  
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  isSubmitting = signal(false);
  showSuccess = signal(false);
  showError = signal(false);
  errorMessage = signal<string | null>(null);

  downloadResume(): void {
    try {
      this.downloadService.downloadResume();
    } catch (error) {
      console.error('Error downloading resume:', error);
      window.open('assets/data/resume.pdf', '_blank');
    }
  }

  async onSubmit(): Promise<void> {
    if (!this.validateForm()) return;
    this.isSubmitting.set(true);
    this.showSuccess.set(false);
    this.showError.set(false);
    this.errorMessage.set(null);

    try {
      await this.emailService.sendContactEmail({
        name: this.formData.name,
        email: this.formData.email,
        subject: this.formData.subject,
        message: this.formData.message
      });
      this.isSubmitting.set(false);
      this.showSuccess.set(true);
      this.resetForm();
      setTimeout(() => this.showSuccess.set(false), 3000);
    } catch (err: any) {
      console.error('Email send error', err);
      this.isSubmitting.set(false);
      this.errorMessage.set('Failed to send message. Please try again later.');
      this.showError.set(true);
      setTimeout(() => this.showError.set(false), 4000);
    }
  }

  private validateForm(): boolean {
    if (!this.formData.name || !this.formData.email || !this.formData.message) {
      this.showError.set(true);
      this.errorMessage.set('Please fill in all required fields.');
      setTimeout(() => this.showError.set(false), 3000);
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.formData.email)) {
      this.showError.set(true);
      this.errorMessage.set('Please enter a valid email address.');
      setTimeout(() => this.showError.set(false), 3000);
      return false;
    }
    return true;
  }

  private resetForm(): void {
    this.formData = { name: '', email: '', subject: '', message: '' };
  }
}
