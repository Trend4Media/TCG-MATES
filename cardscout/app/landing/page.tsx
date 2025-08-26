'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import LandingNavigation from '@/components/LandingNavigation';
import InteractiveDemo from '@/components/InteractiveDemo';

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      text: "TCG-MATES revolutionierte meine Kartensuche. Endlich finde ich jede Karte in Sekunden!",
      author: "Max Müller",
      role: "Pokemon Sammler"
    },
    {
      text: "Die beste Plattform für Trading Card Games. Professionell und blitzschnell.",
      author: "Sarah Schmidt",
      role: "TCG Händlerin"
    },
    {
      text: "Unglaublich intuitive Suche mit mächtigen Filtern. Genau was ich brauchte!",
      author: "Tom Weber",
      role: "Competitive Player"
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const features = [
    {
      icon: "🔍",
      title: "Intelligente Suche",
      description: "Mächtige Lucene-Syntax für präzise Suchergebnisse",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: "⚡",
      title: "Blitzschnell",
      description: "Millisekunden-Antwortzeiten dank optimierter API",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: "🎨",
      title: "Modern Design",
      description: "Intuitive Benutzeroberfläche mit responsivem Layout",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: "🔒",
      title: "Sicher & Zuverlässig",
      description: "Enterprise-Level Sicherheit und 99.9% Uptime",
      color: "from-orange-500 to-red-500"
    }
  ];

  const stats = [
    { number: "50K+", label: "Karten in der Datenbank" },
    { number: "10K+", label: "Aktive Nutzer" },
    { number: "99.9%", label: "Uptime" },
    { number: "< 100ms", label: "Durchschnittliche Antwortzeit" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <LandingNavigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                TCG-MATES
              </span>
              <br />
              <span className="text-3xl md:text-5xl text-gray-300">
                Die Zukunft der Kartensuche
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
              Entdecke, durchsuche und finde jede Pokemon-Karte mit unserer revolutionären 
              KI-gestützten Suchplattform. Schneller. Smarter. Besser.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link
                href="/"
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25"
              >
                🚀 Kostenlos starten
              </Link>
              <button className="border border-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all">
                📹 Demo ansehen
              </button>
            </div>

            {/* Floating Cards Animation */}
            <div className="relative">
              <motion.div 
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-0 left-1/4 w-16 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg shadow-xl opacity-80"
              />
              <motion.div 
                animate={{ 
                  y: [0, 10, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute top-0 right-1/4 w-16 h-24 bg-gradient-to-br from-red-400 to-pink-500 rounded-lg shadow-xl opacity-80"
              />
              <motion.div 
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 3, 0]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
                className="absolute top-10 left-1/3 w-16 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg shadow-xl opacity-80"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Warum <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">TCG-MATES</span>?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Modernste Technologie trifft auf intuitive Benutzerführung
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 group-hover:transform group-hover:scale-105">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:rotate-12 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl p-12 backdrop-blur-lg border border-white/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-gray-400 text-sm md:text-base">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Erlebe die <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Magie</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
              Sieh selbst, wie einfach und mächtig unsere Kartensuche ist
            </p>
          </motion.div>

          <InteractiveDemo />
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Was unsere <span className="bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent">Community</span> sagt
            </h2>
          </motion.div>

          <div className="relative">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white/5 backdrop-blur-lg rounded-3xl p-12 border border-white/10 text-center"
            >
              <div className="text-6xl mb-6">💬</div>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 italic leading-relaxed">
                &quot;{testimonials[currentTestimonial].text}&quot;
              </p>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  {testimonials[currentTestimonial].author[0]}
                </div>
                <div>
                  <div className="text-white font-semibold">{testimonials[currentTestimonial].author}</div>
                  <div className="text-gray-400 text-sm">{testimonials[currentTestimonial].role}</div>
                </div>
              </div>
            </motion.div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial ? 'bg-blue-500' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
              Bereit für die <br />
              <span className="bg-gradient-to-r from-yellow-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
                Kartensuche der Zukunft?
              </span>
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Schließe dich tausenden von Sammlern an und revolutioniere deine Kartensuche noch heute.
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <Link
                href="/"
                className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-12 py-4 rounded-full text-xl font-bold hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25"
              >
                🚀 Kostenlos loslegen
              </Link>
              <button className="inline-block border-2 border-white/30 text-white px-12 py-4 rounded-full text-xl font-bold hover:bg-white/10 transition-all">
                📞 Kontakt aufnehmen
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">TCG</span>
                </div>
                <span className="text-white font-bold text-xl">MATES</span>
              </div>
              <p className="text-gray-400 mb-4">
                Die modernste Plattform für Trading Card Game Enthusiasten.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Produkt</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Kartensuche</Link></li>
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Preise</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Ressourcen</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Dokumentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Unternehmen</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Über uns</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Karriere</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Kontakt</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Impressum</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 TCG-MATES. Alle Rechte vorbehalten. Made with ❤️ for the TCG Community.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}