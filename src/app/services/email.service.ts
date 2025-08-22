import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import emailjs from '@emailjs/browser';

interface EmailConfig {
	serviceId: string;
	templateId: string;
	publicKey: string;
	toEmail: string;
}

@Injectable({ providedIn: 'root' })
export class EmailService {
	private http = inject(HttpClient);
	private cachedConfig?: EmailConfig;

	private async loadConfig(): Promise<EmailConfig> {
		if (this.cachedConfig) {
			return this.cachedConfig;
		}
		const config = await this.http.get<EmailConfig>('assets/data/email.json').toPromise();
		if (!config) {
			throw new Error('Email configuration not found at assets/data/email.json');
		}
		this.cachedConfig = config;
		return config;
	}

	async sendContactEmail(params: { name: string; email: string; subject?: string; message: string }): Promise<void> {
		const cfg = await this.loadConfig();
		const templateParams = {
			from_name: params.name,
			from_email: params.email,
			subject: params.subject || 'Portfolio Contact',
			message: params.message,
			to_email: cfg.toEmail
		};
		await emailjs.send(cfg.serviceId, cfg.templateId, templateParams, { publicKey: cfg.publicKey });
	}
}
