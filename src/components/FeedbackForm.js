import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState({
    subject: "",
    faculty: "",
    rating: "Poor",
    comment: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "feedbacks"), feedback);
    
    const feedbacks = await getDocs(collection(db, "feedbacks"));
    if (feedbacks.docs.length >= 10) {
      navigate("/summary");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Faculty Feedback</h2>
      <select onChange={(e) => setFeedback({ ...feedback, subject: e.target.value })}>
        <option>Select Subject</option>
        <option>Math</option>
        <option>Science</option>
      </select>
      <select onChange={(e) => setFeedback({ ...feedback, faculty: e.target.value })}>
        <option>Select Faculty</option>
        <option>Prof. A</option>
        <option>Prof. B</option>
      </select>
      <textarea placeholder="Write your feedback..." onChange={(e) => setFeedback({ ...feedback, comment: e.target.value })}></textarea>
      <button type="submit">Submit Feedback</button>
    </form>
  );
};

export default FeedbackForm;
