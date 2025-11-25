import React, { useState } from "react";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import ContactModal from "../components/ContactModal";

export default function Vision() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Hero
        tagline="Our Vision – Transforming Education Globally"
        headline={
          <>
            Our Vision.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
              Empowering Every Learner.
            </span>
          </>
        }
        subline="NovaVista is not for profit trust established to help students from all strata of society to get high quality education. We have been collaborating and organizing several programs and initiatives for promoting education at national and international levels, making individuals employable through skill-oriented courses."
        onOpenModal={openModal}
        backgroundImage="https://i.pinimg.com/1200x/bc/75/81/bc758165aee24c5fffafb553f1141c28.jpg"
        position="center"
      />

      {/* Our Vision Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            {/* Left Side - Image */}
            <motion.div
              className="relative order-2 lg:order-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop"
                alt="Our Vision"
                className="rounded-2xl shadow-lg w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] object-cover"
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
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-slateInk mb-4 sm:mb-6">Our Vision</h2>
              <div className="h-1 w-16 sm:w-20 bg-crimson mb-4 sm:mb-6 md:mb-8"></div>
              <p className="text-base sm:text-lg md:text-xl text-slateInk/80 leading-relaxed mb-4 sm:mb-6">
                NovaVista is not for profit trust established to help students from all strata of society to get high quality education. We have been collaborating & organizing several programs and initiates for promoting the education at national & international level. The only and ultimate aim of an individual is to get employed. For making the individual employable, NovaVista have collaborated with National and international universities for certification in skill-oriented courses.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Additional Content Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-slateInk mb-6">Our Commitment</h3>
            <div className="h-1 w-16 sm:w-20 bg-crimson mx-auto mb-8"></div>
            <p className="text-base sm:text-lg md:text-xl text-slateInk/80 leading-relaxed mb-8">
              We are committed to creating opportunities that bridge educational gaps and empower individuals to achieve their professional goals. Through our strategic partnerships and comprehensive programs, we aim to make quality education accessible to everyone, regardless of their background.
            </p>

            {/* Image Gallery */}
            <div className="grid md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-12">
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
                    src={[
                      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
                      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop",
                      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop"
                    ][i - 1]}
                    alt={`Vision ${i}`}
                    className="w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}

