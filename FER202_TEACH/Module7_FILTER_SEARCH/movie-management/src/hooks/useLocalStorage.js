import { useState, useEffect } from 'react';

// Yêu cầu 8: Save Favorite Data Using Local Storage
export function useLocalStorage(key, initialValue) {
    // Yêu cầu 8: Load favorite movie IDs khi ứng dụng khởi chạy (starts)
    const [value, setValue] = useState(() => {
        try {
            // Đọc dữ liệu từ localStorage dựa vào key ('movie_favorites')
            const item = window.localStorage.getItem(key);
            // Parse dữ liệu (do localStorage lưu chuỗi) hoặc trả về giá trị mặc định []
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.warn("Error reading localStorage", error);
            return initialValue;
        }
    });

    // Yêu cầu 8: Save favorite movie IDs bất cứ khi nào danh sách favorite bị thay đổi
    useEffect(() => {
        try {
            // Cập nhật giá trị vào localStorage
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.warn("Error setting localStorage", error);
        }
    }, [key, value]); // Hook chạy lại mỗi khi value thay đổi

    return [value, setValue];
}
