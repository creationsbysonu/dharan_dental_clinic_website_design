import { useSmoothScroll, scrollTo } from './hooks/useSmoothScroll';
import Navbar           from './components/Navbar';
import Hero             from './components/Hero';
import TrustBar         from './components/TrustBar';
import StatsCounter     from './components/StatsCounter';
import About            from './components/About';
import HorizontalScroll from './components/HorizontalScroll';
import FlipCards        from './components/FlipCards';
import Notices          from './components/Notices';
import Pricing          from './components/Pricing';
import SmileSlider      from './components/SmileSlider';
import Appointment      from './components/Appointment';
import Branches         from './components/Branches';
import SosButton        from './components/SosButton';
import Footer           from './components/Footer';

export default function App() {
  useSmoothScroll();

  return (
    <>
      <Navbar scrollTo={scrollTo} />
      <main>
        <Hero />
        <TrustBar />
        <StatsCounter />
        <About />
        <HorizontalScroll />
        <FlipCards />
        <Notices />
        <Pricing />
        <SmileSlider />
        <Appointment />
        <Branches />
      </main>
      <Footer />
      <SosButton />
    </>
  );
}
