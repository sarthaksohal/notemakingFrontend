import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const API_URL = "http://localhost:8080/notes/save";
  const API_URL1 = "http://localhost:8080/notes/get";
  const API_URL2 = "http://localhost:8080/notes/delete";

  const fetchNotes = async () => {
    try {
      const res = await axios.get(API_URL1);
      setNotes(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch notes. Is the backend running?");
    }
  };

  const addNote = async () => {
    if (!title || !content) {
      setError("Title and Content cannot be empty");
      return;
    }
    try {
      await axios.post(API_URL, { title, content });
      setTitle("");
      setContent("");
      fetchNotes();
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to add note. Check backend or network.");
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${API_URL2}/${id}`);
      fetchNotes();
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to delete note. Check backend or network.");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Styling objects
  const containerStyle = {
    padding: "30px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    maxWidth: "600px",
    margin: "0 auto",
  };

  const inputStyle = {
    padding: "10px",
    marginRight: "10px",
    marginBottom: "10px",
    width: "calc(50% - 12px)",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };

  const buttonStyle = {
    padding: "10px 15px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "white",
    cursor: "pointer",
  };

  const noteCardStyle = {
    padding: "15px",
    marginBottom: "10px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#f44336",
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: "center" }}>Notes App</h1>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
        />
        <input
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={inputStyle}
        />
        <button onClick={addNote} style={{ ...buttonStyle, width: "100%" }}>
          Add Note
        </button>
      </div>
      <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
        {notes.map((n) => (
          <li key={n.id} style={noteCardStyle}>
            <div>
              <strong>{n.title}</strong>: {n.content}
            </div>
            <button onClick={() => deleteNote(n.id)} style={deleteButtonStyle}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
