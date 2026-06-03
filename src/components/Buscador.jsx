import { useEffect, useState } from "react";

const Buscador = ({ onSearchChange, placeholder = "Escribe la especialidad o el nombre del médico..." }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      onSearchChange(value.trim());
    }, 320);

    return () => window.clearTimeout(timeoutId);
  }, [value, onSearchChange]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearchChange(value.trim());
  };

  return (
    <div className="search-panel" id="directorio">
      <form className="search-panel__field" onSubmit={handleSubmit}>
        <input
          type="search"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={placeholder}
          aria-label="Buscar especialidad o médico"
        />
        <button type="submit">Buscar</button>
      </form>
      <p className="search-panel__hint">Filtra por especialidad, médico o palabra clave del servicio.</p>
    </div>
  );
};

export default Buscador;