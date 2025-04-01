import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const Summary = () => {
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    const fetchSummary = async () => {
      const data = await getDocs(collection(db, "feedbacks"));
      setSummary(data.docs.map(doc => doc.data()));
    };
    fetchSummary();
  }, []);

  return (
    <div>
      <h2>Feedback Summary</h2>
      {summary.map((item, index) => (
        <div key={index}>
          <p>{item.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default Summary;
