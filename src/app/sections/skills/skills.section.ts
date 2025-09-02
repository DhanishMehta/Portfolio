import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillBadge } from '../../components/skill-badge/skill-badge.component';
import { SkillCloud } from '../../components/skill-cloud/skill-cloud.component';
import { DataService } from '../../services/data.service';

@Component({
	selector: 'app-skills',
	standalone: true,
	imports: [CommonModule, SkillBadge, SkillCloud],
	templateUrl: './skills.section.html',
	styleUrl: './skills.section.css'
})
export class Skills implements OnInit {
	private dataService = inject(DataService);
	skills: any[] = [];
	viewMode = signal<'grid' | 'cloud'>('grid');
	expanded = false;
	readonly SKILL_LIMIT = 12;

	ngOnInit(): void {
		this.loadSkills();
	}

	toggleView(): void {
		this.viewMode.set(this.viewMode() === 'grid' ? 'cloud' : 'grid');
	}

	private loadSkills(): void {
		this.dataService.getSkills().subscribe({
			next: (data) => {
				this.skills = data;
			},
			error: () => {
				// Fallback to sample data
				this.skills = [
					{ name: 'Angular', icon: 'angular', level: 'Advanced', proficiency: 95 },
					{ name: 'TypeScript', icon: 'typescript', level: 'Advanced', proficiency: 90 },
					{ name: 'JavaScript', icon: 'javascript', level: 'Advanced', proficiency: 92 },
					{ name: 'HTML5', icon: 'html5', level: 'Advanced', proficiency: 88 },
					{ name: 'CSS3', icon: 'css3', level: 'Advanced', proficiency: 85 },
					{ name: 'Tailwind CSS', icon: 'tailwind', level: 'Advanced', proficiency: 88 },
					{ name: 'Node.js', icon: 'nodejs', level: 'Intermediate', proficiency: 75 },
					{ name: 'Express.js', icon: 'express', level: 'Intermediate', proficiency: 72 },
					{ name: 'MongoDB', icon: 'mongodb', level: 'Intermediate', proficiency: 70 },
					{ name: 'PostgreSQL', icon: 'postgresql', level: 'Intermediate', proficiency: 65 },
					{ name: 'Firebase', icon: 'firebase', level: 'Intermediate', proficiency: 68 },
					{ name: 'Git', icon: 'git', level: 'Advanced', proficiency: 85 }
				];
			}
		});
	}

	get visibleSkills() {
		return this.expanded ? this.skills : this.skills.slice(0, this.SKILL_LIMIT);
	}

	toggleExpand() {
		this.expanded = !this.expanded;
	}

	// Color theming for skills (approximate brand colors using Tailwind classes)
	getSkillTheme(nameOrIcon: string): { text: string; hover: string; ring: string; bgTint: string } {
		const key = (nameOrIcon || '').toLowerCase();
		const map: Record<string, { text: string; hover: string; ring: string; bgTint: string }> = {
			angular: { text: 'text-red-600', hover: 'hover:bg-red-50 dark:hover:bg-red-900/20', ring: 'hover:ring-red-300', bgTint: 'bg-red-50 dark:bg-red-900/10' },
			typescript: { text: 'text-blue-600', hover: 'hover:bg-blue-50 dark:hover:bg-blue-900/20', ring: 'hover:ring-blue-300', bgTint: 'bg-blue-50 dark:bg-blue-900/10' },
			javascript: { text: 'text-yellow-600', hover: 'hover:bg-yellow-50 dark:hover:bg-yellow-900/20', ring: 'hover:ring-yellow-300', bgTint: 'bg-yellow-50 dark:bg-yellow-900/10' },
			html5: { text: 'text-orange-600', hover: 'hover:bg-orange-50 dark:hover:bg-orange-900/20', ring: 'hover:ring-orange-300', bgTint: 'bg-orange-50 dark:bg-orange-900/10' },
			css3: { text: 'text-sky-600', hover: 'hover:bg-sky-50 dark:hover:bg-sky-900/20', ring: 'hover:ring-sky-300', bgTint: 'bg-sky-50 dark:bg-sky-900/10' },
			tailwind: { text: 'text-cyan-600', hover: 'hover:bg-cyan-50 dark:hover:bg-cyan-900/20', ring: 'hover:ring-cyan-300', bgTint: 'bg-cyan-50 dark:bg-cyan-900/10' },
			nodejs: { text: 'text-green-600', hover: 'hover:bg-green-50 dark:hover:bg-green-900/20', ring: 'hover:ring-green-300', bgTint: 'bg-green-50 dark:bg-green-900/10' },
			express: { text: 'text-neutral-600', hover: 'hover:bg-neutral-50 dark:hover:bg-neutral-800/40', ring: 'hover:ring-neutral-300', bgTint: 'bg-neutral-50 dark:bg-neutral-800/30' },
			mongodb: { text: 'text-emerald-700', hover: 'hover:bg-emerald-50 dark:hover:bg-emerald-900/20', ring: 'hover:ring-emerald-300', bgTint: 'bg-emerald-50 dark:bg-emerald-900/10' },
			postgresql: { text: 'text-indigo-700', hover: 'hover:bg-indigo-50 dark:hover:bg-indigo-900/20', ring: 'hover:ring-indigo-300', bgTint: 'bg-indigo-50 dark:bg-indigo-900/10' },
			firebase: { text: 'text-amber-600', hover: 'hover:bg-amber-50 dark:hover:bg-amber-900/20', ring: 'hover:ring-amber-300', bgTint: 'bg-amber-50 dark:bg-amber-900/10' },
			git: { text: 'text-orange-600', hover: 'hover:bg-orange-50 dark:hover:bg-orange-900/20', ring: 'hover:ring-orange-300', bgTint: 'bg-orange-50 dark:bg-orange-900/10' },
			docker: { text: 'text-blue-600', hover: 'hover:bg-blue-50 dark:hover:bg-blue-900/20', ring: 'hover:ring-blue-300', bgTint: 'bg-blue-50 dark:bg-blue-900/10' },
			aws: { text: 'text-amber-600', hover: 'hover:bg-amber-50 dark:hover:bg-amber-900/20', ring: 'hover:ring-amber-300', bgTint: 'bg-amber-50 dark:bg-amber-900/10' },
			rxjs: { text: 'text-fuchsia-600', hover: 'hover:bg-fuchsia-50 dark:hover:bg-fuchsia-900/20', ring: 'hover:ring-fuchsia-300', bgTint: 'bg-fuchsia-50 dark:bg-fuchsia-900/10' },
			ngrx: { text: 'text-purple-600', hover: 'hover:bg-purple-50 dark:hover:bg-purple-900/20', ring: 'hover:ring-purple-300', bgTint: 'bg-purple-50 dark:bg-purple-900/10' },
			jest: { text: 'text-rose-600', hover: 'hover:bg-rose-50 dark:hover:bg-rose-900/20', ring: 'hover:ring-rose-300', bgTint: 'bg-rose-50 dark:bg-rose-900/10' },
			cypress: { text: 'text-teal-600', hover: 'hover:bg-teal-50 dark:hover:bg-teal-900/20', ring: 'hover:ring-teal-300', bgTint: 'bg-teal-50 dark:bg-teal-900/10' }
		};
		return map[key] || { text: 'text-blue-600', hover: 'hover:bg-blue-50 dark:hover:bg-blue-900/20', ring: 'hover:ring-blue-300', bgTint: 'bg-blue-50 dark:bg-blue-900/10' };
	}
}
