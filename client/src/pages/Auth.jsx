import { motion } from 'motion/react';
import { FcGoogle } from 'react-icons/fc';

export const Auth = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-[#08090d] text-white relative">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-violet-600/20 blur-[160px]" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/15 blur-[160px]" />

      <div className="relative max-w-7xl mx-auto px-8 py-5">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-xl font-bold tracking-tight">NotePilot AI</h1>

            <p className="text-xs text-gray-400 mt-1">
              Smarter learning with AI
            </p>
          </div>

          <div className="hidden md:flex">
            <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
              Built for students
            </div>
          </div>
        </motion.header>

        {/* Main */}
        <main className="grid lg:grid-cols-2 gap-14 items-center min-h-[calc(100vh-90px)]">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="inline-flex px-4 py-2 rounded-full border border-violet-500/20 bg-violet-500/10 text-violet-300 text-xs mb-5">
              ✨ AI-Powered Study Workspace
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
              Learn Faster.
              <br />
              Score Better.
            </h1>

            <p className="mt-5 text-base text-gray-400 max-w-xl leading-relaxed">
              Generate organized notes, simplify concepts, visualize ideas, and
              export beautiful PDFs—all in seconds.
            </p>

            <motion.button
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="
              mt-8
              flex items-center gap-4
              px-6 py-3
              rounded-xl
              bg-white
              text-black
              font-medium
              shadow-2xl
            "
            >
              <FcGoogle size={22} />
              Continue with Google
            </motion.button>

            <div className="flex flex-wrap gap-6 mt-6 text-sm text-gray-500">
              <span>✓ Free credits included</span>
              <span>✓ No credit card</span>
              <span>✓ Instant access</span>
            </div>
          </motion.div>

          {/* Right */}
          <div className="grid grid-cols-2 gap-4">
            <Feature
              icon="📝"
              title="Smart Notes"
              des="AI-generated notes optimized for exams."
            />

            <Feature
              icon="🧠"
              title="Concept Simplifier"
              des="Understand difficult topics easily."
            />

            <Feature
              icon="📊"
              title="Visual Learning"
              des="Generate charts and flow diagrams."
            />

            <Feature
              icon="📚"
              title="Revision Packs"
              des="Quick summaries for last-minute study."
            />

            <Feature
              icon="📄"
              title="PDF Export"
              des="Download beautifully formatted PDFs."
            />

            <Feature
              icon="⚡"
              title="Instant Results"
              des="Create content within seconds."
            />
          </div>
        </main>
      </div>
    </div>
  );
};

function Feature({ icon, title, des }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="
      rounded-2xl
      p-5
      border border-white/10
      bg-white/[0.03]
      backdrop-blur-xl
      hover:border-violet-500/20
      hover:bg-white/[0.05]
      transition-all
    "
    >
      <div
        className="
        w-12 h-12
        rounded-xl
        bg-violet-500/10
        flex items-center justify-center
        text-2xl
        mb-4
      "
      >
        {icon}
      </div>

      <h3 className="text-base font-semibold mb-2">{title}</h3>

      <p className="text-[13px] leading-relaxed text-gray-400">{des}</p>
    </motion.div>
  );
}
