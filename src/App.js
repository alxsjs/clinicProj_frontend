import { useState, useEffect } from "react";
import "./App.css";

const API_URL = "https://clinic-backend2.onrender.com"; // ✅ DEPLOYED BACKEND

function App() {
  const [activeTab, setActiveTab] = useState("patients");

  /* ====================
     Form States
  ==================== */
  const [form, setForm] = useState({ name: "", birthDate: "", email: "", phone: "" });
  const [doctorForm, setDoctorForm] = useState({ name: "", specialty: "" });
  const [appointmentForm, setAppointmentForm] = useState({
    patient: "",
    doctor: "",
    date: "",
    time: ""
  });

  /* ====================
     Data States
  ==================== */
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  /* ====================
     Fetch Data
  ==================== */
  useEffect(() => {
    fetchPatients();
    fetchDoctors();
    fetchAppointments();
  }, []);

  const fetchPatients = async () => {
    const res = await fetch(`${API_URL}/api/patients`);
    const data = await res.json();
    setPatients(data);
  };

  const fetchDoctors = async () => {
    const res = await fetch(`${API_URL}/api/doctors`);
    const data = await res.json();
    setDoctors(data);
  };

  const fetchAppointments = async () => {
    const res = await fetch(`${API_URL}/api/appointments`);
    const data = await res.json();
    setAppointments(data);
  };

  /* ====================
     CREATE
  ==================== */
  const handlePatientSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${API_URL}/api/patients`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ name: "", birthDate: "", email: "", phone: "" });
    fetchPatients();
  };

  const handleDoctorSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${API_URL}/api/doctors`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(doctorForm),
    });
    setDoctorForm({ name: "", specialty: "" });
    fetchDoctors();
  };

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${API_URL}/api/appointments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(appointmentForm),
    });
    setAppointmentForm({ patient: "", doctor: "", date: "", time: "" });
    fetchAppointments();
  };

  /* ====================
     DELETE
  ==================== */
  const handleDeletePatient = async (id) => {
    await fetch(`${API_URL}/api/patients/${id}`, { method: "DELETE" });
    fetchPatients();
  };

  const handleDeleteDoctor = async (id) => {
    await fetch(`${API_URL}/api/doctors/${id}`, { method: "DELETE" });
    fetchDoctors();
  };

  const handleDeleteAppointment = async (id) => {
    await fetch(`${API_URL}/api/appointments/${id}`, { method: "DELETE" });
    fetchAppointments();
  };

  /* ====================
     JSX
  ==================== */
  return (
    <div className="app-container">
      <h1>CLINIC APPOINTMENT</h1>

      <div className="navbar">
        <a className={activeTab === "patients" ? "active" : ""} onClick={() => setActiveTab("patients")}>Patients</a>
        <a className={activeTab === "doctors" ? "active" : ""} onClick={() => setActiveTab("doctors")}>Doctors</a>
        <a className={activeTab === "appointments" ? "active" : ""} onClick={() => setActiveTab("appointments")}>Appointments</a>
      </div>

      {/* ==================== PATIENTS ==================== */}
      {activeTab === "patients" && (
        <>
          <form onSubmit={handlePatientSubmit}>
            <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            <input type="date" value={form.birthDate} onChange={e => setForm({ ...form, birthDate: e.target.value })} required />
            <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
            <input placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required />
            <button>Add Patient</button>
          </form>

          <div className="card-list">
            {patients.map(p => (
              <div key={p._id} className="card">
                <h3>{p.name}</h3>
                <p>Email: {p.email}</p>
                <p>Phone: {p.phone}</p>
                <button className="delete-btn" onClick={() => handleDeletePatient(p._id)}>Delete</button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ==================== DOCTORS ==================== */}
      {activeTab === "doctors" && (
        <>
          <form onSubmit={handleDoctorSubmit}>
            <input placeholder="Name" value={doctorForm.name} onChange={e => setDoctorForm({ ...doctorForm, name: e.target.value })} required />
            <input placeholder="Specialty" value={doctorForm.specialty} onChange={e => setDoctorForm({ ...doctorForm, specialty: e.target.value })} required />
            <button>Add Doctor</button>
          </form>

          <div className="card-list">
            {doctors.map(d => (
              <div key={d._id} className="card">
                <h3>{d.name}</h3>
                <p>{d.specialty}</p>
                <button className="delete-btn" onClick={() => handleDeleteDoctor(d._id)}>Delete</button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ==================== APPOINTMENTS ==================== */}
      {activeTab === "appointments" && (
        <>
          <form onSubmit={handleAppointmentSubmit}>
            <input placeholder="Patient" value={appointmentForm.patient} onChange={e => setAppointmentForm({ ...appointmentForm, patient: e.target.value })} required />
            <input placeholder="Doctor" value={appointmentForm.doctor} onChange={e => setAppointmentForm({ ...appointmentForm, doctor: e.target.value })} required />
            <input type="date" value={appointmentForm.date} onChange={e => setAppointmentForm({ ...appointmentForm, date: e.target.value })} required />
            <input type="time" value={appointmentForm.time} onChange={e => setAppointmentForm({ ...appointmentForm, time: e.target.value })} required />
            <button>Add Appointment</button>
          </form>

          <div className="card-list">
            {appointments.map(a => (
              <div key={a._id} className="card">
                <h3>{a.patient} → {a.doctor}</h3>
                <p>{a.date} at {a.time}</p>
                <button className="delete-btn" onClick={() => handleDeleteAppointment(a._id)}>Delete</button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
