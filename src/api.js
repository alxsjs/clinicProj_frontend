const API_URL = "http://localhost:3000"; // backend

// -------------------- PATIENTS --------------------
export async function fetchPatients() {
  const res = await fetch(`${API_URL}/api/patients`);
  if (!res.ok) throw new Error("Failed to fetch patients");
  return res.json();
}

export async function createPatient(patient) {
  const res = await fetch(`${API_URL}/api/patients`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patient)
  });
  if (!res.ok) throw new Error("Failed to create patient");
  return res.json();
}

export async function updatePatient(id, data) {
  const res = await fetch(`${API_URL}/api/patients/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Failed to update patient");
  return res.json();
}

export async function deletePatient(id) {
  const res = await fetch(`${API_URL}/api/patients/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete patient");
  return res.json();
}

// -------------------- DOCTORS --------------------
export async function fetchDoctors() {
  const res = await fetch(`${API_URL}/api/doctors`);
  if (!res.ok) throw new Error("Failed to fetch doctors");
  return res.json();
}

export async function createDoctor(doctor) {
  const res = await fetch(`${API_URL}/api/doctors`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(doctor)
  });
  if (!res.ok) throw new Error("Failed to create doctor");
  return res.json();
}

export async function updateDoctor(id, data) {
  const res = await fetch(`${API_URL}/api/doctors/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Failed to update doctor");
  return res.json();
}

export async function deleteDoctor(id) {
  const res = await fetch(`${API_URL}/api/doctors/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete doctor");
  return res.json();
}

// -------------------- APPOINTMENTS --------------------
export async function fetchAppointments() {
  const res = await fetch(`${API_URL}/api/appointments`);
  if (!res.ok) throw new Error("Failed to fetch appointments");
  return res.json();
}

export async function createAppointment(appointment) {
  const res = await fetch(`${API_URL}/api/appointments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(appointment)
  });
  if (!res.ok) throw new Error("Failed to create appointment");
  return res.json();
}

export async function updateAppointment(id, data) {
  const res = await fetch(`${API_URL}/api/appointments/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Failed to update appointment");
  return res.json();
}

export async function deleteAppointment(id) {
  const res = await fetch(`${API_URL}/api/appointments/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete appointment");
  return res.json();
}
