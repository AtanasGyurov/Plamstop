const API_BASE = "http://localhost:5000/api";

// Helper: parse JSON or throw readable error
async function handleResponse(res) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed with status ${res.status}`);
  }
  return res.json();
}

/* ===========================
   PRODUCTS
=========================== */

// GET /api/products
export async function fetchProducts() {
  const res = await fetch(`${API_BASE}/products`);
  return handleResponse(res);
}

/* ===========================
   ORDERS
=========================== */

// POST /api/orders
export async function createOrder(orderData) {
  const res = await fetch(`${API_BASE}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });
  return handleResponse(res);
}

/* ===========================
   AUTH + USER PROFILE
=========================== */

// POST /api/auth/sync
// Syncs user to Firestore (creates user profile if missing)
export async function syncUserProfile(token) {
  const res = await fetch(`${API_BASE}/auth/sync`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(res);
}

// GET /api/me
// Returns logged-in user profile: { uid, email, name, role }
export async function fetchMe(token) {
  const res = await fetch(`${API_BASE}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(res);
}

/* ===========================
   ADMIN
=========================== */

// GET /api/admin/orders
export async function fetchAdminOrders(token) {
  const res = await fetch(`${API_BASE}/admin/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(res);
}

// PATCH /api/admin/orders/:id/status
export async function updateOrderStatus(id, status, token) {
  const res = await fetch(`${API_BASE}/admin/orders/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });
  return handleResponse(res);
}
