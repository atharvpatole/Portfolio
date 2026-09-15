import { About } from '@/components/about/About';
import { Awards } from '@/components/awards/Awards';
import { Experience } from '@/components/experience/Experience';
import { Footer } from '@/components/footer/Footer';
import { Header } from '@/components/header/Header';
import { Nav } from '@/components/nav/Nav';
import { Projects } from '@/components/projects/Projects';
import { Stack } from '@/components/stack/Stack';

export default function Home() {
  return (
    <>
      <Nav />
      <main id="content">
        <Header />
        <About />
        <Stack />
        <Experience />
        <Projects />
        <Awards />
        <Footer />
      </main>
    </>
  );
}
