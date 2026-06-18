import { motion } from 'motion/react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Navbar } from '../components/Navbar.jsx';
import {TopicForm} from '../components/TopicForm';
import {Sidebar} from '../components/Sidebar';
import {FinalResult} from '../components/FinalResult';

export const Notes = () => {
  const { userData } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  return (
    <div className="min-h-screen bg-[#08090d] text-white overflow-hidden relative">
      {/* background glow */}
      <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-violet-600/20 blur-[170px]" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/15 blur-[170px]" />

      <Navbar />

      <div className="relative max-w-7xl mx-auto px-6 py-8">
        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="inline-flex px-4 py-2 rounded-full border border-violet-500/20 bg-violet-500/10 text-violet-300 text-xs mb-5">
            ✨ AI Study Workspace
          </div>

          <h1 className="text-4xl font-bold">Generate Smart Notes</h1>

          <p className="text-gray-400 mt-3 max-w-2xl">
            Create exam notes, summaries, diagrams and revision packs in
            seconds.
          </p>
        </motion.div>

        {/* form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="
          rounded-3xl
          border border-white/10
          bg-white/[0.03]
          backdrop-blur-2xl
          p-8
          mb-10
        "
        >
          <TopicForm
            loading={loading}
            setResult={setResult}
            setLoading={setLoading}
            setError={setError}
          />
        </motion.div>

        {/* loading */}
        {loading && (
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1.4 }}
            className="
            rounded-3xl
            border border-violet-500/20
            bg-violet-500/10
            p-12
            text-center
            text-violet-300
            mb-8
          "
          >
            ⚡ Generating study material...
          </motion.div>
        )}

        {error && (
          <div
            className="
            mb-8
            rounded-2xl
            border border-red-500/20
            bg-red-500/10
            p-4
            text-red-300
          "
          >
            {error}
          </div>
        )}

        {/* empty state */}
        {!result && !loading && (
          <motion.div
            whileHover={{ y: -5 }}
            className="
            h-72
            rounded-3xl
            border border-dashed border-white/10
            bg-white/[0.03]
            flex flex-col items-center justify-center
            text-gray-500
          "
          >
            <div className="text-6xl mb-5">📚</div>

            <h3 className="font-semibold text-lg text-gray-300">
              Nothing generated yet
            </h3>

            <p className="text-sm mt-2">Start by entering a topic above</p>
          </motion.div>
        )}

        {/* result */}
        {result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="
            grid
            lg:grid-cols-4
            gap-6
          "
          >
            {/* sidebar */}
            <div
              className="
              lg:col-span-1
              rounded-3xl
              border border-white/10
              bg-white/[0.03]
              backdrop-blur-2xl
              p-5
            "
            >
              <Sidebar result={result} />
            </div>

            {/* content */}
            <div
              className="
              lg:col-span-3
              rounded-3xl
              border border-white/10
              bg-white/[0.03]
              backdrop-blur-2xl
              p-8
            "
            >
              <FinalResult result={result} />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

