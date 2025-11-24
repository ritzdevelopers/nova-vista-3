import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { submitContactForm } from "../services/api";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormStatus("loading");
    const payload = {
      fullName: formData.name,
      email: formData.email,
      message: formData.message,
      phone: formData.phone,
      program: "modal-inquiry"
    };

    try {
      await submitContactForm(payload);
      setFormStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => {
        setFormStatus("idle");
        onClose();
      }, 2000);
    } catch (err) {
      setFormStatus("error");
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col lg:flex-row">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-white transition-colors shadow-lg"
              >
                <span className="text-2xl text-slateInk">×</span>
              </button>

              {/* Left Side - Content */}
              <div className="lg:w-1/2 bg-gradient-to-br from-slateInk to-slateInk/90 text-white p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative z-10"
                >
                  <h2 className="text-3xl md:text-4xl font-serif mb-6">Start Your Journey with Ignited Brains</h2>
                  <div className="h-1 w-20 bg-crimson mb-8"></div>
                  
                  <div className="space-y-6 mb-8">
                    <div>
                      <h3 className="text-xl font-serif mb-3">Transform Your Future</h3>
                      <p className="text-white/80 leading-relaxed">
                        Join thousands of students and professionals who have transformed their careers through our comprehensive education programs and strategic partnerships.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-serif mb-3">Why Choose Us?</h3>
                      <ul className="space-y-2 text-white/80">
                        <li className="flex items-start gap-2">
                          <span className="text-crimson mt-1">✓</span>
                          <span>Global recognition and certifications</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-crimson mt-1">✓</span>
                          <span>Expert faculty and industry professionals</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-crimson mt-1">✓</span>
                          <span>Flexible online and offline programs</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-crimson mt-1">✓</span>
                          <span>Career-focused skill development</span>
                        </li>
                      </ul>
                    </div>

                    <div className="pt-6 border-t border-white/20">
                      <p className="text-white/90 font-semibold mb-2">Get in Touch</p>
                      <p className="text-white/70 text-sm">+91 97735 09497</p>
                      <p className="text-white/70 text-sm">ignitedbrains.india@gmail.com</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Side - Form */}
              <div className="lg:w-1/2 p-8 md:p-12 overflow-y-auto">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-2xl md:text-3xl font-serif text-slateInk mb-2">Get Started Today</h3>
                  <p className="text-slateInk/60 mb-8">Fill out the form below and our team will get back to you shortly.</p>

                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slateInk/50">Full Name</label>
                      <input
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="w-full border-b-2 border-slate-200 py-3 text-slateInk focus:outline-none focus:border-crimson transition-colors bg-transparent"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slateInk/50">Email Address</label>
                      <input
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                        className="w-full border-b-2 border-slate-200 py-3 text-slateInk focus:outline-none focus:border-crimson transition-colors bg-transparent"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slateInk/50">Phone Number</label>
                      <input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number (optional)"
                        className="w-full border-b-2 border-slate-200 py-3 text-slateInk focus:outline-none focus:border-crimson transition-colors bg-transparent"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slateInk/50">Message</label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your goals and how we can help..."
                        className="w-full border-b-2 border-slate-200 py-3 text-slateInk focus:outline-none focus:border-crimson transition-colors bg-transparent resize-none"
                      />
                    </div>

                    <div className="pt-4">
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
                            Submitting...
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

