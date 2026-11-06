// Form Handling Nâng Cao - Module 5
// FER202 - React Events

import React, { useState } from "react";

// ---- 1. CONTROLLED FORM ĐƠN GIẢN ----
export function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email không được để trống";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email không hợp lệ";
    if (!formData.password) newErrors.password = "Mật khẩu không được để trống";
    else if (formData.password.length < 6)
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Xoá lỗi khi người dùng bắt đầu nhập
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    alert(`Đăng nhập với: ${formData.email}`);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>Đăng Nhập</h2>

      <div>
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Nhập email..."
        />
        {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
      </div>

      <div>
        <label>Mật khẩu:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Nhập mật khẩu..."
        />
        {errors.password && (
          <span style={{ color: "red" }}>{errors.password}</span>
        )}
      </div>

      <div>
        <input
          type="checkbox"
          name="remember"
          checked={formData.remember}
          onChange={handleChange}
        />
        <label>Ghi nhớ đăng nhập</label>
      </div>

      <button type="submit">Đăng Nhập</button>
    </form>
  );
}

// ---- 2. FORM ĐĂNG KÝ PHỨC TẠP ----
export function RegisterForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    semester: "",
    agreeTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.fullName) errs.fullName = "Vui lòng nhập họ tên";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      errs.email = "Email không hợp lệ";
    if (formData.password.length < 6)
      errs.password = "Mật khẩu tối thiểu 6 ký tự";
    if (formData.password !== formData.confirmPassword)
      errs.confirmPassword = "Mật khẩu xác nhận không khớp";
    if (!formData.gender) errs.gender = "Vui lòng chọn giới tính";
    if (!formData.semester) errs.semester = "Vui lòng chọn kỳ học";
    if (!formData.agreeTerms) errs.agreeTerms = "Bạn phải đồng ý điều khoản";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
  };

  if (submitted)
    return <h3 style={{ color: "green" }}>🎉 Đăng ký thành công!</h3>;

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: "0 auto" }}>
      <h2>Đăng Ký Tài Khoản</h2>

      <input name="fullName" placeholder="Họ và tên" onChange={handleChange} />
      {errors.fullName && <p style={{ color: "red" }}>{errors.fullName}</p>}

      <input name="email" placeholder="Email" onChange={handleChange} />
      {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

      <input name="password" type="password" placeholder="Mật khẩu" onChange={handleChange} />
      {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

      <input name="confirmPassword" type="password" placeholder="Xác nhận mật khẩu" onChange={handleChange} />
      {errors.confirmPassword && <p style={{ color: "red" }}>{errors.confirmPassword}</p>}

      <select name="gender" onChange={handleChange}>
        <option value="">-- Chọn giới tính --</option>
        <option value="male">Nam</option>
        <option value="female">Nữ</option>
        <option value="other">Khác</option>
      </select>
      {errors.gender && <p style={{ color: "red" }}>{errors.gender}</p>}

      <select name="semester" onChange={handleChange}>
        <option value="">-- Chọn kỳ học --</option>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((s) => (
          <option key={s} value={s}>Kỳ {s}</option>
        ))}
      </select>
      {errors.semester && <p style={{ color: "red" }}>{errors.semester}</p>}

      <label>
        <input type="checkbox" name="agreeTerms" onChange={handleChange} />
        Tôi đồng ý với điều khoản sử dụng
      </label>
      {errors.agreeTerms && <p style={{ color: "red" }}>{errors.agreeTerms}</p>}

      <button type="submit">Đăng Ký</button>
    </form>
  );
}

export default LoginForm;
