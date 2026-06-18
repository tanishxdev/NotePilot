
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useDispatch } from "react-redux";
import { generateNotes } from "../services/api";
import { updateCredits } from "../redux/userSlice";

export const TopicForm = ({
  setResult,
  setLoading,
  loading,
  setError,
}) => {
  const dispatch = useDispatch();

  const [topic, setTopic] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [examType, setExamType] = useState("");
  const [revisionMode, setRevisionMode] = useState(false);
  const [includeDiagram, setIncludeDiagram] = useState(false);
  const [includeChart, setIncludeChart] = useState(false);

  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState("");

  const handleSubmit = async () => {
    if (!topic.trim()) {
      setError("Please enter the topic");
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);

    try {
      const result = await generateNotes({
        topic,
        classLevel,
        examType,
        revisionMode,
        includeDiagram,
        includeChart,
      });

      setResult(result.data);

      setTopic("");
      setClassLevel("");
      setExamType("");

      setRevisionMode(false);
      setIncludeDiagram(false);
      setIncludeChart(false);

      if (typeof result.creditsLeft === "number") {
        dispatch(updateCredits(result.creditsLeft));
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch notes from server");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading) {
      setProgress(0);
      setProgressText("");
      return;
    }

    let value = 0;

    const interval = setInterval(() => {
      value += Math.random() * 8;

      if (value >= 95) {
        value = 95;
        setProgressText("Almost done...");
        clearInterval(interval);
      } else if (value > 70) {
        setProgressText("Finalizing notes...");
      } else if (value > 40) {
        setProgressText("Processing content...");
      } else {
        setProgressText("Generating notes...");
      }

      setProgress(Math.floor(value));
    }, 700);

    return () => clearInterval(interval);
  }, [loading]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="
      rounded-3xl
      border border-white/10
      bg-white/[0.03]
      backdrop-blur-2xl
      p-8 md:p-10
    "
    >
      {/* Heading */}
      <div className="mb-8">
        <div className="inline-flex px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs mb-4">
          ✨ AI Generator
        </div>

        <h2 className="text-3xl font-bold text-white">
          Create Study Material
        </h2>

        <p className="text-gray-400 mt-2">
          Generate exam notes, revision packs, diagrams and charts.
        </p>
      </div>

      {/* Inputs */}
      <div className="grid md:grid-cols-2 gap-5">
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Topic (Web Development)"
          className="h-14 px-5 rounded-2xl bg-[#12141d] border border-white/10 text-white placeholder:text-gray-500 outline-none focus:border-violet-500/40"
        />

        <input
          value={classLevel}
          onChange={(e) => setClassLevel(e.target.value)}
          placeholder="Class / Level"
          className="h-14 px-5 rounded-2xl bg-[#12141d] border border-white/10 text-white placeholder:text-gray-500 outline-none focus:border-violet-500/40"
        />

        <input
          value={examType}
          onChange={(e) => setExamType(e.target.value)}
          placeholder="Exam Type"
          className="md:col-span-2 h-14 px-5 rounded-2xl bg-[#12141d] border border-white/10 text-white placeholder:text-gray-500 outline-none focus:border-violet-500/40"
        />
      </div>

      {/* Options */}
      <div className="mt-8 flex flex-wrap gap-4">
        <Option
          checked={revisionMode}
          label="Revision Mode"
          onClick={() => setRevisionMode(!revisionMode)}
        />

        <Option
          checked={includeDiagram}
          label="Include Diagram"
          onClick={() => setIncludeDiagram(!includeDiagram)}
        />

        <Option
          checked={includeChart}
          label="Include Charts"
          onClick={() => setIncludeChart(!includeChart)}
        />
      </div>

      {/* Button */}
      <motion.button
        onClick={handleSubmit}
        whileHover={!loading ? { y: -2 } : {}}
        whileTap={!loading ? { scale: 0.97 } : {}}
        disabled={loading}
        className={`
        mt-8 h-14 w-full rounded-2xl font-semibold text-lg transition
        ${
          loading
            ? "bg-gray-700 text-gray-400"
            : "bg-white text-black"
        }
      `}
      >
        {loading ? "Generating..." : "Generate Notes"}
      </motion.button>

      {/* Loading */}
      {loading && (
        <div className="mt-8">
          <div className="flex justify-between text-sm text-gray-400 mb-3">
            <span>{progressText}</span>
            <span>{progress}%</span>
          </div>

          <div className="h-3 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="
              h-full rounded-full
              bg-gradient-to-r
              from-violet-500
              via-cyan-500
              to-violet-500
            "
            />
          </div>

          <p className="text-xs text-gray-500 mt-4">
            This usually takes 1-3 minutes. Please don't refresh the page.
          </p>
        </div>
      )}
    </motion.div>
  );
};

function Option({ checked, label, onClick }) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`
      px-5 py-3 rounded-2xl border transition
      flex items-center gap-3
      ${
        checked
          ? "bg-violet-500/15 border-violet-500/30 text-violet-300"
          : "bg-[#12141d] border-white/10 text-gray-400"
      }
    `}
    >
      <div
        className={`
        h-2.5 w-2.5 rounded-full
        ${checked ? "bg-violet-400" : "bg-gray-600"}
      `}
      />

      {label}
    </motion.button>
  );
}
