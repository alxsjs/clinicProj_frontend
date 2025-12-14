import React, { useState, useEffect } from "react";
import {
  fetchPatients,
  createPatient,
  deletePatient,
} from "../api";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({ name: "", birthDate: "", email: "", phone: "" });

  // Load patients on mount
  useEffect(() => {
    loadPatients();
  }, []);

  async function loadPatients() {
    try {
      const data = await fetchPatients();
      setPatients(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const newPatient = await createPatient(form);
      setPatients([...patients, newPatient]);
      setForm({ name: "", birthDate: "", email: "", phone: "" });
    } catch (err) {
      console.error("Failed to create patient", err);
    }
  }

  async function handleDelete(id) {
    try {
      await deletePatient(id);
      setPatients(patients.filter(p => p._id !== id));
    } catch (err) {
      console.error("Failed to delete patient", err);
    }
  }

 return (
  <div className="section">
    <h2>Patients</h2>

    {/* Form */}
    <form onSubmit={handleSubmit} className="patient-form">
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        type="date"
        placeholder="Birth Date"
        value={form.birthDate}
        onChange={e => setForm({ ...form, birthDate: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        required
      />
      <input
        type="tel"
        placeholder="Phone"
        value={form.phone}
        onChange={e => setForm({ ...form, phone: e.target.value })}
        required
      />
      <button type="submit" className="add-btn">Add Patient</button>
    </form>

    {/* Patient Cards */}
    <div className="cards-container">
      {patients.map(p => (
        <div className="card" key={p._id}>
          <h3>{p.name}</h3>
          <p>Email: {p.email}</p>
          <p>Phone: {p.phone}</p>
          <p>Birth Date: {p.birthDate}</p>
          <div className="card-buttons">
            <button className="edit-btn" onClick={() => handleEdit(p)}>Edit</button>
            <button className="delete-btn" onClick={() => handleDelete(p._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}