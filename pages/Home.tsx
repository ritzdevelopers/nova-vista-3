import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import ContactModal from "../components/ContactModal";
import { fetchPrograms, fetchMeta, fetchArticles, submitContactForm } from "../services/api";
import { Program, MetaData, Article } from "../types";
import { Link } from "react-router-dom";

export default function Home() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [meta, setMeta] = useState<MetaData | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchPrograms().then(setPrograms);
    fetchMeta().then(setMeta);
    fetchArticles().then(setArticles);
  }, []);

  // Auto-open modal after 5 seconds on first visit
  useEffect(() => {
    const hasSeenModal = localStorage.getItem('hasSeenContactModal');
    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setIsModalOpen(true);
        localStorage.setItem('hasSeenContactModal', 'true');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const scrolltToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Handle hash navigation manually on load and hash change
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace('#', '');
        setTimeout(() => scrolltToSection(id), 100);
      }
    };

    // Handle initial hash
    if (window.location.hash) {
      handleHashChange();
    }

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [programs]);

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormStatus("loading");
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      await submitContactForm(payload);
      setFormStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setFormStatus("error");
    }
  }

  const testimonials = [
    {
      quote: "We strongly recommend Training from Prof Dr Gandhi. If you're reading this and are currently back and forth on signing up for classes - just do it! You'll be glad you did.",
      author: "Super International Exporters",
      position: "Delhi"
    },
    {
      quote: "We have used the Institute's training, where we have booked and attended courses run by them, which have all been very well received by the individuals that have attended.",
      author: "Sam Anthony",
      position: "CEO, Allied Overseas, Mumbai"
    },
    {
      quote: "Presentation Skill and Subject knowledge are excellent. willingness to solve our problems deserve a lot of appreciation.",
      author: "Paramjeet Singh",
      position: "Delhi"
    },
    {
      quote: "I cannot say enough nice things about Prof Gandhi. He is personable, professional and extremely knowledgeable",
      author: "Salah Bin Zaal",
      position: "Dubai"
    }
  ];

  const services = [
    {
      title: "Join Ventures, Collaboration & Tieups",
      image: "/s2/s2-i1.jpg",
      description: "Building strategic partnerships and collaborations with educational institutions worldwide."
    },
    {
      title: "Establishment of School/Colleges/Universities & Off-Shore Campuses",
      image: "/s2/s2-i2.jpg",
      description: "Supporting the establishment and development of educational institutions globally."
    },
    {
      title: "Training and Development Programs for faculty & corporate",
      image: "https://picsum.photos/600/400?random=10",
      description: "Comprehensive training programs designed for educators and corporate professionals."
    },
    {
      title: "Counselings and Recruitment of Student from Abroad",
      image: "https://picsum.photos/600/400?random=11",
      description: "Expert guidance and support for international student recruitment and counseling."
    },
    {
      title: "Twinning, Exchange and dual certification program",
      image: "https://picsum.photos/600/400?random=12",
      description: "Facilitating international exchange programs and dual certification opportunities."
    },
    {
      title: "Admissions for MBBS for the Medical Colleges of Bangladesh & Russia",
      image: "https://picsum.photos/600/400?random=13",
      description: "Specialized admission services for medical programs in Bangladesh and Russia."
    }
  ];

  const workshops = [
    {
      title: "Personality Development for employability",
      duration: "2 Days Workshop (Both Online & Offline)",
      topics: [
        "Presentation Skills", "Communication Skills", "Interpersonal Skills", 
        "Work Place Etiquette", "Meeting/Telephone/Group Etiquette", "Body Language", 
        "Self Confidence", "Positive Attitude", "Self-Motivation", 
        "Powerful Presentation Techniques", "Time management", "Voice modulation", 
        "Stress Management", "Creative Thinking", "Executive Corporate Attire"
      ],
      image: "https://picsum.photos/800/600?random=20"
    },
    {
      title: "Export Import & Documentation Workshop",
      duration: "2 Days Workshop",
      topics: [
        "Important Steps for Starters", "Role of Government Agencies", "Export Marketing", 
        "Export & Import", "Export-Import Documentation", "Payment Terms/Incoterms", 
        "Methods of Financing", "Process of an Export Order", "Containerization & Transportation"
      ],
      image: "https://picsum.photos/800/600?random=21"
    },
    {
      title: "Money Laundering & Act",
      duration: "2 Days Workshop",
      topics: [
        "Concept of money laundering & how it works", "Stages and various forms of money laundering", 
        "Social/economic/political impact", "Methods adopted for money laundering", 
        "Role of government agencies", "Money laundering act", "Case studies"
      ],
      image: "https://picsum.photos/800/600?random=22"
    }
  ];

  const leadership = [
    { name: "Prof. Mahesh Gandhi", role: "President", location: "India", image: "https://picsum.photos/400/400?random=30" },
    { name: "Shashank Jain", role: "Director", location: "Germany", image: "https://picsum.photos/400/400?random=31" },
    { name: "Deepika Malik", role: "Director", location: "UAE", image: "https://picsum.photos/400/400?random=32" },
    { name: "Ms. Benu Sehgal", role: "Director", location: "India", image: "https://picsum.photos/400/400?random=33" },
    { name: "CA Deepak Kumar", role: "Director", location: "India", image: "https://picsum.photos/400/400?random=34" },
    { name: "Naveen Kapoor", role: "Director", location: "USA", image: "https://picsum.photos/400/400?random=35" }
  ];

  return (
    <>
      <Hero
        tagline="Nova Vista – Education Beyond Boundaries"
        headline="TRANSFORMING EDUCATION WORLDWIDE WITH STRATEGIC PROGRAMS AND MEANINGFUL GLOBAL PARTNERSHIPS"
        subline="A platform committed to academic recognition and personal skill enhancement."
        onOpenModal={openModal}
      />

      {/* About Nova Vista Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="max-w-4xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-slateInk mb-6">About Nova Vista</h2>
            <div className="h-1 w-20 bg-crimson mx-auto mb-8"></div>
            <p className="text-lg md:text-xl text-slateInk/80 leading-relaxed mb-8">
              IgnitedBrains is a global organisation that designs and implements national or international education strategies and program services. We work with governments, policymakers, educators, and employers across the globe to prepare students and professionals for the global workforce. We also create initiatives that assist students, scholars, and expand teaching and learning across cultures; and provide opportunities to promote educational equities and exchange of knowledge.
            </p>
          </motion.div>

          {/* Image Gallery */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="relative group overflow-hidden rounded-2xl"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <img
                  src={`https://picsum.photos/600/400?random=${i}`}
                  alt={`About Nova Vista ${i}`}
                  className="w-full h-[300px] object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Vision Section */}
      <section id="vision" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Image */}
            <motion.div
              className="relative order-2 lg:order-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://picsum.photos/800/600?random=4"
                alt="Our Vision"
                className="rounded-2xl shadow-lg w-full h-[500px] object-cover"
              />
            </motion.div>

            {/* Right Side - Content */}
            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-slateInk mb-6">Our Vision</h2>
              <div className="h-1 w-20 bg-crimson mb-8"></div>
              <p className="text-lg md:text-xl text-slateInk/80 leading-relaxed mb-6">
                IgnitedBrains is not for profit trust established to help students from all strata of society to get high quality education. We have been collaborating & organizing several programs and initiates for promoting the education at national & international level. The only and ultimate aim of an individual is to get employed. For making the individual employable, IgnitedBrains have collaborated with National and international universities for certification in skill-oriented courses.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Online Admission Section */}
      <section id="admission" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-slateInk mb-6">Online Admission/Registration for Certificate, Diploma & Degree</h2>
            <div className="h-1 w-20 bg-crimson mx-auto mb-8"></div>
            <p className="text-lg md:text-xl text-slateInk/80 max-w-3xl mx-auto mb-8">
              Start your educational journey with us. Register online for our comprehensive certificate, diploma, and degree programs.
            </p>
            <button
              onClick={openModal}
              className="inline-flex items-center px-10 py-4 bg-crimson text-white rounded-full hover:bg-crimsonDark transition-colors font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              Get Started →
            </button>
          </motion.div>

          {/* Image Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              className="relative overflow-hidden rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://picsum.photos/800/500?random=5"
                alt="Online Admission"
                className="w-full h-[400px] object-cover"
              />
            </motion.div>
            <motion.div
              className="relative overflow-hidden rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                src="https://picsum.photos/800/500?random=6"
                alt="Education Programs"
                className="w-full h-[400px] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-slateInk mb-6">OUR SERVICES</h2>
            <div className="h-1 w-20 bg-crimson mx-auto mb-8"></div>
            <p className="text-lg md:text-xl text-slateInk/80 max-w-4xl mx-auto">
              Delivering global education solutions that empower learners, support policymakers, strengthen institutions, and drive equitable, cross-cultural growth through innovative programs and strategic partnerships.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif text-slateInk mb-3 group-hover:text-crimson transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slateInk/70 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshops Section */}
      <section id="workshops" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-slateInk mb-6">WORKSHOPS</h2>
            <div className="h-1 w-20 bg-crimson mx-auto mb-8"></div>
          </motion.div>

          <div className="space-y-16">
            {workshops.map((workshop, index) => (
              <motion.div
                key={index}
                className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="relative overflow-hidden rounded-2xl">
                    <img
                      src={workshop.image}
                      alt={workshop.title}
                      className="w-full h-[400px] object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-crimson text-white px-4 py-2 rounded-lg font-semibold">
                      {workshop.duration}
                    </div>
                  </div>
                </div>
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <h3 className="text-2xl md:text-3xl font-serif text-slateInk mb-4">{workshop.title}</h3>
                  <div className="h-1 w-16 bg-crimson mb-6"></div>
                  <div className="grid md:grid-cols-2 gap-3 mb-6">
                    {workshop.topics.map((topic, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-crimson text-lg mt-1">•</span>
                        <span className="text-slateInk/80 text-sm">{topic}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={openModal}
                    className="inline-flex items-center px-6 py-3 bg-crimson text-white rounded-full hover:bg-crimsonDark transition-colors font-semibold text-sm"
                  >
                    Register Now →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-slateInk mb-6">TRUSTED BY STUDENTS & INDUSTRY EXPERTS</h2>
            <div className="h-1 w-20 bg-crimson mx-auto mb-8"></div>
          </motion.div>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 max-w-4xl mx-auto">
            <motion.div
              key={testimonialIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-start gap-6 mb-6">
                <div className="flex-shrink-0">
                  <img
                    src={`https://picsum.photos/100/100?random=${testimonialIndex + 50}`}
                    alt={testimonials[testimonialIndex].author}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-4xl md:text-5xl font-serif text-slateInk/20 mb-4">"</p>
                  <p className="text-lg md:text-xl text-slateInk/80 leading-relaxed mb-6">
                    {testimonials[testimonialIndex].quote}
                  </p>
                  <div>
                    <p className="font-semibold text-slateInk">{testimonials[testimonialIndex].author}</p>
                    <p className="text-slateInk/60 text-sm">{testimonials[testimonialIndex].position}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestimonialIndex(i)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i === testimonialIndex ? 'bg-crimson w-8' : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Info Bar */}
          <motion.div
            className="mt-8 bg-slate-50 rounded-lg p-4 max-w-4xl mx-auto flex items-center justify-between flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">ℹ️</span>
              <span className="text-slateInk/70">For cost, venue, date and any other query</span>
            </div>
            <button
              onClick={openModal}
              className="px-6 py-2 bg-crimson text-white rounded-full hover:bg-crimsonDark transition-colors font-semibold text-sm"
            >
              Contact Us →
            </button>
          </motion.div>
        </div>
      </section>

      {/* Leadership Section */}
      <section id="leadership" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-slateInk mb-6">LEADERSHIP</h2>
            <div className="h-1 w-20 bg-crimson mx-auto mb-8"></div>
            <p className="text-lg md:text-xl text-slateInk/80 max-w-4xl mx-auto">
              Leading global education transformation through strategic collaboration, innovative programs, and inclusive initiatives that empower learners and strengthen workforce readiness across nations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadership.map((member, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="relative overflow-hidden h-64">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-serif text-slateInk mb-2">{member.name}</h3>
                  <p className="text-crimson font-semibold mb-1">{member.role}</p>
                  <p className="text-slateInk/60 text-sm">{member.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-slateInk mb-6">Contact Us</h2>
            <div className="h-1 w-20 bg-crimson mx-auto mb-8"></div>
            <p className="text-lg md:text-xl text-slateInk/80 max-w-3xl mx-auto">
              Get in touch with us for any queries or to begin your educational journey with Nova Vista.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-slate-100"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl md:text-3xl font-serif text-slateInk mb-8">Send Us an Enquiry</h3>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slateInk/50">Full Name</label>
                    <input
                      name="fullName"
                      required
                      placeholder="John Doe"
                      className="w-full border-b border-slate-200 py-3 text-slateInk focus:outline-none focus:border-crimson transition-colors bg-transparent"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slateInk/50">Email Address</label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="john@example.com"
                      className="w-full border-b border-slate-200 py-3 text-slateInk focus:outline-none focus:border-crimson transition-colors bg-transparent"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slateInk/50">Phone Number</label>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="+91 97735 09497"
                    className="w-full border-b border-slate-200 py-3 text-slateInk focus:outline-none focus:border-crimson transition-colors bg-transparent"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slateInk/50">Program of Interest</label>
                  <select
                    name="program"
                    className="w-full border-b border-slate-200 py-3 text-slateInk focus:outline-none focus:border-crimson transition-colors bg-transparent"
                    defaultValue=""
                  >
                    <option value="" disabled>Select a program</option>
                    <option value="certificate">Certificate Program</option>
                    <option value="diploma">Diploma Program</option>
                    <option value="degree">Degree Program</option>
                    <option value="workshop">Workshop</option>
                    <option value="other">Other Inquiry</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slateInk/50">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us about your goals and how we can help..."
                    className="w-full border-b border-slate-200 py-3 text-slateInk focus:outline-none focus:border-crimson transition-colors bg-transparent resize-none"
                  />
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={formStatus === "loading" || formStatus === "success"}
                    className={`w-full py-4 rounded-full font-semibold text-white transition-all duration-300 ${
                      formStatus === "success"
                        ? "bg-green-700 cursor-default"
                        : "bg-crimson hover:bg-crimsonDark shadow-lg hover:shadow-xl shadow-crimson/20"
                    }`}
                  >
                    {formStatus === "loading" ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        Sending...
                      </span>
                    ) : formStatus === "success" ? (
                      "Message Sent Successfully ✓"
                    ) : (
                      "Submit Enquiry"
                    )}
                  </button>
                  {formStatus === "error" && (
                    <p className="text-red-600 text-sm mt-4 text-center">Something went wrong. Please try again.</p>
                  )}
                </div>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-8 mb-8">
                <div className="flex items-start gap-4">
                  <span className="text-2xl">📞</span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slateInk/50 mb-1">Phone / WhatsApp</p>
                    <p className="text-lg text-slateInk font-medium">+91 97735 09497</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-2xl">📧</span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slateInk/50 mb-1">Email</p>
                    <p className="text-lg text-slateInk font-medium">ignitedbrains.india@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="https://picsum.photos/800/500?random=40"
                  alt="Contact"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Offices Section */}
      <section id="offices" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-slateInk mb-6">Our Offices</h2>
            <div className="h-1 w-20 bg-crimson mx-auto mb-8"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { country: "India", address: "B37, Lajpat Nagar-2, New Delhi, 110024", image: "https://picsum.photos/600/400?random=50" },
              { country: "Germany", address: "Truderinger Strasse 206 Munich, 81825", image: "https://picsum.photos/600/400?random=51" },
              { country: "USA", address: "3314 Windridge Ave, Thousand Oaks, CA, 91362", image: "https://picsum.photos/600/400?random=52" },
              { country: "Bangladesh", address: "Shimanto Square Market, Shope no. 262, 2nd Floor, Dhanmondi, Dhaka.", image: "https://picsum.photos/600/400?random=53" },
              { country: "Nepal", address: "Baluwatar 4 Kathmandu Nepal – 44616", image: "https://picsum.photos/600/400?random=54" }
            ].map((office, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={office.image}
                    alt={office.country}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif text-slateInk mb-3">{office.country}</h3>
                  <p className="text-slateInk/70 text-sm leading-relaxed">{office.address}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}
