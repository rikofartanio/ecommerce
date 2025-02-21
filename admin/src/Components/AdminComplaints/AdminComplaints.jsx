
import { useState, useEffect } from "react";
import './AdminComplaints.css';


const Complaints = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await fetch("http://localhost:4000/allcomplaints");
      const data = await response.json();
      setComplaints(data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  
  const deleteComplaint = async (id) => {
    console.log(`Request URL: http://localhost:4000/deletecomplaint/${id}`);

    try {
      const response = await fetch(`http://localhost:4000/deletecomplaint/${id}`, {
        
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });
  
      if (response.ok) {
        alert("Complaint deleted successfully!");
        setComplaints(complaints.filter(complaint => complaint._id !== id));
      } else {
        alert("Failed to delete complaint.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while deleting the complaint.");
    }
  };
  
  console.log("Complaints data:", complaints);

  return (
    <div className="admin-complaints-container">
      <h1>Customer Complaints</h1>
      {complaints.length > 0 ? (
        <ul>
        {complaints.map((complaint) => (
           <li key={complaint._id}>
           <strong>Complaint:</strong> {complaint.message} <br />
           <button onClick={() => deleteComplaint(complaint._id)} className="delete-btn">Delete</button>
         </li>
         
          ))}
        </ul>
      ) : (
        <p>No complaints available.</p>
      )}
    </div>
  );
};

export default Complaints;
