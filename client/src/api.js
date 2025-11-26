// client/src/api.js

const API = "http://localhost:5000/api";

export const api = {
  // PRODUCTS
  async getProducts() {
    const res = await fetch(`${API}/products`);
    return res.json();
  },

  async getProduct(id) {
    const res = await fetch(`${API}/products/${id}`);
    return res.json();
  },

  // ORDERS (client)
  async createOrder(data) {
    const res = await fetch(`${API}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },
    async getMyOrders(token) {
    const res = await fetch(`${API}/orders`, {
      headers: {
      Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  },

async cancelOrder(id, token) {
  const res = await fetch(`http://localhost:5000/api/orders/${id}/cancel`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
},

  // ADMIN ORDERS
  async getAdminOrders(token) {
    const res = await fetch(`${API}/admin/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },

  // AUTH + ROLES
  async syncUserProfile(token) {
    const res = await fetch(`${API}/auth/sync`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },

  async getMe() {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },

  // ADMIN PRODUCT CRUD
  async createProduct(data) {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async updateProduct(id, data) {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API}/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async deleteProduct(id) {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API}/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },
};
