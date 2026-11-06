// //useEffect với loading và error

import { useEffect, useState } from "react";
import axios from "axios";

export default function StudentDashboard() {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          "http://localhost:5000/testAttempts?userId=u-student-001"
        );

        setAttempts(response.data);
      } catch (err) {
        setError("Không tải được lịch sử làm bài");
      } finally {
        setLoading(false);
      }
    };

    fetchAttempts();
  }, []);

  if (loading) return <p>Đang tải dashboard...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Lịch sử làm bài</h2>

      {attempts.map((attempt) => (
        <div key={attempt.id}>
          <p>Test ID: {attempt.testId}</p>
          <p>Band Score: {attempt.bandScore}</p>
        </div>
      ))}
    </div>
  );
}