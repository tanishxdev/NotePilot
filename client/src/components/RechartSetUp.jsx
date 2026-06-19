import {
  Bar,
  BarChart,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from 'recharts';
import { motion } from 'motion/react';

const COLORS = [
  '#8b5cf6',
  '#06b6d4',
  '#22c55e',
  '#f59e0b',
  '#ef4444',
  '#ec4899',
];

function RechartSetUp({ charts }) {
  if (!charts || charts.length === 0) return null;

  return (
    <div className="space-y-8">
      {charts.map((chart, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
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
            px-6 py-5
            border-b border-white/10
            flex items-center justify-between
          "
          >
            <div>
              <h3 className="text-lg font-semibold text-white">
                {chart.title}
              </h3>

              <p className="text-sm text-gray-400 mt-1">
                Visual representation of important concepts
              </p>
            </div>

            <div
              className="
              h-10 w-10
              rounded-2xl
              bg-violet-500/10
              border border-violet-500/20
              flex items-center justify-center
            "
            >
              📊
            </div>
          </div>

          {/* Chart */}
          <div className="h-[350px] p-6">
            <ResponsiveContainer width="100%" height="100%">
              {/* BAR */}
              {chart.type === 'bar' && (
                <BarChart data={chart.data}>
                  <CartesianGrid stroke="#2b2e3a" strokeDasharray="4 4" />

                  <XAxis
                    dataKey="name"
                    stroke="#94a3b8"
                    tick={{ fill: '#94a3b8' }}
                  />

                  <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8' }} />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#11131b',
                      border: '1px solid rgba(255,255,255,.1)',
                      borderRadius: '18px',
                    }}
                    labelStyle={{ color: '#fff' }}
                  />

                  <Legend />

                  <Bar dataKey="value" radius={[12, 12, 0, 0]}>
                    {chart.data.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              )}

              {/* LINE */}
              {chart.type === 'line' && (
                <LineChart data={chart.data}>
                  <CartesianGrid stroke="#2b2e3a" strokeDasharray="4 4" />

                  <XAxis
                    dataKey="name"
                    stroke="#94a3b8"
                    tick={{ fill: '#94a3b8' }}
                  />

                  <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8' }} />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#11131b',
                      border: '1px solid rgba(255,255,255,.1)',
                      borderRadius: '18px',
                    }}
                    labelStyle={{ color: '#fff' }}
                  />

                  <Legend />

                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#8b5cf6"
                    strokeWidth={4}
                    dot={{
                      r: 6,
                      fill: '#8b5cf6',
                    }}
                    activeDot={{
                      r: 8,
                    }}
                  />
                </LineChart>
              )}

              {/* PIE */}
              {chart.type === 'pie' && (
                <PieChart>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#11131b',
                      border: '1px solid rgba(255,255,255,.1)',
                      borderRadius: '18px',
                    }}
                    labelStyle={{ color: '#fff' }}
                  />

                  <Legend />

                  <Pie
                    data={chart.data}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={120}
                    innerRadius={65}
                    paddingAngle={3}
                    label
                  >
                    {chart.data.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              )}
            </ResponsiveContainer>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default RechartSetUp;
