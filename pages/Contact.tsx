import React, { useState } from "react";
import { motion } from "framer-motion";
import { submitContactForm } from "../services/api";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    
    try {
      await submitContactForm(payload);
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <section className="py-24 bg-white relative">
      <div className="absolute top-0 left-0 w-full h-64 bg-slateInk z-0"></div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-[1fr,1.2fr]">
          
          {/* Contact Info Side */}
          <div className="bg-slateInk text-white p-12 lg:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-crimson rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
              <p className="kicker text-white/50 mb-6">Get in Touch</p>
              <h1 className="text-4xl md:text-5xl font-serif mb-8">Begin Your Transformation</h1>
              <p className="text-white/70 text-lg mb-12 leading-relaxed">
                Whether you are seeking academic recognition or personal development, our strategists are ready to guide you through the process.
              </p>

              <div className="space-y-8">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-2">General Inquiries</p>
                  <p className="font-serif text-xl">+1 (415) 555-0110</p>
                  <p className="text-white/60">admissions@novavista.edu</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-2">Visit Us</p>
                  <p className="font-serif text-xl">10 Hudson Yards</p>
                  <p className="text-white/60">New York, NY 10001</p>
                </div>
              </div>

              <div className="mt-16 pt-8 border-t border-white/10">
                <p className="text-sm text-white/40 italic">
                  "Education is not preparation for life; education is life itself."
                </p>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="p-12 lg:p-16 bg-white">
            <h2 className="text-2xl font-serif text-slateInk mb-8">Send us a message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
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
                  <option value="academic">Academic Recognition</option>
                  <option value="skills">Skill & Personality Development</option>
                  <option value="other">Other Inquiry</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slateInk/50">Message</label>
                <textarea 
                  name="message" 
                  required 
                  rows={4} 
                  placeholder="Tell us about your goals..."
                  className="w-full border-b border-slate-200 py-3 text-slateInk focus:outline-none focus:border-crimson transition-colors bg-transparent resize-none" 
                />
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className={`w-full py-4 rounded-full font-semibold text-white transition-all duration-300 ${
                    status === "success" 
                      ? "bg-green-700 cursor-default" 
                      : "bg-crimson hover:bg-crimsonDark shadow-lg hover:shadow-xl shadow-crimson/20"
                  }`}
                >
                  {status === "loading" ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      Sending...
                    </span>
                  ) : status === "success" ? (
                    "Message Sent Successfully"
                  ) : (
                    "Submit Application"
                  )}
                </button>
                {status === "error" && (
                  <p className="text-red-600 text-sm mt-4 text-center">Something went wrong. Please try again.</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}