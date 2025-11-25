import React, { useState } from "react";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import ContactModal from "../components/ContactModal";

export default function Offices() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const offices = [
    { country: "India", address: "B37, Lajpat Nagar-2, New Delhi, 110024", image: "https://i.pinimg.com/1200x/51/53/f3/5153f376e94763d06c160d13ca83f098.jpg" },
    { country: "Germany", address: "Truderinger Strasse 206 Munich, 81825", image: "https://i.pinimg.com/1200x/26/49/02/26490286ff80f1866f0fe9165a8000af.jpg" },
    { country: "USA", address: "3314 Windridge Ave, Thousand Oaks, CA, 91362", image: "https://i.pinimg.com/1200x/cd/86/1f/cd861f85983f08d819c04215aff10325.jpg" },
    { country: "Bangladesh", address: "Shimanto Square Market, Shope no. 262, 2nd Floor, Dhanmondi, Dhaka.", image: "https://i.pinimg.com/736x/ce/83/11/ce8311c943d7800f4c98e14d2b8be20e.jpg" },
    { country: "Qatar", address: "Jabir Ibn Hayyan Street, Abu Dhabi, 110786", image: "https://i.pinimg.com/1200x/ca/8e/d3/ca8ed34aa738a07d0d0d31689d971775.jpg" },
    { country: "Nepal", address: "Baluwatar 4 Kathmandu Nepal – 44616", image: "https://i.pinimg.com/736x/3f/11/30/3f11304b704850cb6ad8e27e6a3a56cb.jpg" }
  ];

  return (
    <>
      <Hero
        tagline="Nova Vista – Education Beyond Boundaries"
        headline={
          <>
            Connecting Continents.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
              Serving Students Globally.
            </span>
          </>
        }
        subline="With offices spanning across India, Germany, USA, Bangladesh, Qatar, and Nepal, we create initiatives that assist students, scholars, and expand teaching and learning across cultures. Visit us to explore educational opportunities and promote educational equity."
        onOpenModal={openModal}
        backgroundImage="https://i.pinimg.com/1200x/ca/23/8c/ca238c86c1618bc0a12e30883c05cf77.jpg"
      />

      {/* Our Offices Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-8 sm:mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-slateInk mb-4 sm:mb-6">Our Offices</h2>
            <div className="h-1 w-16 sm:w-20 bg-crimson mx-auto mb-4 sm:mb-6 md:mb-8"></div>
            <p className="text-base sm:text-lg md:text-xl text-slateInk/80 max-w-3xl mx-auto px-2 sm:px-0">
              We have a global presence with offices in multiple countries, ensuring we can provide support and services to students and partners worldwide.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {offices.map((office, index) => (
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
                <div className="p-4 sm:p-5 md:p-6">
                  <h3 className="text-lg sm:text-xl font-serif text-slateInk mb-2 sm:mb-3">{office.country}</h3>
                  <p className="text-slateInk/70 text-xs sm:text-sm leading-relaxed">{office.address}</p>
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

