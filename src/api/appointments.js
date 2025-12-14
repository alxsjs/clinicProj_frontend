import React, { useState, useEffect } from "react";
import { fetchAppointments, createAppointment, deleteAppointment } from "../api";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({ patientName: "", doctorName: "", date: "", time: "" });

  useEffect(() => {
    loadAppointments();
  }, []);

  async function loadAppointments() {
    try {
      const data = await fetchAppointments();
      setAppointments(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const newAppointment = await createAppointment(form);
      setAppointments([...appointments, newAppointment]);
      setForm({ patientName: "", doctorName: "", date: "", time: "" });
    } catch (err) {
      console.error("Failed to create appointment", err);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteAppointment(id);
      setAppointments(appointments.filter(a => a._id !== id));
    } catch (err) {
      console.error("Failed to delete appointment", err);
    }
  }

  return (
    <div>
      <h2>Appointments</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Patient Name"
          value={form.patientName}
          onChange={e => setForm({ ...form, patientName: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Doctor Name"
          value={form.doctorName}
          onChange={e => setForm({ ...form, doctorName: e.target.value })}
          required
        />
        <input
          type="date"
          value={form.date}
          onChange={e => setForm({ ...form, date: e.target.value })}
          required
        />
        <input
          type="time"
          value={form.time}
          onChange={e => setForm({ ...form, time: e.target.value })}
          required
        />
        <button type="submit">Add Appointment</button>
      </form>

      <ul>
        {appointments.map(a => (
          <li key={a._id}>
            {a.patientName} with {a.doctorName} on {a.date} at {a.time}
            <button onClick={() => handleDelete(a._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
