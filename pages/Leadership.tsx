import React, { useState } from "react";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import ContactModal from "../components/ContactModal";

export default function Leadership() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  const leadership = [
    { name: "Prof. Mahesh Gandhi", role: "President", location: "India", image: "https://i.pinimg.com/1200x/62/75/28/627528d072989c093a3037d4cf661e38.jpg" },
    { name: "Shashank Jain", role: "Director", location: "Germany", image: "https://i.pinimg.com/1200x/67/f1/fc/67f1fc92d0c7d29937c54f5d16896f37.jpg" },
    { name: "Deepika Malik", role: "Director", location: "UAE", image: "https://i.pinimg.com/1200x/58/a3/da/58a3daee0582ce77e033a596e43227f8.jpg" },
    { name: "Ms. Benu Sehgal", role: "Director", location: "India", image: "https://i.pinimg.com/1200x/ed/de/91/edde91ae9c2f47ce214d0d3329f9184b.jpg" },
    { name: "CA Deepak Kumar", role: "Director", location: "India", image: "https://i.pinimg.com/736x/62/67/f7/6267f738ca2f2a9341241caa17f34a85.jpg" },
    { name: "Naveen Kapoor", role: "Director", location: "USA", image: "https://i.pinimg.com/736x/ca/15/da/ca15da5c3bb6fed5a5da22a95ef313d5.jpg" }
  ];

  return (
    <>
      <Hero
        tagline="Nova Vista – Education Beyond Boundaries"
        headline={
          <>
            Our Leadership.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
              Transforming Education Globally.
            </span>
          </>
        }
        subline="Our leadership team brings together experienced professionals from around the world, dedicated to transforming education and creating opportunities for students globally. We drive initiatives that promote educational equity and workforce readiness."
        onOpenModal={openModal}
        backgroundImage="https://i.pinimg.com/1200x/2f/54/bb/2f54bbfc53cd40fcc71ad9b191c30ec0.jpg"
      />

      {/* Leadership Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-8 sm:mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-slateInk mb-4 sm:mb-6">LEADERSHIP</h2>
            <div className="h-1 w-16 sm:w-20 bg-crimson mx-auto mb-4 sm:mb-6 md:mb-8"></div>
            <p className="text-base sm:text-lg md:text-xl text-slateInk/80 max-w-4xl mx-auto px-2 sm:px-0">
              Leading global education transformation through strategic collaboration, innovative programs, and inclusive initiatives that empower learners and strengthen workforce readiness across nations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
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
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-4 sm:p-5 md:p-6 text-center">
                  <h3 className="text-lg sm:text-xl font-serif text-slateInk mb-1 sm:mb-2">{member.name}</h3>
                  <p className="text-crimson font-semibold mb-1 text-sm sm:text-base">{member.role}</p>
                  <p className="text-slateInk/60 text-xs sm:text-sm">{member.location}</p>
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

