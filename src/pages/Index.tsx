import { Suspense, lazy, useEffect, useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Highlights from "@/components/Highlights";
import WhyAttend from "@/components/WhyAttend";
import Sponsors from "@/components/Sponsors";
import FAQSection from "@/components/FAQSection";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import ParallaxSection from "@/components/ParallaxSection";
import PageTransition from "@/components/PageTransition";
import { useIsMobile } from "@/hooks/use-mobile";
import CharacterHeroScene from "@/components/CharacterHeroScene";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, ArrowRight } from "lucide-react";
import CountdownTimer from "@/components/CountdownTimer";

gsap.registerPlugin(ScrollTrigger);

const HomeEffects = lazy(() => import("@/components/HomeEffects"));
const mapEmbedSrc = "https://www.google.com/maps?q=University+of+Engineering+%26+Management,+Kolkata+(UEM)&z=17&output=embed";
const mapHref = "https://www.google.com/maps/place/University+of+Engineering+%26+Management,+Kolkata+(UEM)/@22.5599202,88.4899014,17z/data=!3m1!4b1!4m6!3m5!1s0x3a020b267a3cdc13:0xb3b21d652126f40!8m2!3d22.5599202!4d88.4899014!16s%2Fg%2F11c4pg5gwf?entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D";

const Index = () => {
  const isMobile = useIsMobile();
  const [isLoaded, setIsLoaded] = useState(false);
  const indexRef = useRef<HTMLDivElement>(null);
  const characterScrollProgressRef = useRef(0);

  useEffect(() => {
    const onLoaderComplete = () => setIsLoaded(true);
    window.addEventListener("ignitia:loader-complete", onLoaderComplete);

    // Dynamic fallback safeguard
    const fallbackId = window.setTimeout(() => {
      setIsLoaded(true);
    }, 3000);

    return () => {
      window.removeEventListener("ignitia:loader-complete", onLoaderComplete);
      window.clearTimeout(fallbackId);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create GSAP ScrollTrigger timeline to pin the section and animate overlay texts
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#character-showcase-section",
          start: "top top",
          end: isMobile ? "+=1200" : "+=2000",
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
          onUpdate: (self) => {
            characterScrollProgressRef.current = self.progress;
          },
        },
      });

      // Phase 1: Fade in the About the Fest overlay (character model already visible as bg)
      tl.fromTo(
        "#showcase-overlay-about",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      );
    }, indexRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <PageTransition>
      <div ref={indexRef} className="min-h-screen flex flex-col bg-[#050406] text-white overflow-x-hidden">
        <Suspense fallback={null}>
          {isLoaded && !isMobile && <HomeEffects />}
        </Suspense>
        <ScrollProgress />
        <Navbar />

        <main className="flex-1 relative z-10">
          {/* Handles full 3D interactive zoom with intro.glb */}
          <HeroSection />
          
          {/* Below sections flow up naturally following pin completion */}
          <div className="relative bg-[#050406] z-20">
            {/* Highlights removed */}
            
            {/* Model 2 - Pinned Telemetry Character Hero Showcase Section */}
            <section
              id="character-showcase-section"
              className="relative h-screen w-full bg-[#050406] overflow-hidden"
            >
              {/* Full-bleed 3D Character Canvas */}
              <Suspense fallback={
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050406] z-10">
                  <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4" />
                  <span className="text-xs tracking-widest text-muted-foreground uppercase animate-pulse font-mono">Initializing Telemetry Link...</span>
                </div>
              }>
                <CharacterHeroScene scrollProgressRef={characterScrollProgressRef} />
              </Suspense>

              {/* HUD Frame — corner brackets only */}
              <div className="absolute inset-6 md:inset-10 border border-white/[0.03] pointer-events-none z-20">
                {/* Corner brackets */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-secondary/60" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-secondary/60" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-secondary/60" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-secondary/60" />
              </div>

              {/* Overlay — About Info (Fades in on scroll, character model as bg) */}
              <div
                id="showcase-overlay-about"
                className="absolute inset-0 flex items-center pointer-events-none z-20 opacity-0"
              >
                {/* SVG data connection lines from right edge (character) to the panel */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
                  <line x1="75%" y1="30%" x2="52%" y2="20%" stroke="rgba(168,85,247,0.15)" strokeWidth="1" strokeDasharray="4 6" />
                  <line x1="78%" y1="55%" x2="52%" y2="55%" stroke="rgba(0,255,200,0.1)" strokeWidth="1" strokeDasharray="3 8" />
                  <line x1="72%" y1="75%" x2="52%" y2="80%" stroke="rgba(197,160,89,0.12)" strokeWidth="1" strokeDasharray="4 6" />
                  <circle cx="75%" cy="30%" r="3" fill="rgba(168,85,247,0.3)" />
                  <circle cx="78%" cy="55%" r="3" fill="rgba(0,255,200,0.2)" />
                  <circle cx="72%" cy="75%" r="3" fill="rgba(197,160,89,0.25)" />
                </svg>

                <div className="container mx-auto px-8 md:px-16 lg:px-20 pointer-events-auto">
                  {/* HUD Panel — sharp corners, no border-radius */}
                  <div className="max-w-xl space-y-5 border border-white/10 bg-black/70 backdrop-blur-md p-6 md:p-8 relative"
                    style={{ clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))" }}
                  >
                    {/* Corner brackets */}
                    <div className="absolute top-0 right-0 w-5 h-5 bg-primary/40" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }} />
                    <div className="absolute bottom-0 left-0 w-5 h-5 bg-secondary/40" style={{ clipPath: "polygon(0 0, 0 100%, 100% 100%)" }} />
                    <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-primary/50" />
                    <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-secondary/50" />

                    {/* System label */}
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-ping" />
                      <span className="font-mono text-[9px] tracking-[0.3em] text-neon-cyan/60 uppercase">Fest Diagnostics // System Readout</span>
                    </div>

                    {/* Title */}
                    <div>
                      <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                        About the{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan to-primary">
                          Fest &amp; Initiative
                        </span>
                      </h2>
                    </div>

                    {/* Terminal description */}
                    <p className="font-mono text-xs md:text-sm text-white/50 leading-relaxed border-l-2 border-primary/30 pl-3">
                      <span className="text-primary/60 mr-1">//</span>
                      IGNITIA 2K26 brings together the brightest coders, designers, gamers, and roboticists. A crucible of competitive spirit and technical mastery — 2 days of adrenaline and innovation.
                    </p>

                    {/* Horizontal stat bars */}
                    <div className="space-y-3 pt-1">
                      {[
                        { label: "PRIZE POOL", value: "₹2,00,000+", pct: 90, color: "from-secondary to-yellow-400" },
                        { label: "FOOTFALL",   value: "5000+",      pct: 85, color: "from-primary to-purple-400" },
                        { label: "COLLABORATORS", value: "50+ Colleges", pct: 75, color: "from-neon-cyan to-teal-400" },
                        { label: "ARENAS",     value: "7+",         pct: 55, color: "from-pink-500 to-primary" },
                      ].map(({ label, value, pct, color }) => (
                        <div key={label} className="space-y-1">
                          <div className="flex justify-between items-baseline">
                            <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">{label}</span>
                            <span className="font-mono text-xs font-bold text-white/80">{value}</span>
                          </div>
                          <div className="relative h-[3px] bg-white/[0.06] overflow-hidden">
                            <div
                              className={`absolute inset-y-0 left-0 bg-gradient-to-r ${color}`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-wrap gap-3 pt-2">
                      <a href="#register" className="glow-button flex items-center gap-2 text-xs py-2 px-5">
                        <span>Access Portal</span>
                        <span className="font-mono opacity-70">&gt;&gt;</span>
                      </a>
                      <a href="/events" className="glow-button-secondary border-white/10 text-white hover:border-white/30 text-xs py-2 px-5">
                        Fest Schedule
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </section>

            {/* Removed WhyAttend, FAQ, and Sponsors */}
            
            <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            
            <CTABanner />

            {/* Event Map Location Embed */}
            <section className="section-padding py-16">
              <div className="container mx-auto max-w-5xl px-4">
                <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] h-72 transition-all duration-300 hover:border-primary/30">
                  <iframe
                    src={mapEmbedSrc}
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                    loading="lazy"
                    title="UEM Kolkata Location"
                  />
                  <a
                    href={mapHref}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/60 px-4 py-1 text-xs font-semibold text-white backdrop-blur-md transition-colors hover:bg-primary"
                  >
                    Open Maps
                  </a>
                </div>
              </div>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;