import { motion } from 'motion/react';

export const Sidebar = ({ result }) => {
  if (
    !result ||
    !result.subTopics ||
    !result.questions ||
    !result.questions.short ||
    !result.questions.long
  ) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className="
        rounded-3xl
        border border-white/10
        bg-white/[0.03]
        backdrop-blur-2xl
        p-6
      "
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-2xl bg-violet-500/10 flex items-center justify-center">
            📌
          </div>

          <div>
            <h2 className="font-semibold text-white">Quick Revision</h2>

            <p className="text-xs text-gray-500">Exam focused overview</p>
          </div>
        </div>

        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-4">
          <p className="text-xs text-yellow-300 mb-2">🔥 Importance Level</p>

          <p className="text-sm text-white leading-relaxed">
            {result.importance}
          </p>
        </div>
      </div>

      {/* Subtopics */}
      <div
        className="
        rounded-3xl
        border border-white/10
        bg-white/[0.03]
        backdrop-blur-2xl
        p-6
      "
      >
        <h3 className="font-semibold text-white mb-5">⭐ Priority Topics</h3>

        <div className="space-y-4">
          {Object.entries(result.subTopics).map(([star, topics]) => (
            <motion.div
              whileHover={{ y: -2 }}
              key={star}
              className="
              rounded-2xl
              bg-[#12141d]
              border border-white/10
              p-4
            "
            >
              <div className="text-violet-300 text-sm font-medium mb-3">
                {star} Priority
              </div>

              <ul className="space-y-2 text-sm text-gray-400">
                {topics.map((topic, i) => (
                  <li key={i}>• {topic}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Questions */}
      <div
        className="
        rounded-3xl
        border border-white/10
        bg-white/[0.03]
        backdrop-blur-2xl
        p-6
      "
      >
        <h3 className="font-semibold text-white mb-5">
          ❓ Important Questions
        </h3>

        {/* Short */}
        <QuestionCard
          title="Short Questions"
          icon="⚡"
          questions={result.questions.short}
        />

        {/* Long */}
        <QuestionCard
          title="Long Questions"
          icon="📝"
          questions={result.questions.long}
        />

        {/* Diagram */}
        <div
          className="
          mt-5
          rounded-2xl
          bg-cyan-500/10
          border border-cyan-500/20
          p-4
        "
        >
          <p className="text-cyan-300 text-sm font-medium mb-3">
            📊 Diagram Question
          </p>

          <div className="text-sm text-gray-300">
            • {result.questions.diagram}
          </div>
        </div>
      </div>
    </div>
  );
};

function QuestionCard({ title, icon, questions }) {
  return (
    <div
      className="
      rounded-2xl
      bg-[#12141d]
      border border-white/10
      p-4
      mb-5
    "
    >
      <div className="text-sm font-medium text-violet-300 mb-3">
        {icon} {title}
      </div>

      <ul className="space-y-2 text-sm text-gray-400">
        {questions.map((q, i) => (
          <li key={i}>• {q}</li>
        ))}
      </ul>
    </div>
  );
}
