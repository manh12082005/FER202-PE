import React from 'react';

// Yêu cầu 6: View Movie Details
export default function MovieDetail({ movie, onClose }) {
    return (
        // Bấm ra vùng tối bên ngoài (overlay) cũng sẽ gọi onClose để đóng chi tiết (yêu cầu 6: User can close)
        <div className="modal-overlay" onClick={onClose}>
            {/* Chặn sự kiện click để không bị đóng khi click vào nội dung bên trong modal */}
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                {/* Yêu cầu 6: Hiển thị toàn bộ thông tin chi tiết của phim */}
                <h2>{movie.title}</h2>
                <div style={{ marginBottom: '1.5rem', color: 'var(--text-color)' }}>
                    <p><strong>Genre:</strong> {movie.genre}</p>
                    <p><strong>Year:</strong> {movie.year}</p>
                    <p><strong>Rating:</strong> {movie.rating}</p>
                    <p><strong>Director:</strong> {movie.director}</p>
                    <p><strong>Duration:</strong> {movie.duration} minutes</p>
                    <br />
                    <p><strong>Description:</strong></p>
                    <p style={{ marginTop: '0.5rem', opacity: 0.9 }}>{movie.description}</p>
                </div>
                
                {/* Nút đóng modal chi tiết */}
                <button className="btn btn-primary close-btn" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
}
