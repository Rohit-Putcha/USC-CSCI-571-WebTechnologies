import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
  const [form, setForm] = useState({
    name: "",
    director: "",
    genre: "",
    records: [],
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:5000/record/${params.id.toString()}`);

      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(record);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedPerson = {
      name: form.name,
      director: form.director,
      genre: form.genre,
    };

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5000/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedPerson),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    navigate("/");
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div>
      <h3>Update Record</h3>
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
