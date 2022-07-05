import "./styles.css";
import { useState } from "react";

export default function App() {
  const [job, setJob] = useState("");
  const [jobs, setJobs] = useState(() => {
    const storageJobs = JSON.parse(localStorage.getItem("jobs"));
    return storageJobs ?? [];
  });

  const handleSubmit = () => {
    if (job.trim()) {
      setJobs((prev) => {
        const newJobs = [...prev, job];

        // Save to local storage
        const jsonJobs = JSON.stringify(newJobs);
        localStorage.setItem("jobs", jsonJobs);

        return newJobs;
      });
    }
    //clear value on input
    setJob("");
  };

  const handleDelete = (job) => {
    setJobs((prev) => {
      const newJobs = prev.filter((item) => item !== job);

      // Save after deleting
      const jsonJobs = JSON.stringify(newJobs);
      localStorage.setItem("jobs", jsonJobs);

      return newJobs;
    });
  };

  return (
    <div style={{ margin: "2rem" }}>
      <h2>Todo List</h2>
      <input
        value={job}
        onChange={(e) => setJob(e.target.value)}
        onKeyPress={(e) => e.charCode === 13 && handleSubmit()}
      />
      <button onClick={handleSubmit}>Add</button>

      <ul>
        {jobs.map((job, index) => (
          <li key={index}>
            {job}
            <span
              onClick={() => handleDelete(job)}
              style={{ paddingLeft: 8, color: "red", cursor: "pointer" }}
            >
              x
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
