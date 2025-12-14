import { useState, useEffect } from "react";
import PatientCard from "../components/PatientCard";
import { fetchPatients, createPatient, updatePatient, deletePatient } from "../api/patients";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({ name: "", birthDate: "", email: "", phone: "" });

  useEffect(() => { loadPatients(); }, []);

  async function loadPatients() {
    const data = await fetchPatients();
    setPatients(data);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email) return alert("Please fill all required fields");
    if (form.id) await updatePatient(form.id, form);
    else await createPatient(form);
    setForm({ name: "", birthDate: "", email: "", phone: "" });
    loadPatients();
  }

  function handleEdit(patient) { setForm(patient); }
  async function handleDelete(id) { await deletePatient(id); loadPatients(); }

  return (
    <div>
      <h1>Patients</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name:e.target.value})} />
        <input type="date" placeholder="Birth Date" value={form.birthDate} onChange={e => setForm({...form, birthDate:e.target.value})} />
        <input placeholder="Email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} />
        <input placeholder="Phone" value={form.phone} onChange={e => setForm({...form, phone:e.target.value})} />
        <button type="submit">{form.id ? "Update" : "Add"}</button>
      </form>

      <div className="list">
        {patients.map(p => <PatientCard key={p.id} patient={p} onEdit={handleEdit} onDelete={handleDelete} />)}
      </div>
    </div>
  );
}
