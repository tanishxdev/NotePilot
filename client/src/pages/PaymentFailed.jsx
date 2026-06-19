import { useEffect } from 'react';
import { motion } from 'motion/react';
import { FaTimesCircle } from 'react-icons/fa';
import { FiArrowLeft } from 'react-icons/fi';
import { getCurrentUser } from '../services/api';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const PaymentFailed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUser(dispatch);

    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [dispatch, navigate]);

  return (
    <div className="min-h-screen bg-[#0b0d14] flex items-center justify-center px-6 overflow-hidden">

      {/* background glow */}
      <div className="absolute h-72 w-72 rounded-full bg-red-500/10 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: .6 }}
        className="
        relative
        max-w-md w-full
        rounded-3xl
        border border-red-500/10
        bg-white/[0.03]
        backdrop-blur-2xl
        p-10
        text-center
      "
      >
        {/* icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 180,
            damping: 15,
            delay: .2,
          }}
          className="
          mx-auto
          h-24 w-24
          rounded-full
          bg-red-500/10
          border border-red-500/20
          flex items-center justify-center
        "
        >
          <FaTimesCircle className="text-red-400 text-5xl" />
        </motion.div>

        {/* heading */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .4 }}
          className="mt-8 text-3xl font-bold text-white"
        >
          Payment Failed
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .6 }}
          className="mt-3 text-gray-400 leading-7"
        >
          Something went wrong while processing your payment.
          <br />
          No worries, you can try again anytime.
        </motion.p>

        {/* info card */}
        <div
          className="
          mt-8
          rounded-2xl
          bg-red-500/5
          border border-red-500/10
          p-5
        "
        >
          <p className="text-sm text-gray-400">
            You will be automatically redirected to home in
          </p>

          <p className="mt-2 text-red-300 font-semibold">
            5 seconds
          </p>
        </div>

        {/* button */}
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: .97 }}
          onClick={() => navigate('/')}
          className="
          mt-8
          w-full
          h-14
          rounded-2xl
          bg-white
          text-black
          font-semibold
          flex items-center justify-center gap-3
        "
        >
          <FiArrowLeft />
          Go Back Home
        </motion.button>

        <p className="mt-5 text-xs text-gray-500">
          If money was deducted, it will usually be refunded automatically by your payment provider.
        </p>
      </motion.div>
    </div>
  );
};

