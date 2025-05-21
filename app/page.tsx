"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDown, ArrowUp, Linkedin, Phone, Mail } from "lucide-react";

// Team types and component from team page
interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
}

const TeamMemberCard: React.FC<TeamMember> = ({
  name,
  role,
  description,
  image,
}) => (
  <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6 p-6">
    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex-shrink-0 border border-gray-200">
      <Image
        src={image}
        alt={name}
        width={128}
        height={128}
        className="object-cover w-full h-full"
        priority
      />
    </div>
    <div className="flex-1">
      <div className="p-0">
        <h3 className="text-2xl font-semibold">{name}</h3>
        <p className="text-base text-gray-600">{role}</p>
      </div>
      <div className="p-0 mt-2">
        <p className="text-base">{description}</p>
      </div>
    </div>
  </div>
);

export default function Home() {
  const homeT = useTranslations("Home");
  const productT = useTranslations("JuridiskDB");
  const securityT = useTranslations("Privacy");
  const teamT = useTranslations("AboutUs");
  const newsT = useTranslations("Updates");
  const t = useTranslations("Contact");
  const navT = useTranslations("Navigation");
  
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentSection, setCurrentSection] = useState("hero");
  const [navVisible, setNavVisible] = useState(true);

  // Team members data
  const teamMembers: TeamMember[] = [
    {
      name: teamT("andreasName"),
      role: teamT("andreasRole"),
      description: teamT("andreasDescription"),
      image:
        "https://utfs.io/f/JqFuZqPU89d1DelZE5OEmNhHV7e80Wd4Xgt2kvq39JAnoxLM",
    },
    {
      name: teamT("brorName"),
      role: teamT("brorRole"),
      description: teamT("brorDescription"),
      image:
        "https://utfs.io/f/JqFuZqPU89d1pfumQEcTFhRnDYmztaWgVOMelr17KuPyqfNZ",
    },
    {
      name: teamT("domantasName"),
      role: teamT("domantasRole"),
      description: teamT("domantasDescription"),
      image:
        "https://utfs.io/f/JqFuZqPU89d1vLLwoHnQPex4qoacVr0KXfFu3wsR9dj8mh5i",
    },
    {
      name: teamT("tamasName"),
      role: teamT("tamasRole"),
      description: teamT("tamasDescription"),
      image:
        "https://utfs.io/f/JqFuZqPU89d1DpLuIHOEmNhHV7e80Wd4Xgt2kvq39JAnoxLM",
    },
  ];

  const handleScroll = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  
  useEffect(() => {
    // Reset scroll position on page load/refresh
    window.scrollTo(0, 0);
    
    const checkScrollPosition = () => {
      // Check if user is near the bottom of the page
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPosition = window.scrollY;
      
      // Show button only when user is at or very near the bottom of the page
      // (within 100px of the bottom)
      const nearBottom = documentHeight - (scrollPosition + windowHeight) < 100;
      setShowScrollTop(nearBottom);

      // Determine current section based on scroll position
      const sections = ["hero", "product", "security", "team", "news", "contact"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2;
        }
        return false;
      }) || "hero";
      
      setCurrentSection(current);
    };
    
    window.addEventListener("scroll", checkScrollPosition);

    // Intersection Observer for nav visibility
    const nav = document.getElementById("main-nav");
    const navMobile = document.getElementById("main-nav-mobile");
    let observer: IntersectionObserver | null = null;
    let observerMobile: IntersectionObserver | null = null;

    if (nav) {
      observer = new window.IntersectionObserver(
        ([entry]) => setNavVisible(entry.isIntersecting),
        { threshold: 0.01 }
      );
      observer.observe(nav);
    }
    if (navMobile) {
      observerMobile = new window.IntersectionObserver(
        ([entry]) => setNavVisible(entry.isIntersecting),
        { threshold: 0.01 }
      );
      observerMobile.observe(navMobile);
    }

    return () => {
      window.removeEventListener("scroll", checkScrollPosition);
      if (observer && nav) observer.unobserve(nav);
      if (observerMobile && navMobile) observerMobile.unobserve(navMobile);
    };
  }, []);

  return (
    <main className="flex flex-col items-center bg-white text-black">
      {/* Hero Section */}
      <section id="hero" className="w-full min-h-screen flex flex-col items-center justify-center py-24 px-4 relative">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 text-black">
            {homeT("servanda")}
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-gray-700">
            {homeT("servandaMotto")}
          </p>
        </div>
      </section>

      {/* Product Section */}
      <section id="product" className="w-full min-h-screen flex flex-col py-24 px-4 md:px-10 relative">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="w-full text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-black">
              {productT("title")}
            </h2>
            <p className="text-xl md:text-2xl text-gray-700">
              {productT("subtitle")}
            </p>
          </motion.div>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="border border-gray-200 rounded-lg p-6 bg-white text-black">
              <p className="text-lg mb-4">{productT("overview")}</p>
              <p className="text-lg">{productT("purpose")}</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 bg-white text-black">
              <h3 className="text-2xl font-bold mb-4">
                {productT("uniqueAccessTitle")}
              </h3>
              <p className="text-lg mb-4">{productT("uniqueAccessContent")}</p>
              <ul className="list-disc pl-6 space-y-2">
                <li className="text-lg">{productT("bulletPoint1")}</li>
                <li className="text-lg">{productT("bulletPoint2")}</li>
                <li className="text-lg">{productT("bulletPoint3")}</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 bg-white text-black">
              <h3 className="text-2xl font-bold mb-4">
                {productT("securityTitle")}
              </h3>
              <p className="text-lg mb-4">{productT("securityIntro")}</p>
              <ul className="list-disc pl-6 space-y-2">
                <li className="text-lg">{productT("securityPoint1")}</li>
                <li className="text-lg">{productT("securityPoint2")}</li>
                <li className="text-lg">{productT("securityPoint3")}</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 bg-white text-black">
              <p className="text-lg font-medium">{productT("conclusion")}</p>
            </div>
          </motion.div>
        </div>
        
        <button 
          onClick={() => handleScroll("security")}
          className="absolute bottom-8 right-8 cursor-pointer hidden md:block"
          aria-label="Scroll to security section"
        >
          <ArrowDown size={32} className="text-black" />
        </button>
      </section>

      {/* Security Section */}
      <section id="security" className="w-full min-h-screen flex flex-col py-24 px-4 md:px-10 relative">
        <div className="max-w-7xl mx-auto w-full h-full flex flex-col">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-black">
              {securityT("title")}
            </h2>
          </motion.div>
          
          <motion.div
            className="w-full flex-1 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="border border-gray-200 rounded-lg p-6 bg-white text-black">
              <h3 className="text-2xl font-semibold mb-4">
                {securityT("tabs.general")}
              </h3>
              <p className="text-lg mb-6">{securityT("general.intro")}</p>
              <div className="space-y-4">
                <h4 className="text-xl font-semibold">
                  {securityT("general.userData")}
                </h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li className="text-lg">{securityT("general.userDataPoint1")}</li>
                  <li className="text-lg">{securityT("general.userDataPoint2")}</li>
                </ul>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 bg-white text-black">
              <h3 className="text-2xl font-semibold mb-4">
                {securityT("tabs.juridisk-db")}
              </h3>
              <div className="space-y-4">
                <h4 className="text-xl font-semibold">
                  {securityT("juridisk-db.databaseSecurity")}
                </h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li className="text-lg">
                    {securityT("juridisk-db.securityPoint1")}
                  </li>
                  <li className="text-lg">
                    {securityT("juridisk-db.securityPoint2")}
                  </li>
                  <li className="text-lg">
                    {securityT("juridisk-db.securityPoint3")}
                  </li>
                  <li className="text-lg">
                    {securityT("juridisk-db.securityPoint4")}
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
        
        <button 
          onClick={() => handleScroll("team")}
          className="absolute bottom-8 right-8 cursor-pointer hidden md:block"
          aria-label="Scroll to team section"
        >
          <ArrowDown size={32} className="text-black" />
        </button>
      </section>

      {/* Team Section */}
      <section id="team" className="w-full min-h-screen flex flex-col py-24 px-4 md:px-10 relative">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-black">
              {teamT("aboutUs")}
            </h2>
          </motion.div>
          
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Tabs defaultValue="team" className="w-full">
              <TabsList className="grid w-full grid-cols-2 h-20 rounded-t-lg bg-gray-100">
                <TabsTrigger
                  value="team"
                  className="text-lg font-semibold py-6 text-black"
                >
                  {teamT("ourTeam")}
                </TabsTrigger>
                <TabsTrigger
                  value="purpose-values"
                  className="text-lg font-semibold py-6 text-black"
                >
                  {teamT("ourPurposeAndValues")}
                </TabsTrigger>
              </TabsList>
              
              <div className="border border-gray-200 border-t-0 rounded-b-lg bg-white">
                <TabsContent
                  value="team"
                  className="mt-0 p-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black">
                    {teamMembers.map((member, index) => (
                      <TeamMemberCard key={index} {...member} />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent
                  value="purpose-values"
                  className="mt-0 p-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-gray-200 rounded-lg p-6 text-black">
                      <h3 className="text-2xl font-bold mb-3">
                        {teamT("ourPurpose")}
                      </h3>
                      <p className="text-base mb-6">{teamT("purposeOverview")}</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-6 text-black">
                      <h3 className="text-2xl font-bold mb-3">
                        {teamT("ourValues")}
                      </h3>
                      <p className="text-base">{teamT("valuesOverview")}</p>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </motion.div>
        </div>
        
        <button 
          onClick={() => handleScroll("news")}
          className="absolute bottom-8 right-8 cursor-pointer hidden md:block"
          aria-label="Scroll to news section"
        >
          <ArrowDown size={32} className="text-black" />
        </button>
      </section>

      {/* News Section */}
      <section id="news" className="w-full min-h-screen flex flex-col py-24 px-4 md:px-10 relative">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-black">
              {newsT("productUpdates")}
            </h2>
          </motion.div>
          
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="p-6 border border-gray-200 rounded-lg bg-white max-w-2xl">
              <h3 className="text-2xl font-bold mb-4 text-black">
                {newsT("update1title")}
              </h3>
              <div className="space-y-4">
                <p className="text-lg sm:text-xl leading-relaxed text-black">
                  {newsT("update1paragraph1")}
                </p>
                <p className="text-lg sm:text-xl leading-relaxed text-black">
                  {newsT("update1paragraph2")}
                </p>
                <p className="text-lg sm:text-xl leading-relaxed text-black">
                  {newsT("update1paragraph3")}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
        
        {currentSection === "news" && (
          <button 
            onClick={() => handleScroll("contact")}
            className="absolute bottom-8 right-8 cursor-pointer hidden md:block"
            aria-label="Scroll to contact section"
          >
            <ArrowDown size={32} className="text-black" />
          </button>
        )}
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full min-h-[70vh] flex flex-col py-24 px-4 md:px-10 z-20 relative">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-black">
              {navT("contact")}
            </h2>
          </motion.div>
          
          <motion.div
            className="w-full flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="border border-gray-300 rounded-2xl bg-gray-50 p-6 flex flex-col md:flex-row gap-6 items-center justify-center w-full max-w-xl">
              <div className="flex flex-col items-center gap-1">
                <div className="bg-white p-3 rounded-full">
                  <Linkedin className="h-6 w-6 text-black" />
                </div>
                <a 
                  href="https://www.linkedin.com/company/servanda-as/posts/?feedView=all"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-lg hover:underline text-black"
                >
                  Servanda AS
                </a>
              </div>
              
              <div className="flex flex-col items-center gap-1">
                <div className="bg-white p-3 rounded-full">
                  <Mail className="h-6 w-6 text-black" />
                </div>
                <a 
                  href={`mailto:${t("emailAddress")}`}
                  className="text-lg hover:underline text-black"
                >
                  {t("emailAddress")}
                </a>
              </div>
              
              <div className="flex flex-col items-center gap-1">
                <div className="bg-white p-3 rounded-full">
                  <Phone className="h-6 w-6 text-black" />
                </div>
                <a 
                  href={`tel:${t("phoneNr")}`}
                  className="text-lg hover:underline text-black"
                >
                  {t("phoneNr")}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            className="fixed bottom-24 md:bottom-20 right-8 bg-white p-3 rounded-full shadow-md cursor-pointer z-50"
            aria-label="Scroll to top"
          >
            <ArrowUp size={28} className="text-black" />
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
}

// Hexagon item for team member
interface HexItemProps {
  member: TeamMember;
  hexPos: number;
}
function HexItem({ member, hexPos }: HexItemProps) {
  // Hexagon positions (clockwise from top, 0-5)
  const positions = [
    { left: '50%', top: '0%', translate: '-50%, 0%' }, // top
    { left: '100%', top: '25%', translate: '-100%, -50%' }, // top right
    { left: '100%', top: '75%', translate: '-100%, -50%' }, // bottom right
    { left: '50%', top: '100%', translate: '-50%, -100%' }, // bottom
    { left: '0%', top: '75%', translate: '0%, -50%' }, // bottom left
    { left: '0%', top: '25%', translate: '0%, -50%' }, // top left
  ];
  const pos = positions[hexPos];
  const [hover, setHover] = React.useState(false);
  return (
    <div
      className="absolute flex flex-col items-center justify-center cursor-pointer transition-transform duration-300"
      style={{ left: pos.left, top: pos.top, transform: `translate(${pos.translate})` }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      tabIndex={0}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      <div className={`rounded-full overflow-hidden border-4 border-gray-200 shadow-lg w-32 h-32 md:w-40 md:h-40 bg-white transition-all duration-300 ${hover ? 'scale-110 z-10' : ''}`}
        style={{ position: 'relative' }}
      >
        <Image src={member.image} alt={member.name} width={128} height={128} className="object-cover w-full h-full" />
        {hover && (
          <PopoutBox hexPos={hexPos} name={member.name} role={member.role} description={member.description} />
        )}
      </div>
    </div>
  );
}

// Hexagon item for icon (purpose/values)
interface HexIconItemProps {
  type: string;
  title: string;
  text: string;
}
function HexIconItem({ type, title, text }: HexIconItemProps) {
  // Hexagon positions (clockwise from top, 0-5)
  const positions = [
    { left: '50%', top: '0%', translate: '-50%, 0%' }, // top
    { left: '100%', top: '25%', translate: '-100%, -50%' }, // top right
    { left: '100%', top: '75%', translate: '-100%, -50%' }, // bottom right
    { left: '50%', top: '100%', translate: '-50%, -100%' }, // bottom
    { left: '0%', top: '75%', translate: '0%, -50%' }, // bottom left
    { left: '0%', top: '25%', translate: '0%, -50%' }, // top left
  ];
  const pos = positions[type === 'purpose' ? 1 : 4];
  const [hover, setHover] = React.useState(false);
  return (
    <div
      className="absolute flex flex-col items-center justify-center cursor-pointer transition-transform duration-300"
      style={{ left: pos.left, top: pos.top, transform: `translate(${pos.translate})` }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      tabIndex={0}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      <div className={`rounded-full bg-gradient-to-br ${type === 'purpose' ? 'from-blue-400 to-blue-600' : 'from-orange-400 to-yellow-400'} flex items-center justify-center w-32 h-32 md:w-40 md:h-40 shadow-lg transition-all duration-300 ${hover ? 'scale-110 z-10' : ''}`}
        style={{ position: 'relative' }}
      >
        {type === 'purpose' ? (
          <svg width="36" height="36" fill="none" viewBox="0 0 36 36"><circle cx="18" cy="18" r="16" stroke="#fff" strokeWidth="4" /><path d="M18 10v8l6 4" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
        ) : (
          <svg width="36" height="36" fill="none" viewBox="0 0 36 36"><path d="M18 32s-9-7.5-9-13.5A6 6 0 0 1 18 12a6 6 0 0 1 9 6.5C27 24.5 18 32 18 32Z" stroke="#fff" strokeWidth="3" fill="none"/></svg>
        )}
        {hover && (
          <div className="absolute inset-0 bg-white bg-opacity-95 flex flex-col items-center justify-center p-4 z-20 rounded-full shadow-xl">
            <h3 className="text-lg font-bold mb-1 text-black text-center whitespace-normal break-words">{title}</h3>
            <p className="text-xs text-black text-center whitespace-normal break-words">{text}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Popout box for team member description
interface PopoutBoxProps {
  hexPos: number;
  name: string;
  role: string;
  description: string;
}
function PopoutBox({ hexPos, name, role, description }: PopoutBoxProps) {
  // Directions for popout based on hex position (0,2,3,5)
  // 0: top, 2: right, 3: bottom, 5: left
  const directions: Record<number, any> = {
    0: { justify: 'items-center', top: '-80px', left: '50%', translate: '-50%, -100%', arrow: 'down' }, // top
    2: { justify: 'items-start', top: '50%', left: 'calc(100% + 16px)', translate: '0, -50%', arrow: 'left' }, // right
    3: { justify: 'items-center', top: 'calc(100% + 16px)', left: '50%', translate: '-50%, 0', arrow: 'up' }, // bottom
    5: { justify: 'items-end', top: '50%', left: '-16px', translate: '-100%, -50%', arrow: 'right' }, // left
  };
  const pos = directions[hexPos];
  return (
    <div
      className={`absolute z-30 w-[220px] md:w-[300px] bg-white bg-opacity-95 rounded-xl shadow-2xl p-4 border border-gray-200 flex flex-col items-center whitespace-normal break-words ${pos.justify}`}
      style={{ top: pos.top, left: pos.left, transform: `translate(${pos.translate})` }}
    >
      {/* Arrow */}
      <div className="absolute" style={{
        left: pos.arrow === 'down' || pos.arrow === 'up' ? '50%' : pos.arrow === 'left' ? '-12px' : 'auto',
        right: pos.arrow === 'right' ? '-12px' : 'auto',
        top: pos.arrow === 'down' ? '100%' : pos.arrow === 'up' ? '-12px' : pos.arrow === 'left' || pos.arrow === 'right' ? '50%' : 'auto',
        transform: pos.arrow === 'down' ? 'translateX(-50%)' : pos.arrow === 'up' ? 'translateX(-50%)' : 'translateY(-50%)',
      }}>
        <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          {pos.arrow === 'down' && <polygon points="12,0 24,12 0,12" fill="#fff" stroke="#e5e7eb" strokeWidth="1" />}
          {pos.arrow === 'up' && <polygon points="0,0 24,0 12,12" fill="#fff" stroke="#e5e7eb" strokeWidth="1" />}
          {pos.arrow === 'left' && <polygon points="0,6 12,0 12,12" fill="#fff" stroke="#e5e7eb" strokeWidth="1" />}
          {pos.arrow === 'right' && <polygon points="12,0 24,6 12,12" fill="#fff" stroke="#e5e7eb" strokeWidth="1" />}
        </svg>
      </div>
      <h3 className="text-lg font-bold mb-1 text-black text-center whitespace-normal break-words">{name}</h3>
      <p className="text-xs text-gray-600 mb-1 text-center whitespace-normal break-words">{role}</p>
      <p className="text-xs text-black text-center whitespace-normal break-words">{description}</p>
    </div>
  );
}
