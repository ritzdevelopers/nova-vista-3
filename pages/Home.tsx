import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import { fetchPrograms, fetchMeta, fetchArticles, submitContactForm } from "../services/api";
import { Program, MetaData, Article } from "../types";
import { Link } from "react-router-dom";

export default function Home() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [meta, setMeta] = useState<MetaData | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    fetchPrograms().then(setPrograms);
    fetchMeta().then(setMeta);
    fetchArticles().then(setArticles);
  }, []);

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

  return (
    <>
      <Hero
        tagline="Nova Vista Education"
        headline="Empowering Growth. Elevating Futures."
        subline="A platform committed to academic recognition and personal skill enhancement."
      />

      {/* About Us Section */}
      <section id="about" className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          {/* Main Introduction */}
          <motion.div
            className="max-w-4xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xl md:text-2xl text-slateInk/70 leading-relaxed font-serif mb-6">
              Nova Vista Education is built on the belief that growth comes in many forms — through experience, achievement, and continuous learning.
            </p>
            <p className="text-lg text-slateInk/80 leading-relaxed mb-12">
              We work to recognize professional excellence and help individuals develop the confidence and skills that open new opportunities.
            </p>

            {/* Stats */}
            {meta?.stats && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-slate-100 pt-12">
                {meta.stats.map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <p className="text-5xl font-serif text-crimson mb-2">{stat.value}</p>
                    <p className="text-xs uppercase tracking-[0.2em] text-slateInk/50 font-bold">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Mission and Commitment Grid */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Our Mission Card */}
            <motion.div
              className="bg-white rounded-2xl shadow-editorial p-8 md:p-12 border border-slate-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-1 w-16 bg-crimson"></div>
                <h3 className="text-2xl md:text-3xl font-serif text-slateInk">Our Mission</h3>
              </div>
              <p className="text-lg text-slateInk/80 leading-relaxed">
                To support individuals in advancing their academic standing and personal development with integrity and purpose.
              </p>
            </motion.div>

            {/* Our Commitment Card */}
            <motion.div
              className="bg-white rounded-2xl shadow-editorial p-8 md:p-12 border border-slate-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-1 w-16 bg-crimson"></div>
                <h3 className="text-2xl md:text-3xl font-serif text-slateInk">Our Commitment</h3>
              </div>
              <p className="text-lg text-slateInk/80 leading-relaxed">
                Clear processes, credible certifications, and meaningful learning experiences.
              </p>
            </motion.div>
          </div>

          {/* Image Gallery */}
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="relative group"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="absolute inset-0 bg-crimson transform rotate-2 rounded-2xl opacity-10 translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform"></div>
              <img
                src="https://picsum.photos/600/400?random=1"
                alt="Education Excellence"
                className="rounded-2xl shadow-editorial relative z-10 object-cover h-[300px] w-full group-hover:scale-105 transition-transform duration-700"
              />
            </motion.div>

            <motion.div
              className="relative group"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="absolute inset-0 bg-slateInk transform -rotate-2 rounded-2xl opacity-5 -translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform"></div>
              <img
                src="https://picsum.photos/600/400?random=2"
                alt="Professional Growth"
                className="rounded-2xl shadow-editorial relative z-10 object-cover h-[300px] w-full group-hover:scale-105 transition-transform duration-700"
              />
            </motion.div>

            <motion.div
              className="relative group"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="absolute inset-0 bg-crimson transform rotate-1 rounded-2xl opacity-10 translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform"></div>
              <img
                src="https://picsum.photos/600/400?random=3"
                alt="Learning Journey"
                className="rounded-2xl shadow-editorial relative z-10 object-cover h-[300px] w-full group-hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Academic Recognition Section */}
      <section id="academic" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">


          {/* Overview Section */}
          <motion.div
            className="max-w-4xl mx-auto text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-2xl md:text-3xl font-serif text-slateInk mb-6">Academic Recognition</h3>
            <div className="h-1 w-20 bg-crimson mx-auto mb-8"></div>
            <p className="text-lg md:text-xl text-slateInk/80 leading-relaxed">
              Certain individuals make extraordinary contributions through their work, leadership, innovation, or service. Nova Vista facilitates postgraduate honorary titles and the D.Litt. for those whose achievements deserve formal academic acknowledgment.
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
            {/* Why This Matters */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl md:text-3xl font-serif text-slateInk mb-6">Why This Matters</h3>
              <div className="space-y-4">
                {[
                  "Strengthens professional stature",
                  "Supports leadership, consulting, and public-facing roles",
                  "Acknowledges years of dedication and impact"
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-4 bg-parchment p-6 rounded-xl border border-slate-100"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  >
                    <span className="text-crimson text-2xl font-bold flex-shrink-0">•</span>
                    <span className="text-slateInk/80 text-lg leading-relaxed">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Process */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl md:text-3xl font-serif text-slateInk mb-6">Process</h3>
              <div className="space-y-4">
                {[
                  { step: "1", title: "Profile review" },
                  { step: "2", title: "Evaluation" },
                  { step: "3", title: "Approval" },
                  { step: "4", title: "Issuance of honorary title" }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-4 bg-white p-6 rounded-xl border-2 border-slate-100 hover:border-crimson/30 transition-all group"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-crimson text-white rounded-full flex items-center justify-center font-serif text-xl font-bold group-hover:scale-110 transition-transform">
                      {item.step}
                    </div>
                    <span className="text-slateInk/80 text-lg font-medium">{item.title}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Image Section */}
          <motion.div
            className="relative mb-16"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="absolute inset-0 bg-crimson transform rotate-3 rounded-2xl opacity-10 translate-x-4 translate-y-4"></div>
            <img
              src="https://picsum.photos/1200/600?random=4"
              alt="Academic Recognition"
              className="rounded-2xl shadow-editorial relative z-10 object-cover h-[400px] md:h-[500px] w-full"
            />
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center px-10 py-4 bg-crimson text-white rounded-full hover:bg-crimsonDark transition-colors font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              Submit Your Profile
              <span className="ml-3 text-xl">→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Personality Development Section */}
      <section id="personality" className="py-24 bg-parchment">
        <div className="max-w-7xl mx-auto px-6">
   

          {/* Overview Section */}
          <motion.div
            className="max-w-4xl mx-auto text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-2xl md:text-3xl font-serif text-slateInk mb-6">Personality Development</h3>
            <div className="h-1 w-20 bg-crimson mx-auto mb-8"></div>
            <p className="text-lg md:text-xl text-slateInk/80 leading-relaxed">
              A focused program designed to enhance communication, presentation, self-confidence, and professional conduct — essential qualities for career-oriented individuals.
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
            {/* What Participants Gain */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl md:text-3xl font-serif text-slateInk mb-6">What Participants Gain</h3>
              <div className="space-y-4">
                {[
                  "Better clarity in speech",
                  "Improved body language",
                  "Professional grooming",
                  "Stronger interview performance",
                  "Confidence in social and workplace settings"
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-4 bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  >
                    <span className="text-crimson text-2xl font-bold flex-shrink-0">•</span>
                    <span className="text-slateInk/80 text-lg leading-relaxed">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Format */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl md:text-3xl font-serif text-slateInk mb-6">Format</h3>
              <div className="space-y-4">
                {[
                  { icon: "📚", title: "Short-duration, practical sessions" },
                  { icon: "👥", title: "Offline, guided training" },
                  { icon: "🎓", title: "Certification included" }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-4 bg-white p-6 rounded-xl border-2 border-slate-100 hover:border-crimson/30 transition-all group shadow-sm hover:shadow-md"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  >
                    <div className="flex-shrink-0 w-14 h-14 bg-parchment rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform border-2 border-crimson/20">
                      {item.icon}
                    </div>
                    <span className="text-slateInk/80 text-lg font-medium">{item.title}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Image Section */}
          <motion.div
            className="relative mb-16"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="absolute inset-0 bg-slateInk transform -rotate-3 rounded-2xl opacity-5 -translate-x-4 translate-y-4"></div>
            <img
              src="https://picsum.photos/1200/600?random=5"
              alt="Personality Development"
              className="rounded-2xl shadow-editorial relative z-10 object-cover h-[400px] md:h-[500px] w-full"
            />
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center px-10 py-4 bg-crimson text-white rounded-full hover:bg-crimsonDark transition-colors font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              Register for Training
              <span className="ml-3 text-xl">→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Nova Vista Section */}
      <section id="why-nova-vista" className="py-24 bg-parchment">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="kicker mb-4">Why Choose Us</p>
              <h2 className="section-heading mb-6">Why Nova Vista</h2>
              <div className="h-1 w-20 bg-crimson mb-8"></div>
              
              <div className="space-y-4">
                {[
                  "Clear and professional processes",
                  "Recognized and trusted certifications",
                  "Experienced mentors and faculty",
                  "Practical, outcome-focused learning",
                  "Supportive guidance throughout the journey"
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-4 group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-crimson text-white rounded-full flex items-center justify-center font-bold text-sm group-hover:scale-110 transition-transform">
                      ✓
                    </div>
                    <p className="text-slateInk/80 text-base md:text-lg leading-relaxed pt-1">{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Side - Image */}
            <motion.div
              className="relative order-first lg:order-last"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="absolute inset-0 bg-crimson transform rotate-3 rounded-2xl opacity-10 translate-x-4 translate-y-4"></div>
              <img
                src="https://picsum.photos/800/1000?random=6"
                alt="Why Nova Vista"
                className="rounded-2xl shadow-editorial relative z-10 object-cover w-full h-[400px] md:h-[500px] lg:h-[600px]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Insights / News Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="kicker mb-4">Perspectives</p>
              <h2 className="section-heading">Latest Insights</h2>
            </div>
            <Link to="#" className="hidden md:inline-block text-crimson hover:text-crimsonDark font-medium border-b border-crimson/20">View all articles</Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <motion.article
                key={article.id}
                className="card overflow-hidden group cursor-pointer flex flex-col h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="h-48 bg-slate-200 relative overflow-hidden">
                  <img
                    src="/s3/s3-i1.jpg"
                    alt="Article thumbnail"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-xs font-bold tracking-widest uppercase text-slateInk rounded-sm">
                    {article.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-serif text-xl text-slateInk mb-3 group-hover:text-crimson transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-slateInk/70 mb-6 flex-1 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-slateInk/40 border-t border-slate-100 pt-4 mt-auto">
                    <span className="font-medium text-slateInk/60">{article.author}</span>
                    <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-parchment relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="kicker mb-4">Get Started</p>
            <h2 className="section-heading mb-6">Begin Your Journey with Nova Vista</h2>
            <div className="h-1 w-20 bg-crimson mx-auto mb-8"></div>
            <p className="text-lg md:text-xl text-slateInk/80 max-w-3xl mx-auto leading-relaxed">
              Our team is here to help you take the next step — whether it's academic recognition or skill enhancement.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-2xl md:text-3xl font-serif text-slateInk mb-8">Contact Information</h3>
              <motion.div
                className="space-y-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl">📞</span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slateInk/50 mb-1">Phone / WhatsApp</p>
                    <p className="text-lg text-slateInk font-medium">+1 (415) 555-0110</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-2xl">📧</span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slateInk/50 mb-1">Email</p>
                    <p className="text-lg text-slateInk font-medium">admissions@novavista.edu</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slateInk/50 mb-1">Location</p>
                    <p className="text-lg text-slateInk font-medium">10 Hudson Yards<br />New York, NY 10001</p>
                  </div>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="flex-1 px-8 py-4 bg-crimson text-white rounded-full hover:bg-crimsonDark transition-colors font-semibold text-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                >
                  Apply Now
                </Link>
                <Link
                  to="/contact"
                  className="flex-1 px-8 py-4 bg-slateInk text-white rounded-full hover:bg-slateInk/90 transition-colors font-semibold text-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                >
                  Enroll Now
                </Link>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="bg-parchment rounded-2xl shadow-editorial p-8 md:p-12 border border-slate-100"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
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
                    placeholder="+1 (555) 123-4567"
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
                    <option value="academic">Academic Recognition</option>
                    <option value="personality">Personality Development</option>
                    <option value="skills">Skill Development</option>
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
                    className={`w-full py-4 rounded-full font-semibold text-white transition-all duration-300 ${formStatus === "success"
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
          </div>
        </div>
      </section>
    </>
  );
}