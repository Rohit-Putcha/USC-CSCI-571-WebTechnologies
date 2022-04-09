import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    name: "",
    director: "",
    genre: "",
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newMovie = { ...form };

    await fetch("http://localhost:5000/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMovie),
    })
    .catch(error => {
      window.alert(error);
      return;
    });

    setForm({ name: "", director: "", genre: "" });
    navigate("/");
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Create New Record</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="director">Director</label>
          <input
            type="text"
            className="form-control"
            id="director"
            value={form.director}
            onChange={(e) => updateForm({ director: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="genreOptions">Genre: </label>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="genre"
              id="genreHorror"
              value="Horror"
              checked={form.genre === "Horror"}
              onChange={(e) => updateForm({ genre: e.target.value })}
            />
            <label htmlFor="genreHorror" className="form-check-label">Horror</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="genre"
              id="genreRomCom"
              value="RomCom"
              checked={form.genre === "RomCom"}
              onChange={(e) => updateForm({ genre: e.target.value })}
            />
            <label htmlFor="genreRomCom" className="form-check-label">RomCom</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="genre"
              id="genreDrama"
              value="Drama"
              checked={form.genre === "Drama"}
              onChange={(e) => updateForm({ genre: e.target.value })}
            />
            <label htmlFor="genreDrama" className="form-check-label">Drama</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="genre"
              id="genreSciFi"
              value="SciFi"
              checked={form.genre === "SciFi"}
              onChange={(e) => updateForm({ genre: e.target.value })}
            />
            <label htmlFor="genreSciFi" className="form-check-label">SciFi</label>
          </div>
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create record"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
