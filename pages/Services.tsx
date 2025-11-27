import React, { useState } from "react";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import ContactModal from "../components/ContactModal";

export default function Services() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const services = [
    {
      title: "Join Ventures, Collaboration & Tieups",
      image: "/s2/s2-i1.jpg",
      description: "Building strategic partnerships and collaborations with educational institutions worldwide."
    },
    {
      title: "Establishment of School, Colleges & Universities & Off-Shore Campuses",
      image: "/s2/s2-i2.jpg",
      description: "Supporting the establishment and development of educational institutions globally."
    },
    {
      title: "Training and Development Programs for faculty & corporate",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop",
      description: "Comprehensive training programs designed for educators and corporate professionals."
    },
    {
      title: "Counselings and Recruitment of Student from Abroad",
      image: "https://i.pinimg.com/1200x/52/36/57/523657cecd6bbd43de575344e8b1b152.jpg",
      description: "Expert guidance and support for international student recruitment and counseling."
    },
    {
      title: "Twinning, Exchange and dual certification program",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop",
      description: "Facilitating international exchange programs and dual certification opportunities."
    },
    {
      title: "Admissions for MBBS for the Medical Colleges of Bangladesh & Russia",
      image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&h=400&fit=crop",
      description: "Specialized admission services for medical programs in Bangladesh and Russia."
    }
  ];

  return (
    <>
<Hero
  tagline="Nova Vista – Learning Without Limits"
  headline={
    <>
      Global Education.<br/>
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
        Empowering Learners.
      </span>
    </>
  }
  subline="NovaVista works worldwide with governments, educators, and employers to create simple, effective learning programs for students and professionals."
  onOpenModal={openModal}
  backgroundImage="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=2400&h=1600&fit=crop"
/>



      {/* Our Services Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-8 sm:mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-slateInk mb-4 sm:mb-6">OUR SERVICES</h2>
            <div className="h-1 w-16 sm:w-20 bg-crimson mx-auto mb-4 sm:mb-6 md:mb-8"></div>
            <p className="text-base sm:text-lg md:text-xl text-slateInk/80 max-w-4xl mx-auto px-2 sm:px-0">
              Delivering global education solutions that empower learners, support policymakers, strengthen institutions, and drive equitable, cross-cultural growth through innovative programs and strategic partnerships.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
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
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-4 sm:p-5 md:p-6">
                  <h3 className="text-lg sm:text-xl font-serif text-slateInk mb-2 sm:mb-3 group-hover:text-crimson transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slateInk/70 text-xs sm:text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}

