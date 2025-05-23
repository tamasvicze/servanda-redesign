"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDown, ArrowUp, Linkedin, Phone, Mail, ChevronLeft, ChevronRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

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
  <div className="flex flex-row items-start space-x-6 p-4 border-b border-gray-200 last:border-b-0">
    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex-shrink-0 border border-gray-200 bg-gray-200">
      <Image
        src={image}
        alt={name}
        width={128}
        height={128}
        className={`object-cover w-full h-full ${
          name === "Bror Dahle" 
            ? "scale-125 translate-y-3" 
            : name === "Domantas Sakalys" || name === "Andreas Massey"
            ? "translate-y-1"
            : ""
        }`}
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
  const [activeVersion, setActiveVersion] = useState(1); // Start with Version 1 (current) focused

  // Team members data
  const teamMembers: TeamMember[] = [
    {
      name: teamT("andreasName"),
      role: teamT("andreasRole"),
      description: teamT("andreasDescription"),
      image: "/images/andreas-transparent.png",
    },
    {
      name: teamT("brorName"),
      role: teamT("brorRole"),
      description: teamT("brorDescription"),
      image: "/images/bror-transparent.png",
    },
    {
      name: teamT("domantasName"),
      role: teamT("domantasRole"),
      description: teamT("domantasDescription"),
      image: "/images/domantas-transparent.png",
    },
    {
      name: teamT("tamasName"),
      role: teamT("tamasRole"),
      description: teamT("tamasDescription"),
      image: "/images/tamas-transparent.png",
    },
    {
      name: teamT("jonasName"),
      role: teamT("jonasRole"),
      description: teamT("jonasDescription"),
      image: "/images/jonas-transparent.png",
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

    // Center the news section on initial load
    const newsSection = document.getElementById('news');
    if (newsSection) {
      const scrollContainer = newsSection.querySelector('.overflow-x-auto');
      if (scrollContainer) {
        // Center the container on Version 1 (current)
        const containerWidth = scrollContainer.clientWidth;
        const itemWidth = window.innerWidth >= 768 ? containerWidth * 0.45 : containerWidth * 0.9;
        const gap = 32; // 8 * 4 (gap-8 in Tailwind)
        const totalWidth = itemWidth + gap;
        
        // Calculate the exact position to center Version 1
        // We want to position Version 1 in the center, so we need to scroll by one full item width plus gap
        const scrollPosition = itemWidth + gap;
        
        // Apply the scroll position
        scrollContainer.scrollLeft = scrollPosition;
        
        // Ensure Version 1 is focused after scrolling
        setTimeout(() => {
          setActiveVersion(1);
        }, 100);
      }
    }

    // Add scroll event listener for version boxes
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      const scrollLeft = target.scrollLeft;
      const containerWidth = target.clientWidth;
      const itemWidth = window.innerWidth >= 768 
        ? containerWidth * 0.45  // 45% of container width on desktop
        : containerWidth * 0.9;  // 90% of container width on mobile
      const gap = 32; // 8 * 4 (gap-8 in Tailwind)
      const totalWidth = itemWidth + gap;
      
      // Calculate which version is currently centered
      const centerPosition = scrollLeft + containerWidth / 2;
      const version = Math.round(centerPosition / totalWidth);
      setActiveVersion(Math.max(0, Math.min(2, version))); // Clamp between 0 and 2
    };

    const scrollContainer = document.querySelector('.overflow-x-auto');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", checkScrollPosition);
      if (observer && nav) observer.unobserve(nav);
      if (observerMobile && navMobile) observerMobile.unobserve(navMobile);
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Add intersection observer to handle section visibility
  useEffect(() => {
    const newsSection = document.getElementById('news');
    if (newsSection) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // When news section becomes visible, center Version 1
              const scrollContainer = entry.target.querySelector('.overflow-x-auto');
              if (scrollContainer) {
                const containerWidth = scrollContainer.clientWidth;
                const itemWidth = window.innerWidth >= 768 ? containerWidth * 0.45 : containerWidth * 0.9;
                const gap = 32;
                const scrollPosition = itemWidth + gap;
                scrollContainer.scrollLeft = scrollPosition;
                setActiveVersion(1);
              }
            }
          });
        },
        { threshold: 0.5 } // Trigger when section is 50% visible
      );

      observer.observe(newsSection);

      return () => {
        observer.unobserve(newsSection);
      };
    }
  }, []);

  const handleVersionChange = (version: number) => {
    setActiveVersion(version);
  };

  return (
    <main className="flex flex-col items-center bg-white text-black">
      {/* Hero Section */}
      <section id="hero" className="w-full min-h-screen flex flex-col items-center justify-center py-12 px-4 relative">
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
      <section id="team" className="w-full min-h-screen flex flex-col py-12 px-4 md:px-10 relative">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            className="text-center mb-8"
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
              <TabsList className="grid w-full grid-cols-2 h-16 rounded-t-lg bg-gray-100">
                <TabsTrigger
                  value="team"
                  className="text-lg font-semibold py-4 text-black"
                >
                  {teamT("ourTeam")}
                </TabsTrigger>
                <TabsTrigger
                  value="purpose-values"
                  className="text-lg font-semibold py-4 text-black"
                >
                  {teamT("ourPurposeAndValues")}
                </TabsTrigger>
              </TabsList>
              
              <div className="border border-gray-200 border-t-0 rounded-b-lg bg-white">
                <TabsContent
                  value="team"
                  className="mt-0 p-4"
                >
                  <div className="flex flex-col space-y-2 text-black">
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
                    
                    <div className="border border-gray-200 rounded-lg p-6 text-black flex flex-col items-center justify-center">
                      <h3 className="text-2xl font-bold mb-3 w-full">
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
        <div className="max-w-7xl mx-auto w-full h-full flex flex-col justify-center">
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
            className="relative w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Mobile Carousel */}
            <div className="md:hidden">
              <Carousel
                opts={{
                  align: "center",
                  loop: false,
                  startIndex: 1,
                }}
                className="w-full"
              >
                <CarouselContent>
                  {/* Version 0 */}
                  <CarouselItem>
                    <div className="w-full h-[520px] p-4 flex items-center justify-center">
                      <div className="bg-white border border-gray-200 rounded-lg p-6 h-full w-full flex flex-col justify-center overflow-hidden">
                        <div className="mb-4">
                          <span className="text-sm font-semibold text-blue-600">
                            {newsT("version0")}
                          </span>
                          <h3 className="text-xl font-bold text-black break-words">
                            Initial Release
                          </h3>
                        </div>
                        <div className="space-y-4">
                          <p className="text-base text-black break-words">
                            The first version of our platform introduced basic legal research capabilities and a simple user interface.
                          </p>
                          <p className="text-base text-black break-words">
                            Users could search through Norwegian legal documents and get basic answers to their queries.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>

                  {/* Version 1 */}
                  <CarouselItem>
                    <div className="w-full h-[520px] p-4 flex items-center justify-center">
                      <div className="bg-white border border-gray-200 rounded-lg p-6 h-full w-full flex flex-col justify-center overflow-hidden">
                        <div className="mb-4">
                          <span className="text-sm font-semibold text-blue-600">
                            {newsT("version1")}
                          </span>
                          <h3 className="text-xl font-bold text-black break-words">
                            {newsT("update1title")}
                          </h3>
                        </div>
                        <div className="space-y-4">
                          <p className="text-base leading-relaxed text-black break-words">
                            {newsT("update1paragraph1")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>

                  {/* Version 2 */}
                  <CarouselItem>
                    <div className="w-full h-[520px] p-4 flex items-center justify-center">
                      <div className="bg-white border border-gray-200 rounded-lg p-6 h-full w-full flex flex-col justify-center overflow-hidden">
                        <div className="mb-4">
                          <span className="text-sm font-semibold text-blue-600">
                            {newsT("version2")}
                          </span>
                          <h3 className="text-xl font-bold text-black break-words">
                            Advanced AI Integration
                          </h3>
                        </div>
                        <div className="space-y-4">
                          <p className="text-base text-black break-words">
                            Our upcoming version will feature enhanced AI capabilities with improved accuracy and faster response times.
                          </p>
                          <p className="text-base text-black break-words">
                            New features will include advanced legal analysis, case prediction, and personalized recommendations.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:flex items-center justify-center gap-8 relative px-12 md:px-0">
              {/* Version 0 Box */}
              <div className={`w-[45%] h-[calc(100vh-36rem)] transition-all duration-300 ${
                activeVersion === 0 ? 'opacity-100 scale-100' : 'opacity-60 scale-95'
              }`}>
                <div className={`bg-white border border-gray-200 rounded-lg p-8 h-full transition-all duration-300 ${
                  activeVersion === 0 ? 'shadow-lg' : ''
                }`}>
                  <div className="mb-4">
                    <span className={`text-sm font-semibold ${activeVersion === 0 ? 'text-blue-600' : 'text-gray-500'}`}>
                      {newsT("version0")}
                    </span>
                    <h3 className={`text-xl md:text-2xl font-bold ${activeVersion === 0 ? 'text-black' : 'text-gray-400'}`}>
                      Initial Release
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <p className={`text-base md:text-lg ${activeVersion === 0 ? 'text-black' : 'text-gray-400'}`}>
                      The first version of our platform introduced basic legal research capabilities and a simple user interface.
                    </p>
                    <p className={`text-base md:text-lg ${activeVersion === 0 ? 'text-black' : 'text-gray-400'}`}>
                      Users could search through Norwegian legal documents and get basic answers to their queries.
                    </p>
                  </div>
                </div>
              </div>

              {/* Version 1 Box (Current) */}
              <div className={`w-[45%] h-[calc(100vh-36rem)] transition-all duration-300 ${
                activeVersion === 1 ? 'opacity-100 scale-100' : 'opacity-60 scale-95'
              }`}>
                <div className={`bg-white border border-gray-200 rounded-lg p-8 h-full transition-all duration-300 ${
                  activeVersion === 1 ? 'shadow-lg' : ''
                }`}>
                  <div className="mb-4">
                    <span className={`text-sm font-semibold ${activeVersion === 1 ? 'text-blue-600' : 'text-gray-500'}`}>
                      {newsT("version1")}
                    </span>
                    <h3 className={`text-xl md:text-2xl font-bold ${activeVersion === 1 ? 'text-black' : 'text-gray-400'}`}>
                      {newsT("update1title")}
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <p className={`text-base md:text-lg leading-relaxed ${activeVersion === 1 ? 'text-black' : 'text-gray-400'}`}>
                      {newsT("update1paragraph1")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Version 2 Box */}
              <div className={`w-[45%] h-[calc(100vh-36rem)] transition-all duration-300 ${
                activeVersion === 2 ? 'opacity-100 scale-100' : 'opacity-60 scale-95'
              }`}>
                <div className={`bg-white border border-gray-200 rounded-lg p-8 h-full transition-all duration-300 ${
                  activeVersion === 2 ? 'shadow-lg' : ''
                }`}>
                  <div className="mb-4">
                    <span className={`text-sm font-semibold ${activeVersion === 2 ? 'text-blue-600' : 'text-gray-500'}`}>
                      {newsT("version2")}
                    </span>
                    <h3 className={`text-xl md:text-2xl font-bold ${activeVersion === 2 ? 'text-black' : 'text-gray-400'}`}>
                      Advanced AI Integration
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <p className={`text-base md:text-lg ${activeVersion === 2 ? 'text-black' : 'text-gray-400'}`}>
                      Our upcoming version will feature enhanced AI capabilities with improved accuracy and faster response times.
                    </p>
                    <p className={`text-base md:text-lg ${activeVersion === 2 ? 'text-black' : 'text-gray-400'}`}>
                      New features will include advanced legal analysis, case prediction, and personalized recommendations.
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <button 
                onClick={() => handleVersionChange(activeVersion === 0 ? 2 : activeVersion - 1)}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all duration-300 z-10"
                aria-label="View previous version"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <button 
                onClick={() => handleVersionChange(activeVersion === 2 ? 0 : activeVersion + 1)}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all duration-300 z-10"
                aria-label="View next version"
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </motion.div>
        </div>
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