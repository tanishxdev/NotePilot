import { motion } from 'motion/react';
import { Navbar } from '../components/Navbar.jsx';
import { Footer } from '../components/Footer.jsx';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#08090d] overflow-hidden text-white relative">
      {/* background */}
      <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-violet-700/20 blur-[150px]" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/15 blur-[150px]" />

      <Navbar />

      {/* hero */}
      <section className="relative max-w-7xl mx-auto px-8 pt-28 pb-24 grid lg:grid-cols-2 gap-20 items-center">
        {/* left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="inline-flex px-4 py-2 rounded-full border border-violet-500/20 bg-violet-500/10 text-violet-300 text-sm mb-7">
            ✨ AI-Powered Learning Workspace
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
            Turn Topics Into
            <br />
            Beautiful Notes.
          </h1>

          <p className="mt-7 text-lg text-gray-400 max-w-xl leading-relaxed">
            Generate organized notes, diagrams, summaries and revision packs
            instantly using AI. Learn faster and stay focused.
          </p>

          <div className="flex gap-4 mt-10">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="px-7 py-4 rounded-2xl bg-white text-black font-semibold"
              onClick={() => navigate('/notes')}
            >
              Start Writing
            </motion.button>

            <button className="px-7 py-4 rounded-2xl border border-white/10 bg-white/[0.03] text-gray-300">
              Watch Demo
            </button>
          </div>

          <div className="flex gap-10 mt-10 text-sm text-gray-500">
            <div>
              <p className="text-2xl font-semibold text-white">50+</p>
              Free Credits
            </div>

            <div>
              <p className="text-2xl font-semibold text-white">PDF</p>
              Export Ready
            </div>

            <div>
              <p className="text-2xl font-semibold text-white">AI</p>
              Smart Notes
            </div>
          </div>
        </motion.div>

        {/* right */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative"
        >
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-8 shadow-2xl">
            <div className="space-y-5">
              <div className="rounded-2xl bg-violet-500/10 border border-violet-500/20 p-5">
                <p className="text-violet-300 text-sm mb-2">Biology Chapter</p>

                <h3 className="font-semibold">Cell Structure & Function</h3>

                <p className="text-gray-400 text-sm mt-3">
                  Summary, diagrams and revision points generated.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 p-5 bg-white/[0.02]">
                <div className="flex justify-between">
                  <span className="text-gray-400">AI Notes</span>

                  <span className="text-cyan-300">Ready</span>
                </div>

                <div className="h-2 bg-white/10 rounded-full mt-5">
                  <div className="h-full rounded-full bg-cyan-400 w-[80%]" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* features */}
      <section className="max-w-7xl mx-auto px-8 pb-28">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          <Feature
            icon="📝"
            title="Smart Notes"
            des="Generate exam-ready notes instantly."
          />

          <Feature
            icon="🧠"
            title="AI Summaries"
            des="Understand difficult concepts faster."
          />

          <Feature
            icon="📊"
            title="Visual Diagrams"
            des="Flowcharts and structures generated automatically."
          />

          <Feature
            icon="📄"
            title="PDF Export"
            des="Download beautiful printable notes."
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

function Feature({ icon, title, des }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="
      rounded-3xl
      border border-white/10
      bg-white/[0.03]
      backdrop-blur-xl
      p-6
      transition-all
      hover:border-violet-500/20
    "
    >
      <div className="w-14 h-14 rounded-2xl bg-violet-500/10 flex items-center justify-center text-3xl mb-5">
        {icon}
      </div>

      <h3 className="font-semibold text-lg mb-3">{title}</h3>

      <p className="text-gray-400 text-sm leading-relaxed">{des}</p>
    </motion.div>
  );
}
