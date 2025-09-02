import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar.component';
import { Hero } from './sections/hero/hero.section';
import { About } from './sections/about/about.section';
import { Skills } from './sections/skills/skills.section';
import { Projects } from './sections/projects/projects.section';
import { Experience } from './sections/experience/experience.section';
import { Contact } from './sections/contact/contact.section';
import { Footer } from './components/footer/footer.component';
import { AwardsSection } from './sections/awards/awards.section';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Hero, About, Skills, Projects, Experience, AwardsSection, Contact, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Portfolio');
}
