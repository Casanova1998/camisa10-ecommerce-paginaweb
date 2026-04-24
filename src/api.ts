import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  // We no longer store session ID in localStorage for security reasons.
  // The browser will handle the HttpOnly "session" cookie automatically
  // because withCredentials is set to true.
  return config;
});

api.interceptors.response.use(
  (response) => {
    // The session is handled via HttpOnly cookies. 
    // We don't store the session token in localStorage anymore.
    return response;
  },
  (error) => {
    const errorData = error.response?.data;
    if (errorData) {
      const detail = Array.isArray(errorData.detail)
        ? errorData.detail.map((e: any) => e.msg).join(", ")
        : errorData.detail;
      return Promise.reject(new Error(detail || "API request failed"));
    }
    return Promise.reject(error);
  }
);

export async function apiRequest(endpoint: string, options: any = {}) {
  return api(endpoint, options).then((res) => res.data);
}

export const catalogApi = {
  getProducts: () => apiRequest("/products"),
  getProduct: (id: string) => apiRequest(`/products/${id}`),
  getMostSold: () => apiRequest("/products/most-sold"),
};

export const cartApi = {
  getCart: () => apiRequest("/cart"),
  addItem: (productId: string, quantity: number) =>
    apiRequest("/cart/items", {
      method: "POST",
      data: { product_id: productId, quantity },
    }),
  updateItem: (productId: string, quantity: number) =>
    apiRequest(`/cart/items/${productId}`, {
      method: "PUT",
      data: { quantity },
    }),
  removeItem: (productId: string) =>
    apiRequest(`/cart/items/${productId}`, { method: "DELETE" }),
  clearCart: () => apiRequest("/cart", { method: "DELETE" }),
};

export const ordersApi = {
  createCheckout: (data: { email?: string; user_id?: string; coupon_code?: string }) =>
    apiRequest("/orders/checkout/create-session", {
      method: "POST",
      data: { cart_session_id: "from-cookie", ...data },
    }),
  validateCoupon: (code: string) =>
    apiRequest("/orders/coupons/validate", {
      method: "POST",
      data: { code },
    }),
};