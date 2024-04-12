import Loader from "../Loader/Loader";
import useCreateCommonArea from "../../hooks/useCreateCommonArea";

import "./common-area.css";

const DAYS = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

export default function CommonAreaForm() {
  const {
    addPolicy,
    capacity,
    description,
    error,
    errors,
    handleSubmit,
    horarios,
    name,
    policies,
    policy,
    setCapacity,
    setDescription,
    setCheckbox,
    setEndHour,
    setName,
    setPolicy,
    setStartHour,
    submitting,
  } = useCreateCommonArea();

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="name-capacity-container">
        <div
          className="form-group"
          style={{
            width: "100%",
          }}
        >
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={setName}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="capacity">Capacidad:</label>
          <input
            type="number"
            id="capacity"
            value={capacity}
            onChange={setCapacity}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="description">Descripción:</label>
        <textarea
          style={{
            resize: "none",
            minHeight: "100px",
          }}
          id="description"
          value={description}
          onChange={setDescription}
          required
        />
      </div>

      <div className="form-group">
        <h3>Horario</h3>
        {horarios.map((horario, index) => (
          <div key={index} className="schedule-container">
            <div
              className="hour-container"
              style={{
                opacity: horario.isChecked ? 1 : 0.4,
              }}
            >
              <p>{DAYS[horario.day]}:</p>

              <div className="hour-inputs-container">
                <input
                  type="time"
                  value={horario.startHour}
                  onChange={(e) => setStartHour(e, index)}
                  disabled={!horario.isChecked}
                />
                <input
                  type="time"
                  value={horario.endHour}
                  onChange={(e) => setEndHour(e, index)}
                  disabled={!horario.isChecked}
                />
              </div>
            </div>

            <label>
              <input
                style={{
                  cursor: "pointer",
                }}
                type="checkbox"
                checked={horario.isChecked}
                onChange={() => setCheckbox(index)}
              />
            </label>
          </div>
        ))}
      </div>

      <div className="form-group">
        <h3>Políticas/Reglas</h3>

        <div className="policy-container">
          <textarea
            style={{
              resize: "none",
              minHeight: "100px",
            }}
            value={policy}
            onChange={setPolicy}
            placeholder="Escribe una política/regla"
          />

          <button type="button" className="btn-add-policy" onClick={addPolicy}>
            Agregar
          </button>
        </div>
        <ul>
          {policies.map((policy, index) => (
            <li key={index}>{policy}</li>
          ))}
        </ul>
      </div>

      {submitting && (
        <div className="loader-container">
          <Loader />
        </div>
      )}

      {error !== "" && (
        <div className="errors-container">
          <h3
            style={{
              padding: 0,
              margin: 0,
              textAlign: "center",
            }}
          >
            {error}
          </h3>

          <ul>
            {errors.map((error, index) => {
              return <li key={index}>{error}</li>;
            })}
          </ul>
        </div>
      )}

      <button className="btn-submit" type="submit">
        Registrar Área
      </button>
    </form>
  );
}
