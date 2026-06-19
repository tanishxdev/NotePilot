import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { motion } from 'motion/react';

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  securityLevel: 'loose',
});

const cleanMermaidChart = (diagram) => {
  if (!diagram) return '';

  let clean = diagram.replace(/\r\n/g, '\n').trim();

  if (!clean.startsWith('graph')) {
    clean = `graph TD\n${clean}`;
  }

  return clean;
};

const autoFixNodes = (diagram) => {
  let index = 0;
  const used = new Map();

  return diagram.replace(/\[(.*?)\]/g, (_, label) => {
    const key = label.trim();

    if (used.has(key)) {
      return used.get(key);
    }

    index++;

    const id = `N${index}`;
    const node = `${id}["${key}"]`;

    used.set(key, node);

    return node;
  });
};

function MermaidSetup({ diagram }) {
  const containerRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!diagram || !containerRef.current) return;

    const renderDiagram = async () => {
      try {
        setLoading(true);
        setError(false);

        containerRef.current.innerHTML = '';

        const uniqueId = `mermaid-${Date.now()}`;

        const safeChart = autoFixNodes(cleanMermaidChart(diagram));

        const { svg } = await mermaid.render(uniqueId, safeChart);

        containerRef.current.innerHTML = svg;

        setLoading(false);
      } catch (err) {
        console.error(err);

        setLoading(false);
        setError(true);
      }
    };

    renderDiagram();
  }, [diagram]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="
      rounded-3xl
      border border-white/10
      bg-white/[0.03]
      backdrop-blur-2xl
      overflow-hidden
    "
    >
      {/* Header */}
      <div
        className="
        border-b border-white/10
        px-6 py-5
        flex items-center justify-between
      "
      >
        <div>
          <h3 className="text-lg font-semibold text-white">Mermaid Diagram</h3>

          <p className="text-sm text-gray-400 mt-1">
            Visual representation of the topic
          </p>
        </div>

        <div
          className="
          h-11 w-11
          rounded-2xl
          bg-cyan-500/10
          border border-cyan-500/20
          flex items-center justify-center
        "
        >
          🧩
        </div>
      </div>

      {/* Body */}
      <div className="p-8">
        {loading && (
          <div
            className="
            h-60
            rounded-3xl
            border border-white/10
            bg-[#12141d]
            flex items-center justify-center
            text-gray-400
          "
          >
            Rendering Diagram...
          </div>
        )}

        {error && (
          <div
            className="
            h-60
            rounded-3xl
            border border-red-500/20
            bg-red-500/10
            flex items-center justify-center
            text-red-300
          "
          >
            Failed to render diagram.
          </div>
        )}

        <div
          className="
          overflow-x-auto
          rounded-3xl
          border border-white/10
          bg-[#12141d]
          p-8
        "
        >
          <div
            ref={containerRef}
            className="
            flex justify-center
            min-w-max
          "
          />
        </div>

        <p className="text-xs text-gray-500 mt-5">
          Save this diagram with a screenshot for future revision.
        </p>
      </div>
    </motion.div>
  );
}

export default MermaidSetup;
