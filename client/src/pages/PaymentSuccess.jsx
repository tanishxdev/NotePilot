import { useEffect } from 'react';
import { motion } from 'motion/react';
import { FiCheckCircle, FiArrowRight } from 'react-icons/fi';
import { getCurrentUser } from '../services/api';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const PaymentSuccess = () => {
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
      <div className="absolute h-72 w-72 rounded-full bg-green-500/10 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: .95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: .6 }}
        className="
          relative
          max-w-md
          w-full
          rounded-3xl
          border border-green-500/10
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
            bg-green-500/10
            border border-green-500/20
            flex items-center justify-center
          "
        >
          <FiCheckCircle className="text-5xl text-green-400" />
        </motion.div>

        {/* heading */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .4 }}
          className="mt-8 text-3xl font-bold text-white"
        >
          Payment Successful
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .6 }}
          className="mt-3 text-gray-400 leading-7"
        >
          Your credits have been added successfully.
          <br />
          You can continue generating notes without interruption.
        </motion.p>

        {/* success card */}
        <div
          className="
            mt-8
            rounded-2xl
            bg-green-500/5
            border border-green-500/10
            p-5
          "
        >
          <p className="text-sm text-gray-400">
            Redirecting to dashboard in
          </p>

          <p className="mt-2 text-green-300 font-semibold">
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
          Start Learning
          <FiArrowRight />
        </motion.button>

        <p className="mt-5 text-xs text-gray-500">
          Thank you for supporting NotePilot ❤️
        </p>
      </motion.div>
    </div>
  );
};
