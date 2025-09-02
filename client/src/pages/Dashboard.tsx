import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import { Loader2, Trash } from "lucide-react";
import { toast } from "react-toastify";

interface User {
  name: string;
  email: string;
  dob: string;
}

interface Note {
  _id: string;
  title: string;
  description: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [noteLoading, setNoteLoading] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const fetchNotes = async () => {
    try {
      const res = await axios.get("https://notesapp-backend-ppzh.onrender.com/notes", { withCredentials: true });
      setNotes(res.data.notes);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateNote = async () => {
    if (!title || !description) {
      toast.error("Title and description required");
      return;
    }

    setNoteLoading(true);
    try {
      const res = await axios.post(
        "https://notesapp-backend-ppzh.onrender.com/notes/create",
        { title, description },
        { withCredentials: true }
      );
      console.log(res);
      setNotes((prev) => [res.data.note, ...prev]);
      setTitle("");
      setDescription("");
      toast.success("Note created");
    } catch (err) {
      toast.error("Failed to create note");
    } finally {
      setNoteLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://notesapp-backend-ppzh.onrender.com/notes/${id}`, { withCredentials: true });
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted");
    } catch (err) {
      toast.error("Error deleting note");
    }
  };

  const handleLogout = async () => {
    try {
      const res = await axios.get("https://notesapp-backend-ppzh.onrender.com/auth/logout", {
        withCredentials: true,
      });
      toast.success(res.data.message);
      navigate("/sign-in");
    } catch (error: any) {
      toast.error("Error during logout");
    }
  };

  useEffect(() => {
    axios
      .get("https://notesapp-backend-ppzh.onrender.com/api/dashboard", { withCredentials: true })
      .then((res) => {
        setUser(res.data.user);
        setPageLoading(false);
        fetchNotes();
      })
      .catch(() => {
        navigate("/sign-up");
      });
  }, [navigate]);

  if (pageLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 space-y-6">
       
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 text-blue-500 animate-spin" />
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>
          <button onClick={handleLogout} className="text-blue-600 hover:underline">
            Sign Out
          </button>
        </div>

        <div className="bg-gray-100 p-4 rounded-xl shadow-sm">
          <h2 className="font-semibold text-lg">Welcome, {user?.name}</h2>
          <p className="text-gray-600 text-sm">Email: {user?.email}</p>
        </div>

        {/* Create Note */}
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Title"
            className="w-full border rounded-lg px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Description"
            className="w-full border rounded-lg px-3 py-2"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            onClick={handleCreateNote}
            disabled={noteLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
          >
            {noteLoading ? "Creating..." : "Create Note"}
          </button>
        </div>

        {/* Notes List */}
        <div>
          <h3 className="font-semibold mb-2">Notes</h3>
          <div className="space-y-3">
            {notes.map((note) => (
              <div
                key={note._id}
                className="bg-gray-100 p-3 rounded-lg shadow-sm space-y-1"
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">{note.title}</h4>
                  <button
                    onClick={() => handleDelete(note._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-sm text-gray-600">{note.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
