
import { motion } from "motion/react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { serverUrl } from "../config";
import { setUserData } from "../redux/userSlice";

export const  Footer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    <footer className="relative mt-32 pb-10 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="
        max-w-7xl mx-auto
        rounded-[32px]
        border border-white/10
        bg-white/[0.03]
        backdrop-blur-2xl
        overflow-hidden
      "
      >
        <div className="grid md:grid-cols-3 gap-12 px-10 py-12">

          {/* left */}
          <div>
            <div
              onClick={() => navigate("/")}
              className="flex items-center gap-4 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                <img src={logo} className="w-7" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-white">
                  NotePilot AI
                </h2>

                <p className="text-xs text-gray-500">
                  Smart learning workspace
                </p>
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mt-6 max-w-sm">
              Generate notes, summaries, diagrams and printable PDFs in
              seconds. Designed for students who want to study smarter.
            </p>
          </div>

          {/* links */}
          <div>
            <h3 className="text-white font-semibold mb-6">
              Navigation
            </h3>

            <div className="space-y-4 text-gray-400 text-sm">

              <button
                onClick={() => navigate("/notes")}
                className="block hover:text-white transition"
              >
                Notes
              </button>

              <button
                onClick={() => navigate("/history")}
                className="block hover:text-white transition"
              >
                History
              </button>

              <button
                onClick={() => navigate("/pricing")}
                className="block hover:text-white transition"
              >
                Pricing
              </button>

            </div>
          </div>

          {/* account */}
          <div>
            <h3 className="text-white font-semibold mb-6">
              Account
            </h3>

            <div className="space-y-4 text-sm">

              <p className="text-gray-400">
                support@notepilot.ai
              </p>

              <button
                onClick={handleSignOut}
                className="
                px-5 py-3
                rounded-2xl
                bg-red-500/10
                border border-red-500/20
                text-red-400
                hover:bg-red-500/15
                transition
              "
              >
                Sign Out
              </button>

            </div>
          </div>
        </div>

        <div className="h-px bg-white/10" />

        <div className="px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} NotePilot AI. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <button className="hover:text-white transition">
              Privacy
            </button>

            <button className="hover:text-white transition">
              Terms
            </button>

            <button className="hover:text-white transition">
              Contact
            </button>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}

