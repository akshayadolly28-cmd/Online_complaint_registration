import React, { createContext, useContext, useMemo, useState } from 'react';
import { ShieldCheck, Bell, Users, BarChart3, MessageSquare, CheckCircle2, Lock, UserCog, Search, Star } from 'lucide-react';
import './styles.css';

const AuthContext = createContext(null);
const ComplaintContext = createContext(null);

const initialComplaints = [
  { id: 'CMP-1001', title: 'Street light not working', category: 'Infrastructure', status: 'In Progress', priority: 'High', agent: 'Ravi Kumar', user: 'Priya Sharma', lastUpdate: 'Agent visited the location and repair is scheduled.', messages: ['Complaint received by agent.', 'Repair team assigned for inspection.'], rating: null },
  { id: 'CMP-1002', title: 'Water leakage near apartment', category: 'Utilities', status: 'Assigned', priority: 'Medium', agent: 'Anita Rao', user: 'Arjun Mehta', lastUpdate: 'Complaint assigned to utilities department.', messages: ['Complaint assigned to Anita Rao.'], rating: null },
  { id: 'CMP-1003', title: 'Garbage not collected', category: 'Sanitation', status: 'Resolved', priority: 'Low', agent: 'Suresh Patel', user: 'Neha Reddy', lastUpdate: 'Issue resolved and marked for feedback.', messages: ['Garbage collection team completed pickup.'], rating: 5 },
];

const agents = ['Ravi Kumar', 'Anita Rao', 'Suresh Patel', 'Meena Iyer'];

function Header() {
  const { user, setRole } = useContext(AuthContext);
  return (
    <header className="header">
      <div className="logo">ComplaintCare</div>
      <nav>
        <a href="#features">Features</a>
        <a href="#dashboard">Dashboard</a>
        <a href="#complaint">Register Complaint</a>
        <a href="#tracking">Tracking</a>
      </nav>
      <select className="roleSwitch" value={user.role} onChange={(e) => setRole(e.target.value)}>
        <option value="USER">User View</option>
        <option value="AGENT">Agent View</option>
        <option value="ADMIN">Admin View</option>
      </select>
    </header>
  );
}

function Hero() {
  const { complaints } = useContext(ComplaintContext);
  const registered = complaints.length;
  const progress = complaints.filter((c) => c.status === 'In Progress' || c.status === 'Assigned').length;
  const resolved = complaints.filter((c) => c.status === 'Resolved' || c.status === 'Closed').length;
  return (
    <section className="hero">
      <div>
        <p className="badge">MERN Stack Complaint Management Platform</p>
        <h1>Online Complaint Registration and Management System</h1>
        <p className="heroText">
          A secure and user-friendly system for registering complaints, tracking progress,
          assigning agents, communicating with handlers, and resolving issues with transparency.
        </p>
        <div className="heroButtons">
          <a className="primaryBtn" href="#complaint">Register Complaint</a>
          <a className="secondaryBtn" href="#dashboard">View Dashboard</a>
        </div>
      </div>
      <div className="heroCard">
        <h3>Complaint Status</h3>
        <div className="statusItem"><span>Registered</span><b>{registered}</b></div>
        <div className="statusItem"><span>Assigned/In Progress</span><b>{progress}</b></div>
        <div className="statusItem"><span>Resolved</span><b>{resolved}</b></div>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    { icon: <ShieldCheck />, title: 'Secure Login', text: 'JWT authentication, bcrypt password hashing, and role-based access control.' },
    { icon: <Bell />, title: 'Smart Notifications', text: 'Users receive complaint registration, assignment, and resolution updates.' },
    { icon: <Users />, title: 'Agent Assignment', text: 'Admins assign agents based on category, workload, and priority.' },
    { icon: <MessageSquare />, title: 'User-Agent Communication', text: 'Complaint notes allow users and agents to exchange progress updates.' },
    { icon: <BarChart3 />, title: 'Admin Analytics', text: 'Track total complaints, pending cases, resolution rate, and feedback.' },
    { icon: <CheckCircle2 />, title: 'Feedback System', text: 'Users submit ratings and comments after complaint resolution.' },
  ];

  return (
    <section id="features" className="section">
      <h2>System Features</h2>
      <div className="grid">
        {items.map((item) => (
          <div className="featureCard" key={item.title}>
            <div className="icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function LoginRegisterPanel() {
  const { user, setUser } = useContext(AuthContext);
  const [mode, setMode] = useState('Login');
  return (
    <section className="section authPanel">
      <div>
        <p className="badge"><Lock size={16} /> Authentication Module</p>
        <h2>{mode} / Role Based Access</h2>
        <p>Demo credentials are simulated for presentation. Backend contains JWT authentication, bcrypt password hashing, and protected routes.</p>
      </div>
      <form className="complaintForm" onSubmit={(e) => e.preventDefault()}>
        {mode === 'Register' && <input placeholder="Full Name" defaultValue={user.name} />}
        <input type="email" placeholder="Email Address" defaultValue="user@example.com" />
        <input type="password" placeholder="Password" defaultValue="password123" />
        <select value={user.role} onChange={(e) => setUser({ ...user, role: e.target.value })}>
          <option value="USER">USER</option>
          <option value="AGENT">AGENT</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        <button type="submit">{mode}</button>
        <p className="success">Current active role: {user.role}</p>
        <button className="lightBtn" type="button" onClick={() => setMode(mode === 'Login' ? 'Register' : 'Login')}>
          Switch to {mode === 'Login' ? 'Register' : 'Login'}
        </button>
      </form>
    </section>
  );
}

function StatusPill({ status }) {
  return <span className={`pill ${status.replace(' ', '').toLowerCase()}`}>{status}</span>;
}

function Dashboard() {
  const { user } = useContext(AuthContext);
  const { complaints, assignAgent, updateStatus } = useContext(ComplaintContext);
  const total = complaints.length;
  const inProgress = complaints.filter((c) => c.status === 'In Progress').length;
  const assigned = complaints.filter((c) => c.status === 'Assigned').length;
  const resolved = complaints.filter((c) => c.status === 'Resolved').length;

  return (
    <section id="dashboard" className="section dashboard">
      <h2>{user.role === 'ADMIN' ? 'Admin Dashboard' : user.role === 'AGENT' ? 'Agent Dashboard' : 'User Dashboard'}</h2>
      <div className="stats">
        <div><h3>{total}</h3><p>Total Complaints</p></div>
        <div><h3>{assigned}</h3><p>Assigned</p></div>
        <div><h3>{inProgress}</h3><p>In Progress</p></div>
        <div><h3>{resolved}</h3><p>Resolved</p></div>
      </div>
      <div className="tableBox">
        <table>
          <thead>
            <tr><th>ID</th><th>Title</th><th>Category</th><th>Status</th><th>Priority</th><th>Agent</th><th>Action</th></tr>
          </thead>
          <tbody>
            {complaints.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td><td>{c.title}</td><td>{c.category}</td>
                <td><StatusPill status={c.status} /></td><td>{c.priority}</td><td>{c.agent || 'Not Assigned'}</td>
                <td>
                  {user.role === 'ADMIN' && (
                    <select className="miniSelect" value={c.agent || ''} onChange={(e) => assignAgent(c.id, e.target.value)}>
                      <option value="">Assign</option>{agents.map((a) => <option key={a}>{a}</option>)}
                    </select>
                  )}
                  {user.role === 'AGENT' && <button className="miniBtn" onClick={() => updateStatus(c.id, c.status === 'Resolved' ? 'Closed' : 'Resolved')}>Update</button>}
                  {user.role === 'USER' && <a href={`#${c.id}`} className="trackLink">Track</a>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ComplaintForm() {
  const { addComplaint } = useContext(ComplaintContext);
  const [submitted, setSubmitted] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const id = addComplaint({
      title: form.get('title'),
      category: form.get('category'),
      priority: form.get('priority'),
      description: form.get('description'),
      user: form.get('name'),
    });
    setSubmitted(id);
    e.target.reset();
  }

  return (
    <section id="complaint" className="section formSection">
      <div>
        <p className="badge">Complaint Submission</p>
        <h2>Register a Complaint</h2>
        <p>Submit complaint details securely. The complaint is routed to an admin/agent and can be tracked using the complaint ID.</p>
      </div>
      <form onSubmit={handleSubmit} className="complaintForm">
        <input required name="name" placeholder="Full Name" />
        <input required name="email" type="email" placeholder="Email Address" />
        <select required name="category"><option value="">Select Category</option><option>Infrastructure</option><option>Utilities</option><option>Sanitation</option><option>Service Issue</option></select>
        <select required name="priority"><option value="Medium">Medium Priority</option><option>Low</option><option>High</option></select>
        <input required name="title" placeholder="Complaint Title" />
        <textarea required name="description" placeholder="Describe your complaint"></textarea>
        <button type="submit">Submit Complaint</button>
        {submitted && <p className="success">Complaint submitted successfully. Tracking ID: {submitted}</p>}
      </form>
    </section>
  );
}

function TrackingAndCommunication() {
  const { complaints, addMessage, addFeedback } = useContext(ComplaintContext);
  const [selected, setSelected] = useState(complaints[0].id);
  const complaint = complaints.find((c) => c.id === selected) || complaints[0];
  const [note, setNote] = useState('');
  return (
    <section id="tracking" className="section trackingSection">
      <div>
        <p className="badge"><Search size={16} /> Real-Time Tracking Preview</p>
        <h2>Complaint Details & Communication</h2>
        <select value={selected} onChange={(e) => setSelected(e.target.value)}>
          {complaints.map((c) => <option key={c.id} value={c.id}>{c.id} - {c.title}</option>)}
        </select>
        <div className="featureCard detailCard" id={complaint.id}>
          <h3>{complaint.title}</h3>
          <p><b>Category:</b> {complaint.category}</p>
          <p><b>Status:</b> <StatusPill status={complaint.status} /></p>
          <p><b>Assigned Agent:</b> {complaint.agent || 'Pending admin assignment'}</p>
          <p><b>Latest Update:</b> {complaint.lastUpdate}</p>
        </div>
      </div>
      <div className="complaintForm">
        <h3>User ↔ Agent Communication</h3>
        <div className="messageBox">
          {complaint.messages.map((m, index) => <p key={index} className="messageItem">{m}</p>)}
        </div>
        <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add progress note or user message"></textarea>
        <button type="button" onClick={() => { addMessage(complaint.id, note); setNote(''); }}>Add Message</button>
        <div className="ratingBox">
          <p><Star size={16} /> Feedback after resolution</p>
          <button className="lightBtn" type="button" onClick={() => addFeedback(complaint.id, 5)}>Submit 5-Star Feedback</button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="footer">
      <h3>Online Complaint Registration and Management System</h3>
      <p>Built using React.js, Node.js, Express.js, MongoDB, JWT, bcrypt, Helmet, CORS, and role-based middleware.</p>
    </footer>
  );
}

export default function App() {
  const [user, setUser] = useState({ name: 'Demo User', role: 'USER' });
  const [complaints, setComplaints] = useState(initialComplaints);

  const complaintApi = useMemo(() => ({
    complaints,
    addComplaint: (data) => {
      const id = `CMP-${1000 + complaints.length + 1}`;
      setComplaints((prev) => [{ id, status: 'Registered', agent: '', lastUpdate: 'Complaint registered successfully and waiting for admin review.', messages: ['Complaint submitted by user.'], rating: null, ...data }, ...prev]);
      return id;
    },
    assignAgent: (id, agent) => setComplaints((prev) => prev.map((c) => c.id === id ? { ...c, agent, status: 'Assigned', lastUpdate: `Complaint assigned to ${agent}.` } : c)),
    updateStatus: (id, status) => setComplaints((prev) => prev.map((c) => c.id === id ? { ...c, status, lastUpdate: `Agent updated complaint status to ${status}.` } : c)),
    addMessage: (id, message) => {
      if (!message.trim()) return;
      setComplaints((prev) => prev.map((c) => c.id === id ? { ...c, messages: [...c.messages, message], lastUpdate: message } : c));
    },
    addFeedback: (id, rating) => setComplaints((prev) => prev.map((c) => c.id === id ? { ...c, rating, status: c.status === 'Resolved' ? 'Closed' : c.status, lastUpdate: `User submitted ${rating}-star feedback.` } : c)),
  }), [complaints]);

  return (
    <AuthContext.Provider value={{ user, setUser, setRole: (role) => setUser((u) => ({ ...u, role })) }}>
      <ComplaintContext.Provider value={complaintApi}>
        <Header />
        <Hero />
        <Features />
        <LoginRegisterPanel />
        <Dashboard />
        <ComplaintForm />
        <TrackingAndCommunication />
        <Footer />
      </ComplaintContext.Provider>
    </AuthContext.Provider>
  );
}
