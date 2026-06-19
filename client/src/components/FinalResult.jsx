import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import MermaidSetup from './MermaidSetup';
import RechartSetUp from './RechartSetUp';
import { downloadPdf } from '../services/api';

const markDownComponent = {
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold text-white mb-6">{children}</h1>
  ),

  h2: ({ children }) => (
    <h2 className="text-2xl font-semibold text-violet-300 mt-8 mb-4">
      {children}
    </h2>
  ),

  h3: ({ children }) => (
    <h3 className="text-xl font-medium text-cyan-300 mt-6 mb-3">{children}</h3>
  ),

  p: ({ children }) => (
    <p className="text-gray-300 leading-8 mb-4">{children}</p>
  ),

  ul: ({ children }) => (
    <ul className="list-disc ml-6 space-y-2 text-gray-300">{children}</ul>
  ),

  li: ({ children }) => <li className="marker:text-violet-400">{children}</li>,
};

export const FinalResult = ({ result }) => {
  const [quickRevision, setQuickRevision] = useState(false);

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
    <div className="space-y-8">
      {/* Header */}
      <div
        className="
        rounded-3xl
        border border-white/10
        bg-white/[0.03]
        backdrop-blur-2xl
        p-8
        flex flex-col lg:flex-row
        justify-between gap-6
      "
      >
        <div>
          <h1 className="text-4xl font-bold text-white">Generated Notes</h1>

          <p className="text-gray-400 mt-2">
            AI generated study material and revision content
          </p>
        </div>

        <div className="flex gap-4 flex-wrap">
          <button
            onClick={() => setQuickRevision(!quickRevision)}
            className="
            px-5 py-3
            rounded-2xl
            bg-violet-500/10
            border border-violet-500/20
            text-violet-300
            hover:bg-violet-500/20
          "
          >
            {quickRevision ? 'Full Notes' : 'Quick Revision'}
          </button>

          <button
            onClick={() => downloadPdf(result)}
            className="
            px-5 py-3
            rounded-2xl
            bg-white
            text-black
            font-semibold
          "
          >
            Download PDF
          </button>
        </div>
      </div>

      {/* Sub Topics */}
      {!quickRevision && (
        <Card>
          <SectionHeader icon="📚" title="Sub Topics" />

          <div className="grid md:grid-cols-3 gap-5">
            {Object.entries(result.subTopics).map(([priority, topics]) => (
              <div
                key={priority}
                className="
                rounded-2xl
                border border-white/10
                bg-[#12141d]
                p-5
              "
              >
                <h3 className="font-semibold text-violet-300 mb-4">
                  {priority} Priority
                </h3>

                <ul className="space-y-2 text-gray-300 text-sm">
                  {topics.map((topic, i) => (
                    <li key={i}>• {topic}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Detailed Notes */}
      {!quickRevision && (
        <Card>
          <SectionHeader icon="📝" title="Detailed Notes" />

          <ReactMarkdown components={markDownComponent}>
            {result.notes}
          </ReactMarkdown>
        </Card>
      )}

      {/* Revision */}
      {quickRevision && (
        <div
          className="
          rounded-3xl
          p-8
          border border-green-500/20
          bg-green-500/10
        "
        >
          <SectionHeader icon="⚡" title="Quick Revision" />

          <ul className="space-y-3 text-gray-200">
            {result.revisionPoints.map((point, index) => (
              <li key={index}>• {point}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Diagram */}
      {result.diagram?.data && (
        <Card>
          <SectionHeader icon="📊" title="Diagram" />

          <MermaidSetup diagram={result.diagram.data} />

          <p className="text-xs text-gray-500 mt-4">
            Save this diagram using a screenshot for future revision.
          </p>
        </Card>
      )}

      {/* Charts */}
      {result.charts?.length > 0 && (
        <Card>
          <SectionHeader icon="📈" title="Visual Charts" />

          <RechartSetUp charts={result.charts} />

          <p className="text-xs text-gray-500 mt-4">
            Save these charts using screenshots for future reference.
          </p>
        </Card>
      )}

      {/* Questions */}
      <div className="grid md:grid-cols-3 gap-6">
        <QuestionCard
          title="Short Questions"
          color="cyan"
          questions={result.questions.short}
        />

        <QuestionCard
          title="Long Questions"
          color="violet"
          questions={result.questions.long}
        />

        <QuestionCard
          title="Diagram Question"
          color="emerald"
          questions={[result.questions.diagram]}
        />
      </div>
    </div>
  );
};

function Card({ children }) {
  return (
    <div
      className="
      rounded-3xl
      border border-white/10
      bg-white/[0.03]
      backdrop-blur-2xl
      p-8
    "
    >
      {children}
    </div>
  );
}

function SectionHeader({ icon, title }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div
        className="
        h-12 w-12
        rounded-2xl
        bg-violet-500/10
        border border-violet-500/20
        flex items-center justify-center
      "
      >
        {icon}
      </div>

      <div>
        <h2 className="text-xl font-semibold text-white">{title}</h2>

        <div className="w-16 h-[2px] bg-violet-500 rounded-full mt-2"></div>
      </div>
    </div>
  );
}

function QuestionCard({ title, color, questions }) {
  const colors = {
    cyan: 'border-cyan-500/20 bg-cyan-500/10',
    violet: 'border-violet-500/20 bg-violet-500/10',
    emerald: 'border-emerald-500/20 bg-emerald-500/10',
  };

  return (
    <div
      className={`
      rounded-3xl
      border
      p-6
      ${colors[color]}
    `}
    >
      <h3 className="text-lg font-semibold text-white mb-5">{title}</h3>

      <ul className="space-y-3 text-gray-300 text-sm">
        {questions.map((question, index) => (
          <li key={index}>• {question}</li>
        ))}
      </ul>
    </div>
  );
}
