import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const { userData } = useSelector((state) => state.user);

  const credits = userData?.credits;
  const nameInitial = userData?.name?.slice(0, 1).toUpperCase();

  const [showCredits, setShowCredits] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });

      dispatch(setUserData(null));
      navigate("/auth");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sticky top-0 z-50 px-6 pt-6">
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="
        max-w-7xl mx-auto
        rounded-3xl
        border border-white/10
        bg-white/[0.03]
        backdrop-blur-2xl
        px-7 py-4
        flex items-center justify-between
      "
      >
        {/* left */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-4 cursor-pointer"
        >
          <div className="w-11 h-11 rounded-2xl bg-violet-500/10 flex items-center justify-center border border-violet-500/20">
            <img src={logo} className="w-7" />
          </div>

          <div>
            <h2 className="font-bold text-lg text-white">
              NotePilot AI
            </h2>

            <p className="text-xs text-gray-500">
              Smart learning workspace
            </p>
          </div>
        </div>

        {/* right */}
        <div className="flex items-center gap-4">

          {/* credits */}
          <div className="relative">

            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setShowCredits(!showCredits);
                setShowProfile(false);
              }}
              className="
              cursor-pointer
              px-5 py-2.5
              rounded-2xl
              bg-violet-500/10
              border border-violet-500/20
              flex items-center gap-3
            "
            >
              <span>💎</span>

              <span className="font-medium text-sm text-white">
                {credits}
              </span>

              <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center text-xs font-bold">
                +
              </div>
            </motion.div>

            <AnimatePresence>
              {showCredits && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 10 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="
                  absolute right-0 mt-4 w-72
                  rounded-3xl
                  border border-white/10
                  bg-[#11131b]
                  p-5
                "
                >
                  <h3 className="font-semibold text-white">
                    Need More Credits?
                  </h3>

                  <p className="text-sm text-gray-400 mt-2 mb-5">
                    Generate notes, summaries and diagrams without limits.
                  </p>

                  <button
                    onClick={() => {
                      setShowCredits(false);
                      navigate("/pricing");
                    }}
                    className="
                    w-full
                    py-3
                    rounded-2xl
                    bg-white
                    text-black
                    font-semibold
                  "
                  >
                    Upgrade Plan
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* avatar */}
          <div className="relative">

            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setShowProfile(!showProfile);
                setShowCredits(false);
              }}
              className="
              w-12 h-12
              rounded-full
              bg-cyan-500/10
              border border-cyan-500/20
              flex items-center justify-center
              text-white
              font-semibold
              cursor-pointer
            "
            >
              {nameInitial}
            </motion.div>

            <AnimatePresence>
              {showProfile && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 10 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="
                  absolute right-0 mt-4
                  w-56
                  rounded-3xl
                  border border-white/10
                  bg-[#11131b]
                  overflow-hidden
                "
                >
                  <MenuItem
                    text="History"
                    onClick={() => {
                      setShowProfile(false);
                      navigate("/history");
                    }}
                  />

                  <div className="h-px bg-white/10" />

                  <MenuItem
                    red
                    text="Sign Out"
                    onClick={handleSignOut}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function MenuItem({ text, onClick, red }) {
  return (
    <button
      onClick={onClick}
      className={`
      w-full
      px-5 py-4
      text-left
      transition
      ${
        red
          ? "text-red-400 hover:bg-red-500/10"
          : "text-gray-300 hover:bg-white/5"
      }
    `}
    >
      {text}
    </button>
  );
}

