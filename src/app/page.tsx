import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import BentoSection from '@/components/sections/BentoSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import HumanSection from '@/components/sections/HumanSection';
import AiDnaSection from '@/components/sections/AiDnaSection';
import ContactSection from '@/components/sections/ContactSection';
import AskDhanish from '@/components/chat/AskDhanish';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <BentoSection />
        <ProjectsSection />
        <ExperienceSection />
        <HumanSection />
        <AiDnaSection />
        <ContactSection />
      </main>
      <Footer />
      <AskDhanish />
    </>
  );
}
