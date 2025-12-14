import React, { useState, useEffect } from "react";
import { fetchDoctors, createDoctor, updateDoctor, deleteDoctor } from "../api";

export default function DoctorCard() {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({ name: "", specialty: "" });
  const [editingId, setEditingId] = useState(null);

  const loadDoctors = async () => {
    try {
      const data = await fetchDoctors();
      setDoctors(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoctor(editingId, form);
        setEditingId(null);
      } else {
        await createDoctor(form);
      }
      setForm({ name: "", specialty: "" });
      loadDoctors();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoctor(id);
      loadDoctors();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (doctor) => {
    setForm({ name: doctor.name, specialty: doctor.specialty });
    setEditingId(doctor.id);
  };

  return (
    <div>
      <h2>Doctors</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="specialty" placeholder="Specialty" value={form.specialty} onChange={handleChange} />
        <button type="submit" style={{ backgroundColor: "#10367d", color: "#fff" }}>
          {editingId ? "Update Doctor" : "Add Doctor"}
        </button>
      </form>

      <ul>
        {doctors.map((d) => (
          <li key={d.id}>
            {d.name} | {d.specialty}
            <button onClick={() => handleEdit(d)}>Edit</button>
            <button onClick={() => handleDelete(d.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
