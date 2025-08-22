# Personal Portfolio Website

A modern, responsive personal portfolio website built with Angular and Tailwind CSS.

## 🚀 Features

- **Modern Design**: Clean, minimalistic design with dark/light mode toggle
- **Responsive**: Fully responsive across mobile, tablet, and desktop
- **JSON-Driven Content**: Easy to update projects, skills, and experience via JSON files
- **Smooth Navigation**: Anchor-based navigation with smooth scrolling
- **Standalone Components**: Built with Angular's latest standalone component architecture
- **TypeScript**: Full TypeScript support with strict mode enabled

## 🛠️ Tech Stack

- **Framework**: Angular (latest version)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Architecture**: Standalone Components
- **State Management**: Angular Signals
- **HTTP Client**: Angular HttpClient

## 📁 Project Structure

```
src/
├── app/
│   ├── components/          # Reusable components
│   │   ├── navbar/         # Navigation bar
│   │   ├── footer/         # Footer component
│   │   ├── project-card/   # Project display card
│   │   ├── skill-badge/    # Skill display badge
│   │   ├── timeline-item/  # Experience timeline item
│   │   └── dark-mode-toggle/ # Theme toggle
│   ├── sections/           # Main page sections
│   │   ├── hero/          # Introduction section
│   │   ├── about/         # About me section
│   │   ├── skills/        # Skills & technologies
│   │   ├── projects/      # Featured projects
│   │   ├── experience/    # Work experience
│   │   └── contact/       # Contact form
│   └── services/          # Angular services
│       ├── data.service.ts # JSON data loading
│       └── theme.service.ts # Dark/light mode
├── assets/
│   └── data/              # JSON data files
│       ├── projects.json  # Project information
│       ├── skills.json    # Skills & technologies
│       ├── experience.json # Work experience
│       └── socials.json   # Social media links
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
ng serve
```

4. Open your browser and navigate to `http://localhost:4200`

## 📝 Customization

### Updating Content

All dynamic content is stored in JSON files under `src/assets/data/`:

- **projects.json**: Add your projects with title, description, tech stack, and links
- **skills.json**: Update your skills and proficiency levels
- **experience.json**: Add your work experience and achievements
- **socials.json**: Update your social media links

### Personal Information

Update the following files with your information:

- `src/app/sections/hero/hero.ts`: Your name, title, and tagline
- `src/app/sections/about/about.ts`: Your personal highlights
- `src/app/components/footer/footer.html`: Your name in copyright

### Styling

The project uses Tailwind CSS for styling. You can customize:

- Colors and themes in `tailwind.config.js`
- Global styles in `src/styles.css`
- Component-specific styles in individual `.css` files

## 🎨 Design Features

- **Dark/Light Mode**: Toggle between themes with localStorage persistence
- **Responsive Grid**: Adaptive layouts for different screen sizes
- **Smooth Animations**: Hover effects and transitions
- **Modern UI**: Clean typography and spacing
- **Accessibility**: ARIA labels and semantic HTML

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints for:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🚀 Deployment

### Netlify

1. Build the project:
```bash
ng build
```

2. Deploy the `dist/` folder to Netlify

### GitHub Pages

1. Install gh-pages:
```bash
npm install -g gh-pages
```

2. Build and deploy:
```bash
ng build --base-href "https://yourusername.github.io/portfolio/"
gh-pages -d dist
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Angular](https://angular.io/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Heroicons](https://heroicons.com/)

---

**Happy coding! 🎉**
