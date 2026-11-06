// useReducer Hook - Module 4
// FER202 - React Hooks

import React, { useReducer } from "react";

// ---- 1. REDUCER FUNCTION ----
// Nhận state hiện tại và action, trả về state mới
const counterReducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    case "RESET":
      return { ...state, count: 0 };
    case "SET":
      return { ...state, count: action.payload };
    default:
      throw new Error(`Action không hợp lệ: ${action.type}`);
  }
};

// ---- 2. COMPONENT SỬ DỤNG useReducer ----
export function CounterWithReducer() {
  // useReducer(reducer, initialState)
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>useReducer - Bộ đếm</h2>
      <p style={{ fontSize: "48px", fontWeight: "bold" }}>{state.count}</p>

      <button onClick={() => dispatch({ type: "INCREMENT" })}>+1</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-1</button>
      <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
      <button onClick={() => dispatch({ type: "SET", payload: 100 })}>
        Đặt = 100
      </button>
    </div>
  );
}

// ---- 3. useReducer CHO GIỎ HÀNG (ví dụ thực tế) ----
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, qty: item.qty + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, qty: 1 }],
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    default:
      return state;
  }
};

export function ShoppingCart() {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });

  const products = [
    { id: 1, name: "Khóa học React", price: 299000 },
    { id: 2, name: "Khóa học JS ES6", price: 199000 },
    { id: 3, name: "Khóa học Bootstrap", price: 149000 },
  ];

  const total = cart.items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>useReducer - Giỏ Hàng</h2>

      <h3>Sản phẩm:</h3>
      {products.map((p) => (
        <div key={p.id}>
          <span>{p.name} - {p.price.toLocaleString()}đ</span>
          <button onClick={() => dispatch({ type: "ADD_ITEM", payload: p })}>
            Thêm vào giỏ
          </button>
        </div>
      ))}

      <h3>Giỏ hàng ({cart.items.length} sản phẩm):</h3>
      {cart.items.map((item) => (
        <div key={item.id}>
          <span>{item.name} x{item.qty}</span>
          <button onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item.id })}>
            Xoá
          </button>
        </div>
      ))}

      <p><strong>Tổng tiền: {total.toLocaleString()}đ</strong></p>
      <button onClick={() => dispatch({ type: "CLEAR_CART" })}>
        Xoá toàn bộ
      </button>
    </div>
  );
}

export default CounterWithReducer;
