import { useState } from "react";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("patients");

  /* ====================
     Form States
  ==================== */
  const [form, setForm] = useState({ name: "", birthDate: "", email: "", phone: "" });
  const [doctorForm, setDoctorForm] = useState({ name: "", specialty: "", email: "", phone: "" });
  const [appointmentForm, setAppointmentForm] = useState({ patient: "", doctor: "", date: "" });

  /* ====================
     Data Lists
  ==================== */
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  /* ====================
     Handlers
  ==================== */
  const handlePatientSubmit = (e) => {
    e.preventDefault();
    setPatients([...patients, form]);
    setForm({ name: "", birthDate: "", email: "", phone: "" });
  };

  const handleDoctorSubmit = (e) => {
    e.preventDefault();
    setDoctors([...doctors, doctorForm]);
    setDoctorForm({ name: "", specialty: "" });
  };

  const handleAppointmentSubmit = (e) => {
    e.preventDefault();
    setAppointments([...appointments, appointmentForm]);
    setAppointmentForm({ patient: "", doctor: "", date: "" });
  };

  /* ====================
     Edit/Delete Handlers
  ==================== */
  const handleEditPatient = (index) => {
    setForm(patients[index]);
    handleDeletePatient(index);
  };
  const handleDeletePatient = (index) => setPatients(patients.filter((_, i) => i !== index));

  const handleEditDoctor = (index) => {
    setDoctorForm(doctors[index]);
    handleDeleteDoctor(index);
  };
  const handleDeleteDoctor = (index) => setDoctors(doctors.filter((_, i) => i !== index));

  const handleEditAppointment = (index) => {
    setAppointmentForm(appointments[index]);
    handleDeleteAppointment(index);
  };
  const handleDeleteAppointment = (index) => setAppointments(appointments.filter((_, i) => i !== index));

  /* ====================
     JSX Return
  ==================== */
  return (
    <div className="app-container">
      <h1>CLINIC APPOINTMENT</h1>

      <div className="navbar">
        <a className={activeTab === "patients" ? "active" : ""} onClick={() => setActiveTab("patients")}>Patients</a>
        <a className={activeTab === "doctors" ? "active" : ""} onClick={() => setActiveTab("doctors")}>Doctors</a>
        <a className={activeTab === "appointments" ? "active" : ""} onClick={() => setActiveTab("appointments")}>Appointments</a>
      </div>

      <div className="tab-content">
        {/* ==================== Patients Tab ==================== */}
        {activeTab === "patients" && (
          <div>
            <form onSubmit={handlePatientSubmit}>
              <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              <input type="date" placeholder="Birth Date" value={form.birthDate} onChange={(e) => setForm({ ...form, birthDate: e.target.value })} required />
              <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              <input type="tel" placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
              <button type="submit">Add Patient</button>
            </form>

            <div className="card-list">
              {patients.map((p, i) => (
                <div key={i} className="card">
                  <h3>{p.name}</h3>
                  <p>Birth Date: {p.birthDate}</p>
                  <p>Email: {p.email}</p>
                  <p>Phone: {p.phone}</p>
                  <div className="card-buttons">
                    <button className="edit-btn" onClick={() => handleEditPatient(i)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDeletePatient(i)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== Doctors Tab ==================== */}
        {activeTab === "doctors" && (
          <div>
            <form onSubmit={handleDoctorSubmit}>
              <input type="text" placeholder="Name" value={doctorForm.name} onChange={(e) => setDoctorForm({ ...doctorForm, name: e.target.value })} required />
              <input type="text" placeholder="Specialty" value={doctorForm.specialty} onChange={(e) => setDoctorForm({ ...doctorForm, specialty: e.target.value })} required />
              <button type="submit">Add Doctor</button>
            </form>

            <div className="card-list">
              {doctors.map((d, i) => (
                <div key={i} className="card">
                  <h3>{d.name}</h3>
                  <p>Specialty: {d.specialty}</p>
                  {d.email && <p>Email: {d.email}</p>}
                  {d.phone && <p>Phone: {d.phone}</p>}
                  <div className="card-buttons">
                    <button className="edit-btn" onClick={() => handleEditDoctor(i)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDeleteDoctor(i)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== Appointments Tab ==================== */}
{activeTab === "appointments" && (
  <div>
    <form onSubmit={handleAppointmentSubmit}>
      <input
        type="text"
        placeholder="Patient Name"
        value={appointmentForm.patient}
        onChange={(e) => setAppointmentForm({ ...appointmentForm, patient: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Doctor Name"
        value={appointmentForm.doctor}
        onChange={(e) => setAppointmentForm({ ...appointmentForm, doctor: e.target.value })}
        required
      />
      <input
        type="date"
        value={appointmentForm.date}
        onChange={(e) => setAppointmentForm({ ...appointmentForm, date: e.target.value })}
        required
      />
      <input
        type="time"
        value={appointmentForm.time || ""}
        onChange={(e) => setAppointmentForm({ ...appointmentForm, time: e.target.value })}
        required
      />
      <button type="submit">Add Appointment</button>
    </form>

    <div className="card-list">
      {appointments.map((a, i) => (
        <div key={i} className="card">
          <h3>{a.patient} - {a.doctor}</h3>
          <p>Date: {a.date}</p>
          <p>Time: {a.time}</p>
          <div className="card-buttons">
            <button className="edit-btn" onClick={() => handleEditAppointment(i)}>Edit</button>
            <button className="delete-btn" onClick={() => handleDeleteAppointment(i)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
