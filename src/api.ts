const API_BASE_URL = "http://localhost:8000/api/v1";

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    ...options,
    credentials: "include", // Essential for HttpOnly cookies
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  const response = await fetch(url, defaultOptions);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "API request failed");
  }

  return response.json();
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
      body: JSON.stringify({ product_id: productId, quantity }),
    }),
  updateItem: (productId: string, quantity: number) => 
    apiRequest(`/cart/items/${productId}`, {
      method: "PUT",
      body: JSON.stringify({ quantity }),
    }),
  removeItem: (productId: string) => 
    apiRequest(`/cart/items/${productId}`, { method: "DELETE" }),
  clearCart: () => apiRequest("/cart", { method: "DELETE" }),
};

export const ordersApi = {
  createCheckout: (userId: string) => 
    apiRequest("/orders/checkout/create-session", {
      method: "POST",
      body: JSON.stringify({ cart_session_id: "from-cookie", user_id: userId }),
    }),
};
