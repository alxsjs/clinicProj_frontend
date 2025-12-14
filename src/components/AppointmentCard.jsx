import React, { useState, useEffect } from "react";
import { fetchAppointments, createAppointment, updateAppointment, deleteAppointment } from "../api";

export default function AppointmentCard() {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({ patientName: "", doctorName: "", date: "", time: "" });
  const [editingId, setEditingId] = useState(null);

  const loadAppointments = async () => {
    try {
      const data = await fetchAppointments();
      setAppointments(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateAppointment(editingId, form);
        setEditingId(null);
      } else {
        await createAppointment(form);
      }
      setForm({ patientName: "", doctorName: "", date: "", time: "" });
      loadAppointments();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAppointment(id);
      loadAppointments();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (appointment) => {
    setForm({
      patientName: appointment.patientName,
      doctorName: appointment.doctorName,
      date: appointment.date,
      time: appointment.time,
    });
    setEditingId(appointment.id);
  };

  return (
    <div>
      <h2>Appointments</h2>
      <form onSubmit={handleSubmit}>
        <input name="patientName" placeholder="Patient Name" value={form.patientName} onChange={handleChange} />
        <input name="doctorName" placeholder="Doctor Name" value={form.doctorName} onChange={handleChange} />
        <input name="date" type="date" value={form.date} onChange={handleChange} />
        <input name="time" type="time" value={form.time} onChange={handleChange} />
        <button type="submit" style={{ backgroundColor: "#10367d", color: "#fff" }}>
          {editingId ? "Update Appointment" : "Add Appointment"}
        </button>
      </form>

      <ul>
        {appointments.map((a) => (
          <li key={a.id}>
            {a.patientName} | {a.doctorName} | {a.date} | {a.time}
            <button onClick={() => handleEdit(a)}>Edit</button>
            <button onClick={() => handleDelete(a.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
