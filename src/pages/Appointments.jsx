import { useState, useEffect } from "react";
import AppointmentCard from "../components/AppointmentCard";
import { fetchAppointments, createAppointment, updateAppointment, deleteAppointment } from "../api/appointments";
import { fetchPatients } from "../api/patients";
import { fetchDoctors } from "../api/doctors";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({ patientId: "", doctorId: "", startAt: "", endAt: "", notes: "" });

  useEffect(() => {
    loadAppointments();
    loadPatients();
    loadDoctors();
  }, []);

  async function loadAppointments() {
    const data = await fetchAppointments();
    setAppointments(data);
  }
  async function loadPatients() { setPatients(await fetchPatients()); }
  async function loadDoctors() { setDoctors(await fetchDoctors()); }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.patientId || !form.doctorId || !form.startAt) return alert("Please fill all required fields");
    
    if (form.id) await updateAppointment(form.id, form);
    else await createAppointment(form);
    
    setForm({ patientId: "", doctorId: "", startAt: "", endAt: "", notes: "" });
    loadAppointments();
  }

  function handleEdit(a) { setForm(a); }
  async function handleDelete(id) { await deleteAppointment(id); loadAppointments(); }

  return (
    <div>
      <h1>Appointments</h1>
      <form onSubmit={handleSubmit}>
        <select value={form.patientId} onChange={e => setForm({ ...form, patientId: e.target.value })}>
          <option value="">Select Patient</option>
          {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>

        <select value={form.doctorId} onChange={e => setForm({ ...form, doctorId: e.target.value })}>
          <option value="">Select Doctor</option>
          {doctors.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
        </select>

        <input type="datetime-local" value={form.startAt} onChange={e => setForm({ ...form, startAt: e.target.value })} />
        <input type="datetime-local" value={form.endAt} onChange={e => setForm({ ...form, endAt: e.target.value })} />
        <input placeholder="Notes" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />

        <button type="submit">{form.id ? "Update" : "Add"}</button>
      </form>

      <div className="list">
        {appointments.map(a => (
          <AppointmentCard key={a.id} appointment={a} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
