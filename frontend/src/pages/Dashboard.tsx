import React, { useState } from "react";
import Header from "@/components/Header";
import {
  Search,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  ChevronDown, ChevronUp,
  MapPin,
  Calendar,
  Filter,
} from "lucide-react";

//changes



// Mock types
type Report = {
  id: string;
  title: string;
  location: string;
  code: string;
  date: string;
  votes: number;
  comments: number;
  dept: string;
  severity: "low" | "medium" | "high";
  aiConfidence?: number; // optional AI tag
  description: string;
};

const MOCK: Report[] = [
  {
    id: "CR-2025-001",
    title: "Plastic waste on Main Street",
    location: "Main St & Oak Ave",
    code: "CR-2025-001",
    date: "2025-01-15",
    votes: 23,
    comments: 2,
    dept: "Municipality Dept",
    severity: "high",
    aiConfidence: 95,
    description: "Large amount of plastic waste causing breeding of animals and potential soil damage.",
  },
  {
    id: "CR-2025-002",
    title: "Water Contaminated",
    location: "Park Rd, Block 4",
    code: "CR-2025-002",
    date: "2025-01-14",
    votes: 15,
    comments: 2,
    dept: "Municipal Dept",
    severity: "medium",
    aiConfidence: 87,
    description: "Drinking water in taps near streets found contaminated, high pH and coliform found.",
  },
  // add more mock items as needed
];

export default function Dashboard() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All Status");
  const [categoryFilter, setCategoryFilter] = useState<string>("All Categories");

  //changes
  const [likes, setLikes] = useState({});
  const [dislikes, setDislikes] = useState({});
  const [showComments, setShowComments] = useState({});
  const [comments, setComments] = useState({});
  const [details, setDetails] = useState(null); 
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);


  const stats = {
    totalReports: 1247,
    resolved: 856,
    activeCitizens: 3421,
    responseTime: "2.3 hrs",
  };

  const filtered = MOCK.filter((r) => {
    const matchesQuery =
      query.trim() === "" ||
      r.title.toLowerCase().includes(query.toLowerCase()) ||
      r.location.toLowerCase().includes(query.toLowerCase());
    // simple filters placeholder
    const matchesStatus = statusFilter === "All Status" || true;
    const matchesCategory = categoryFilter === "All Categories" || true;
    return matchesQuery && matchesStatus && matchesCategory;
  });

  const severityColor = (s: Report["severity"]) => {
    if (s === "high") return "bg-red-50 text-red-600";
    if (s === "medium") return "bg-amber-50 text-amber-600";
    return "bg-emerald-50 text-emerald-600";
  };

  const toggleLike = (id) => {
  setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
  setDislikes((prev) => ({ ...prev, [id]: false }));
};

const toggleDislike = (id) => {
  setDislikes((prev) => ({ ...prev, [id]: !prev[id] }));
  setLikes((prev) => ({ ...prev, [id]: false }));
};

const toggleComments = (id) => {
  setShowComments((prev) => ({ ...prev, [id]: !prev[id] }));
};

const addComment = (id, text) => {
  if (!text.trim()) return;
  setComments((prev) => ({
    ...prev,
    [id]: [...(prev[id] || []), { text, likes: 0, dislikes: 0 }],
  }));
};

const toggleCommentLike = (id, index) => {
  setComments((prev) => {
    const newComments = [...(prev[id] || [])];
    newComments[index].likes++;
    return { ...prev, [id]: newComments };
  });
};

const toggleCommentDislike = (id, index) => {
  setComments((prev) => {
    const newComments = [...(prev[id] || [])];
    newComments[index].dislikes++;
    return { ...prev, [id]: newComments };
  });
};



  return (
     <div className="min-h-screen bg-background">
           <Header />

    <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50/20 p-8">
      {/* Page header / hero */}
      <header className="max-w-6xl mx-auto mb-6">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 to-emerald-500">
          Community <span className="text-slate-800">Dashboard</span>
        </h1>
        <p className="text-slate-500 mt-2">Monitor and track waste reporting and water quality across your community in real-time.</p>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <div className="text-sm text-slate-500">Total Reports</div>
            <div className="mt-2 text-2xl font-bold">{stats.totalReports.toLocaleString()}</div>
            <div className="text-sm text-emerald-500 mt-1">+12% from last month</div>
          </Card>
          <Card>
            <div className="text-sm text-slate-500">Resolved Issues</div>
            <div className="mt-2 text-2xl font-bold">{stats.resolved.toLocaleString()}</div>
            <div className="text-sm text-emerald-500 mt-1">+8% from last month</div>
          </Card>
          <Card>
            <div className="text-sm text-slate-500">Active Citizens</div>
            <div className="mt-2 text-2xl font-bold">{stats.activeCitizens.toLocaleString()}</div>
            <div className="text-sm text-emerald-500 mt-1">+15% from last month</div>
          </Card>
          <Card>
            <div className="text-sm text-slate-500">Response Time</div>
            <div className="mt-2 text-2xl font-bold">{stats.responseTime}</div>
            <div className="text-sm text-amber-500 mt-1">-5% from last month</div>
          </Card>
        </div>

        {/* Search and filters */}
        <div className="mt-6 bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex gap-3 items-center">
          <div className="flex-1 flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-100 w-full">
              <Search className="w-5 h-5 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search reports by title or location..."
                className="flex-1 outline-none text-slate-700 bg-transparent"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border border-slate-100 bg-white"
            >
              <option>All Status</option>
              <option>Open</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border border-slate-100 bg-white"
            >
              <option>All Categories</option>
              <option>Waste</option>
              <option>Water</option>
            </select>
          </div>
          <button className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200">
            <Filter className="w-4 h-4 text-slate-500" /> More Filters
          </button>
        </div>
      </header>

      {/* List */}
      <main className="max-w-6xl mx-auto space-y-6">
        {filtered.map((r) => (
          <article key={r.id} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col lg:flex-row justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-slate-800">{r.title}</h3>
              <div className="mt-2 text-slate-500 flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2"><Calendar className="w-4 h-4" />{r.code}</div>
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4" />{r.location}</div>
                <div className="flex items-center gap-2"><Clock className="w-4 h-4" />{r.date}</div>
              </div>

              <p className="mt-4 text-slate-600">{r.description}</p>

              <div className="mt-4 flex items-center gap-4 text-sm text-slate-600">
                <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      {/* Like button */}
      <button
        onClick={() => toggleLike(r.id)}
        className={`flex items-center gap-1 ${likes[r.id] ? "text-emerald-600" : "text-gray-500"}`}
      >
        <ThumbsUp size={18} />
        <span>Like</span>
      </button>

      {/* Dislike button */}
      <button
        onClick={() => toggleDislike(r.id)}
        className={`flex items-center gap-1 ${dislikes[r.id] ? "text-red-500" : "text-gray-500"}`}
      >
        <ThumbsDown size={18} />
        <span>Dislike</span>
      </button>
    </div>

    {/* Comments Dropdown */}
    <button
      onClick={() => toggleComments(r.id)}
      className="ml-4 flex items-center text-gray-700 hover:text-emerald-600"
    >
      Comments {showComments[r.id] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
    </button>
  </div>

  {/* Comments Section */}
  {showComments[r.id] && (
    <div className="bg-gray-50 rounded-lg p-3 mt-2">
      {(comments[r.id] || []).map((c, index) => (
        <div key={index} className="flex items-center justify-between py-1 border-b border-gray-200">
          <span>{c.text}</span>
          <div className="flex gap-2 text-sm">
            <button onClick={() => toggleCommentLike(r.id, index)}>
              👍 {c.likes}
            </button>
            <button onClick={() => toggleCommentDislike(r.id, index)}>
              👎 {c.dislikes}
            </button>
          </div>
        </div>
      ))}

      {/* Add comment */}
<form
  onSubmit={(e) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements.namedItem("comment") as HTMLInputElement;

    const text = input.value;
    addComment(r.id, text);
    form.reset();
  }}
  className="flex mt-2"
>

        <input
          type="text"
          name="comment"
          placeholder="Add a comment..."
          className="border rounded-l px-3 py-1 flex-grow"
        />
        <button type="submit" className="bg-emerald-600 text-white px-4 rounded-r">
          Post
        </button>
      </form>
    </div>
  )}
                <span className="ml-2 inline-flex items-center rounded-full px-3 py-1 text-xs bg-slate-50 border border-slate-100">{r.dept}</span>
              </div>
            </div>

            <aside className="w-full lg:w-56 flex flex-col items-end gap-4">
              <div className={`rounded-full px-3 py-1 text-sm font-medium ${severityColor(r.severity)}`}>
                {r.severity.toUpperCase()}
              </div>

              <div className="text-slate-500 text-xs flex flex-col items-end">
                <span className="flex items-center gap-2"><AlertTriangle className="w-3 h-3 text-slate-400" />AI: {r.aiConfidence}%</span>
              </div>

              <div className="mt-auto w-full flex gap-2">
                <button  onClick={() => setSelectedReport(r)} className="flex-1 px-4 py-2 rounded-lg border border-slate-200 bg-white">View Details</button>

              </div>
            </aside>
          </article>
        ))}
      </main>
      {selectedReport && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
    <div className="bg-white rounded-2xl shadow-lg max-w-lg w-full p-6 relative">
      {/* Close Button */}
      <button
        onClick={() => setSelectedReport(null)}
        className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        aria-label="Close"
      >
        ✕
      </button>

      {/* Title and Info */}
      <h2 className="text-2xl font-bold text-emerald-700 mb-2">{selectedReport.title}</h2>
      <p className="text-sm text-gray-500 mb-1">
        <strong>Code:</strong> {selectedReport.code}
      </p>
      <p className="text-sm text-gray-500 mb-1">
        <strong>Location:</strong> {selectedReport.location}
      </p>
      <p className="text-sm text-gray-500 mb-3">
        <strong>Date:</strong> {selectedReport.date}
      </p>

      {/* Description */}
      <p className="text-gray-700 mb-4">{selectedReport.description}</p>

      {/* Health Precautions */}
      <h3 className="text-lg font-semibold text-emerald-700 mb-2">Health Precautions:</h3>

      {selectedReport.id === "CR-2025-001" && (
        <ul className="list-disc ml-5 text-gray-700 space-y-1">
          <li>Avoid direct contact with plastic waste.</li>
          <li>Wear gloves and masks during cleanup drives.</li>
          <li>Prevent animals from feeding on the waste.</li>
          <li>Encourage proper waste segregation in local areas.</li>
        </ul>
      )}

      {selectedReport.id === "CR-2025-002" && (
        <ul className="list-disc ml-5 text-gray-700 space-y-1">
          <li>Boil or filter tap water before drinking.</li>
          <li>Avoid using contaminated water for cooking or brushing.</li>
          <li>Report water quality issues to authorities.</li>
          <li>Use bottled water until the issue is resolved.</li>
        </ul>
      )}

      {/* Close Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => setSelectedReport(null)}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

    </div>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center justify-between">
      <div>{children}</div>
    </div>
  );
}
