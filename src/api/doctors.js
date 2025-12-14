import React, { useState, useEffect } from "react";
import { fetchDoctors, createDoctor, deleteDoctor } from "../api";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({ name: "", specialty: "" });

  useEffect(() => {
    loadDoctors();
  }, []);

  async function loadDoctors() {
    try {
      const data = await fetchDoctors();
      setDoctors(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const newDoctor = await createDoctor(form);
      setDoctors([...doctors, newDoctor]);
      setForm({ name: "", specialty: "" });
    } catch (err) {
      console.error("Failed to create doctor", err);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteDoctor(id);
      setDoctors(doctors.filter(d => d._id !== id));
    } catch (err) {
      console.error("Failed to delete doctor", err);
    }
  }

  return (
    <div>
      <h2>Doctors</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Specialty"
          value={form.specialty}
          onChange={e => setForm({ ...form, specialty: e.target.value })}
          required
        />
        <button type="submit">Add Doctor</button>
      </form>

      <ul>
        {doctors.map(d => (
          <li key={d._id}>
            {d.name} ({d.specialty})
            <button onClick={() => handleDelete(d._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
