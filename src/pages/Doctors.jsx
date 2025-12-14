import { useState, useEffect } from "react";
import DoctorCard from "../components/DoctorCard";
import { fetchDoctors, createDoctor, updateDoctor, deleteDoctor } from "../api/doctors";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({ name: "", specialty: "" });

  useEffect(() => { loadDoctors(); }, []);

  async function loadDoctors() {
    const data = await fetchDoctors();
    setDoctors(data);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.specialty) return alert("Please fill all required fields");
    
    if (form.id) await updateDoctor(form.id, form);
    else await createDoctor(form);
    
    setForm({ name: "", specialty: "" });
    loadDoctors();
  }

  function handleEdit(doctor) { setForm(doctor); }
  async function handleDelete(id) { await deleteDoctor(id); loadDoctors(); }

  return (
    <div>
      <h1>Doctors</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Specialty"
          value={form.specialty}
          onChange={e => setForm({ ...form, specialty: e.target.value })}
        />
        <button type="submit">{form.id ? "Update" : "Add"}</button>
      </form>

      <div className="list">
        {doctors.map(d => (
          <DoctorCard key={d.id} doctor={d} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
