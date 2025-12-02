// client/src/api.js
import axios from "axios";
import { getAuth } from "firebase/auth";

// AXIOS INSTANCE
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Attach Firebase token
api.interceptors.request.use(async (config) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Named exports
export async function getProducts() {
  const res = await api.get("/products");
  return res.data;
}

export async function syncUserProfile() {
  const res = await api.post("/auth/sync");
  return res.data;
}

export async function getMe() {
  const res = await api.get("/auth/me");
  return res.data;
}

export async function placeOrder(order) {
  const res = await api.post("/orders", order);
  return res.data;
}

export async function getMyOrders() {
  const res = await api.get("/orders");
  return res.data;
}

export async function adminGetOrders() {
  const res = await api.get("/orders/admin/orders");
  return res.data;
}

// Default export (IMPORTANT)
export default api;
