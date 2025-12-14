import React, { useState, useEffect } from "react";
import { fetchPatients, createPatient, updatePatient, deletePatient } from "../api";

export default function PatientCard() {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({ name: "", birthDate: "", email: "", phone: "" });
  const [editingId, setEditingId] = useState(null);

  const loadPatients = async () => {
    try {
      const data = await fetchPatients();
      setPatients(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updatePatient(editingId, form);
        setEditingId(null);
      } else {
        await createPatient(form);
      }
      setForm({ name: "", birthDate: "", email: "", phone: "" });
      loadPatients();
    } catch (err) {
      console.error("Failed to save patient", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePatient(id);
      loadPatients();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (patient) => {
    setForm({
      name: patient.name,
      birthDate: patient.birthDate,
      email: patient.email,
      phone: patient.phone,
    });
    setEditingId(patient.id);
  };

  return (
    <div>
      <h2>Patients</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="birthDate" type="date" value={form.birthDate} onChange={handleChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
        <button type="submit" style={{ backgroundColor: "#10367d", color: "#fff" }}>
          {editingId ? "Update Patient" : "Add Patient"}
        </button>
      </form>

      <ul>
        {patients.map((p) => (
          <li key={p.id}>
            {p.name} | {p.birthDate} | {p.email} | {p.phone}
            <button onClick={() => handleEdit(p)}>Edit</button>
            <button onClick={() => handleDelete(p.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
