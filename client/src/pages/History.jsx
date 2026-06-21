import axios from 'axios';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { GiHamburgerMenu } from 'react-icons/gi';
import { serverUrl } from "../config";
import {FinalResult} from '../components/FinalResult';

export const History = () => {
  const navigate = useNavigate();

  const { userData } = useSelector((state) => state.user);

  const [topics, setTopics] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [loading, setLoading] = useState(false);

  const [activeNoteId, setActiveNoteId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const res = await axios.get(serverUrl + '/api/notes/getnotes', {
          withCredentials: true,
        });

        setTopics(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.log(error);
      }
    }

    fetchNotes();

    if (window.innerWidth >= 1024) {
      setIsSidebarOpen(true);
    }
  }, []);

  const openNotes = async (id) => {
    try {
      setLoading(true);
      setActiveNoteId(id);

      const res = await axios.get(serverUrl + `/api/notes/${id}`, {
        withCredentials: true,
      });

      setSelectedNote(res.data.content);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0b0d13] text-white px-6 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="
        max-w-7xl mx-auto
        mb-8
        rounded-3xl
        border border-white/10
        bg-white/[0.03]
        backdrop-blur-2xl
        px-8 py-6
        flex flex-wrap items-center justify-between gap-5
      "
      >
        <div onClick={() => navigate('/')} className="cursor-pointer">
          <h1 className="text-2xl font-bold">NotePilot AI</h1>

          <p className="text-sm text-gray-500 mt-1">
            Your saved notes workspace
          </p>
        </div>

        <div className="flex gap-3 items-center">
          {!isSidebarOpen && (
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-2xl"
            >
              <GiHamburgerMenu />
            </button>
          )}

          <button
            onClick={() => navigate('/notes')}
            className="
            px-5 py-3
            rounded-2xl
            bg-violet-500
            font-medium
          "
          >
            + New Note
          </button>

          <button
            onClick={() => navigate('/pricing')}
            className="
            px-5 py-3
            rounded-2xl
            border border-violet-500/30
            bg-violet-500/10
          "
          >
            💎 {userData?.credits}
          </button>
        </div>
      </motion.div>

      {/* Layout */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ x: -250 }}
              animate={{ x: 0 }}
              exit={{ x: -250 }}
              className="
              fixed lg:static
              left-0 top-0
              z-50
              h-full lg:h-auto
              w-80
              lg:w-auto
              rounded-r-3xl lg:rounded-3xl
              bg-[#11131b]
              border border-white/10
              p-5
              overflow-y-auto
            "
            >
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden mb-5 text-gray-400"
              >
                ← Back
              </button>

              <h2 className="text-xl font-semibold mb-5">📚 Your Notes</h2>

              <div className="space-y-4">
                {topics.length === 0 && (
                  <div className="text-gray-500">No notes yet</div>
                )}

                {topics.map((note) => (
                  <motion.div
                    whileHover={{ y: -2 }}
                    key={note._id}
                    onClick={() => openNotes(note._id)}
                    className={`
                    cursor-pointer
                    rounded-3xl
                    p-4
                    border
                    transition
                    ${
                      activeNoteId === note._id
                        ? 'border-violet-500 bg-violet-500/10'
                        : 'border-white/10 bg-white/[0.03]'
                    }
                  `}
                  >
                    <h3 className="font-medium text-white">{note.topic}</h3>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {note.classLevel && (
                        <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300">
                          {note.classLevel}
                        </span>
                      )}

                      {note.examType && (
                        <span className="text-xs px-3 py-1 rounded-full bg-violet-500/10 text-violet-300">
                          {note.examType}
                        </span>
                      )}
                    </div>

                    <div className="flex gap-3 mt-3 text-xs text-gray-500">
                      {note.revisionMode && <span>⚡ Revision</span>}

                      {note.includeDiagram && <span>📊 Diagram</span>}

                      {note.includeChart && <span>📈 Chart</span>}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="
          lg:col-span-3
          rounded-3xl
          border border-white/10
          bg-white/[0.03]
          backdrop-blur-2xl
          min-h-[80vh]
          p-8
        "
        >
          {loading && (
            <div className="h-full flex items-center justify-center text-gray-400">
              Loading note...
            </div>
          )}

          {!loading && !selectedNote && (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-5">📘</div>

                <h2 className="text-2xl font-semibold mb-2">Select a Note</h2>

                <p className="text-gray-500">
                  Choose a note from the sidebar to preview.
                </p>
              </div>
            </div>
          )}

          {!loading && selectedNote && <FinalResult result={selectedNote} />}
        </motion.div>
      </div>
    </div>
  );
}

export default History;
