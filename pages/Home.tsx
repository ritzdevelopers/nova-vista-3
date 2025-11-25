import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import ContactModal from "../components/ContactModal";
import {
  fetchPrograms,
  fetchMeta,
  fetchArticles,
  submitContactForm,
} from "../services/api";
import { Program, MetaData, Article } from "../types";
import { Link } from "react-router-dom";

export default function Home() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [meta, setMeta] = useState<MetaData | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchPrograms().then(setPrograms);
    fetchMeta().then(setMeta);
    fetchArticles().then(setArticles);
  }, []);

  // Auto-open modal after 5 seconds on first visit
  useEffect(() => {
    const hasSeenModal = localStorage.getItem("hasSeenContactModal");
    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setIsModalOpen(true);
        localStorage.setItem("hasSeenContactModal", "true");
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
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Handle hash navigation manually on load and hash change
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace("#", "");
        setTimeout(() => scrolltToSection(id), 100);
      }
    };

    // Handle initial hash
    if (window.location.hash) {
      handleHashChange();
    }

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
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
      quote:
        "We strongly recommend Training from Prof Dr Gandhi. If you're reading this and are currently back and forth on signing up for classes - just do it! You'll be glad you did.",
      author: "Super International Exporters",
      position: "Delhi",
    },
    {
      quote:
        "We have used the Institute's training, where we have booked and attended courses run by them, which have all been very well received by the individuals that have attended.",
      author: "Sam Anthony",
      position: "CEO, Allied Overseas, Mumbai",
    },
    {
      quote:
        "Presentation Skill and Subject knowledge are excellent. willingness to solve our problems deserve a lot of appreciation.",
      author: "Paramjeet Singh",
      position: "Delhi",
    },
    {
      quote:
        "I cannot say enough nice things about Prof Gandhi. He is personable, professional and extremely knowledgeable",
      author: "Salah Bin Zaal",
      position: "Dubai",
    },
  ];

  const testimonialImages = [
    "https://i.pinimg.com/736x/77/96/87/779687b663cf7b4f443d48fc46d0ddc1.jpg",
    "https://i.pinimg.com/736x/11/db/c9/11dbc924f91ce295e49e2f802a678438.jpg",
    "https://i.pinimg.com/736x/f6/71/8e/f6718e9bce09e2ae1c3f3dd3299c5107.jpg",
    "https://i.pinimg.com/736x/32/25/cc/3225cc8e4f5ae372d2c6c1aa380d233e.jpg",
  ];

  const workshops = [
    {
      title: "Personality Development for employability",
      duration: "2 Days Workshop (Both Online & Offline)",
      topics: [
        "Presentation Skills",
        "Communication Skills",
        "Interpersonal Skills",
        "Work Place Etiquette",
        "Meeting/Telephone/Group Etiquette",
        "Body Language",
        "Self Confidence",
        "Positive Attitude",
        "Self-Motivation",
        "Powerful Presentation Techniques",
        "Time management",
        "Voice modulation",
        "Stress Management",
        "Creative Thinking",
        "Executive Corporate Attire",
      ],
      image: "https://i.pinimg.com/736x/b2/29/bd/b229bd20894fabecd61ea904bfd4b584.jpg",
    },
    {
      title: "Export Import & Documentation Workshop",
      duration: "2 Days Workshop",
      topics: [
        "Important Steps for Starters",
        "Role of Government Agencies",
        "Export Marketing",
        "Export & Import",
        "Export-Import Documentation",
        "Payment Terms/Incoterms",
        "Methods of Financing",
        "Process of an Export Order",
        "Containerization & Transportation",
      ],
      image: "https://i.pinimg.com/736x/a5/07/78/a5077813dd34a5e7f73d9e74d1e86fea.jpg",
    },
    {
      title: "Money Laundering & Act",
      duration: "2 Days Workshop",
      topics: [
        "Concept of money laundering & how it works",
        "Stages and various forms of money laundering",
        "Social/economic/political impact",
        "Methods adopted for money laundering",
        "Role of government agencies",
        "Money laundering act",
        "Case studies",
      ],
      image: "https://i.pinimg.com/1200x/5a/61/dd/5a61dd65099d97c079ea2cf9acfcf482.jpg",
    },
  ];

  return (
    <>
      <Hero
        tagline="Nova Vista – Education Beyond Boundaries"
        headline="Empowering Growth. Elevating Futures."
        subline="A platform committed to academic recognition and personal skill enhancement."
        onOpenModal={openModal}
      />

      {/* About Nova Vista Section */}
      <section id="about" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto text-center mb-8 sm:mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-slateInk mb-4 sm:mb-6">
              About Nova Vista
            </h2>
            <div className="h-1 w-16 sm:w-20 bg-crimson mx-auto mb-4 sm:mb-6 md:mb-8"></div>
            <p className="text-base sm:text-lg md:text-xl text-slateInk/80 leading-relaxed mb-6 sm:mb-8 px-2 sm:px-0">
              NovaVista is a global organisation that designs and implements
              national or international education strategies and program
              services. We work with governments, policymakers, educators, and
              employers across the globe to prepare students and professionals
              for the global workforce. We also create initiatives that assist
              students, scholars, and expand teaching and learning across
              cultures; and provide opportunities to promote educational
              equities and exchange of knowledge.
            </p>
          </motion.div>

          {/* Image Gallery */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
            {[
              "https://img.freepik.com/premium-photo/international-day-education_1028264-162.jpg",
              "https://i.pinimg.com/736x/cf/7a/03/cf7a03f0c8434dfdf455c82317830fa7.jpg",

              "https://i.pinimg.com/originals/1a/0a/0d/1a0a0d559f88af6947e54bed62e08085.jpg",
            ].map((i, idx) => (
              <motion.div
                key={i}
                className="relative group overflow-hidden rounded-2xl"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <img
                  src={`${i}`}
                  alt={`About Nova Vista ${i}`}
                  className="w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Online Admission Section */}
      <section
        id="admission"
        className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-8 sm:mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif text-slateInk mb-4 sm:mb-6 px-2 sm:px-0">
              Online Admission for Certificate, Diploma & Degree
            </h2>
            <div className="h-1 w-16 sm:w-20 bg-crimson mx-auto mb-4 sm:mb-6 md:mb-8"></div>
            <p className="text-base sm:text-lg md:text-xl text-slateInk/80 max-w-3xl mx-auto mb-6 sm:mb-8 px-2 sm:px-0">
              Start your educational journey with us. Register online for our
              comprehensive certificate, diploma, and degree programs.
            </p>
            <button
              onClick={openModal}
              className="inline-flex items-center px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-crimson text-white rounded-full hover:bg-crimsonDark transition-colors font-semibold text-sm sm:text-base md:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              Get Started →
            </button>
          </motion.div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            <motion.div
              className="relative overflow-hidden rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://i.pinimg.com/1200x/e5/7e/32/e57e3206fa458c41ffe495f8823c4c58.jpg"
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
                src="https://i.pinimg.com/1200x/fa/e1/90/fae1901e016f26ef04ee7a7bd629f460.jpg"
                alt="Education Programs"
                className="w-full h-[400px] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Workshops Section */}
      <section
        id="workshops"
        className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-8 sm:mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-slateInk mb-4 sm:mb-6">
              WORKSHOPS
            </h2>
            <div className="h-1 w-16 sm:w-20 bg-crimson mx-auto mb-4 sm:mb-6 md:mb-8"></div>
          </motion.div>

          <div className="space-y-8 sm:space-y-12 md:space-y-16">
            {workshops.map((workshop, index) => (
              <motion.div
                key={index}
                className={`grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="relative overflow-hidden rounded-2xl">
                    <img
                      src={workshop.image}
                      alt={workshop.title}
                      className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] object-cover"
                    />
                    <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-crimson text-white px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-lg font-semibold text-xs sm:text-sm">
                      {workshop.duration}
                    </div>
                  </div>
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-slateInk mb-3 sm:mb-4">
                    {workshop.title}
                  </h3>
                  <div className="h-1 w-12 sm:w-16 bg-crimson mb-4 sm:mb-6"></div>
                  <div className="grid sm:grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
                    {workshop.topics.map((topic, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-crimson text-base sm:text-lg mt-1">
                          •
                        </span>
                        <span className="text-slateInk/80 text-xs sm:text-sm">
                          {topic}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={openModal}
                    className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-crimson text-white rounded-full hover:bg-crimsonDark transition-colors font-semibold text-xs sm:text-sm"
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
      <section
        id="testimonials"
        className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-8 sm:mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif text-slateInk mb-4 sm:mb-6 px-2 sm:px-0">
              TRUSTED BY STUDENTS & INDUSTRY EXPERTS
            </h2>
            <div className="h-1 w-16 sm:w-20 bg-crimson mx-auto mb-4 sm:mb-6 md:mb-8"></div>
          </motion.div>

          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 lg:p-12 max-w-4xl mx-auto">
            <motion.div
              key={testimonialIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-start gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6">
                <div className="flex-shrink-0">
                  <img
                    src={testimonialImages[testimonialIndex]}
                    alt={testimonials[testimonialIndex].author}
                    className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full object-cover object-center"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-slateInk/20 mb-2 sm:mb-4">
                    "
                  </p>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slateInk/80 leading-relaxed mb-4 sm:mb-6">
                    {testimonials[testimonialIndex].quote}
                  </p>
                  <div>
                    <p className="font-semibold text-slateInk">
                      {testimonials[testimonialIndex].author}
                    </p>
                    <p className="text-slateInk/60 text-sm">
                      {testimonials[testimonialIndex].position}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-4 sm:mt-6 md:mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestimonialIndex(i)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i === testimonialIndex ? "bg-crimson w-8" : "bg-slate-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Info Bar */}
          <motion.div
            className="mt-4 sm:mt-6 md:mt-8 bg-slate-50 rounded-lg p-3 sm:p-4 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl text-blue-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline-block w-7 h-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16v-4m0-4h.01"
                  />
                </svg>
              </span>
              <span className="text-slateInk/70">
                For cost, venue, date and any other query
              </span>
            </div>
            <Link
              to="/contact"
              className="px-4 sm:px-6 py-2 bg-crimson text-white rounded-full hover:bg-crimsonDark transition-colors font-semibold text-xs sm:text-sm w-full sm:w-auto inline-block text-center"
            >
              Contact Us →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-slateInk mb-6">
              Contact Us
            </h2>
            <div className="h-1 w-20 bg-crimson mx-auto mb-8"></div>
            <p className="text-lg md:text-xl text-slateInk/80 max-w-3xl mx-auto">
              Get in touch with us for any queries or to begin your educational
              journey with Nova Vista.
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
              <h3 className="text-2xl md:text-3xl font-serif text-slateInk mb-8">
                Send Us an Enquiry
              </h3>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slateInk/50">
                      Full Name
                    </label>
                    <input
                      name="fullName"
                      required
                      placeholder="John Doe"
                      className="w-full border-b border-slate-200 py-3 text-slateInk focus:outline-none focus:border-crimson transition-colors bg-transparent"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slateInk/50">
                      Email Address
                    </label>
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
                  <label className="text-xs font-bold uppercase tracking-wider text-slateInk/50">
                    Phone Number
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="+91 97735 09497"
                    className="w-full border-b border-slate-200 py-3 text-slateInk focus:outline-none focus:border-crimson transition-colors bg-transparent"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slateInk/50">
                    Program of Interest
                  </label>
                  <select
                    name="program"
                    className="w-full border-b border-slate-200 py-3 text-slateInk focus:outline-none focus:border-crimson transition-colors bg-transparent"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select a program
                    </option>
                    <option value="certificate">Certificate Program</option>
                    <option value="diploma">Diploma Program</option>
                    <option value="degree">Degree Program</option>
                    <option value="workshop">Workshop</option>
                    <option value="other">Other Inquiry</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slateInk/50">
                    Message
                  </label>
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
                    disabled={
                      formStatus === "loading" || formStatus === "success"
                    }
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
                    <p className="text-red-600 text-sm mt-4 text-center">
                      Something went wrong. Please try again.
                    </p>
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
                    <p className="text-xs uppercase tracking-[0.2em] text-slateInk/50 mb-1">
                      Phone / WhatsApp
                    </p>
                    <p className="text-lg text-slateInk font-medium">
                      +91 97735 09497
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-2xl">📧</span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slateInk/50 mb-1">
                      Email
                    </p>
                    <p className="text-lg text-slateInk font-medium">
                      NovaVista.india@gmail.com
                    </p>
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

      {/* Contact Modal */}
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}
