import { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../App';

export const Pricing = () => {
  const navigate = useNavigate();

  const [selectedPlan, setSelectedPlan] = useState(200);
  const [paying, setPaying] = useState(false);
  const [payingAmount, setPayingAmount] = useState(null);

  const handlePaying = async (amount) => {
    try {
      setPaying(true);
      setPayingAmount(amount);

      const result = await axios.post(
        serverUrl + '/api/credit/order',
        { amount },
        {
          withCredentials: true,
        }
      );

      if (result.data.url) {
        window.location.href = result.data.url;
      }

      setPaying(false);
    } catch (error) {
      console.log(error);
      setPaying(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0d13] text-white px-6 py-10">
      {/* Top */}
      <button
        onClick={() => navigate('/')}
        className="text-gray-400 hover:text-white mb-10"
      >
        ← Back
      </button>

      {/* Hero */}
      <div className="text-center mb-16">
        <div className="inline-flex px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm mb-6">
          ✨ Upgrade Your Learning
        </div>

        <h1 className="text-5xl font-bold">Buy Credits</h1>

        <p className="text-gray-400 mt-5 max-w-2xl mx-auto">
          Generate notes, revision packs, diagrams and charts with AI. Credits
          never expire.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
        <PricingCard
          title="Starter"
          price="₹99"
          amount={100}
          credits="50 Credits"
          description="Perfect for quick revisions and assignments."
          features={['AI Notes', 'Revision Mode', 'Diagrams', 'Charts']}
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
          onBuy={handlePaying}
          paying={paying}
          payingAmount={payingAmount}
        />

        <PricingCard
          popular
          title="Pro"
          price="₹199"
          amount={200}
          credits="120 Credits"
          description="Best value for students."
          features={[
            'Everything in Starter',
            'Priority Generation',
            'More Credits',
            'Better Value',
          ]}
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
          onBuy={handlePaying}
          paying={paying}
          payingAmount={payingAmount}
        />

        <PricingCard
          title="Pro Max"
          price="₹499"
          amount={500}
          credits="350 Credits"
          description="For heavy learners and complete syllabus."
          features={[
            'Maximum Credits',
            'Unlimited Revision',
            'Diagrams + Charts',
            'Fast Generation',
          ]}
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
          onBuy={handlePaying}
          paying={paying}
          payingAmount={payingAmount}
        />
      </div>

      {/* Footer */}
      <div className="max-w-5xl mx-auto mt-24 rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center">
        <h2 className="text-2xl font-semibold">Credits Never Expire</h2>

        <p className="text-gray-400 mt-4">
          Use your credits anytime to generate notes, diagrams and revision
          packs.
        </p>
      </div>
    </div>
  );
};

function PricingCard({
  title,
  price,
  amount,
  credits,
  description,
  features,
  popular,
  selectedPlan,
  setSelectedPlan,
  onBuy,
  paying,
  payingAmount,
}) {
  const selected = selectedPlan === amount;
  const isPaying = paying && payingAmount === amount;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      onClick={() => setSelectedPlan(amount)}
      className={`
      relative
      rounded-3xl
      border
      p-8
      cursor-pointer
      backdrop-blur-2xl
      transition
      ${
        selected
          ? 'border-violet-500 shadow-[0_0_80px_rgba(139,92,246,.15)]'
          : 'border-white/10'
      }
      bg-white/[0.03]
      ${popular ? 'scale-105' : ''}
      `}
    >
      {popular && (
        <div className="absolute top-5 right-5 px-3 py-1 rounded-full bg-violet-500 text-sm">
          Popular
        </div>
      )}

      <h2 className="text-2xl font-bold">{title}</h2>

      <p className="text-gray-400 mt-3">{description}</p>

      <div className="mt-10">
        <h1 className="text-5xl font-bold">{price}</h1>

        <p className="text-violet-400 mt-3">{credits}</p>
      </div>

      <button
        disabled={isPaying}
        onClick={(e) => {
          e.stopPropagation();
          onBuy(amount);
        }}
        className={`
        mt-10
        w-full
        h-14
        rounded-2xl
        font-semibold
        transition
        ${
          isPaying
            ? 'bg-gray-700 text-gray-400'
            : selected
              ? 'bg-white text-black'
              : 'bg-violet-500 hover:bg-violet-600'
        }
        `}
      >
        {isPaying ? 'Redirecting...' : 'Buy Now'}
      </button>

      <div className="space-y-5 mt-10">
        {features.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="h-6 w-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center">
              ✓
            </div>

            <p className="text-gray-300">{item}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default Pricing;
