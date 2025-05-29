import React, { useEffect, useState } from "react";
import axios from "axios";

const EmpleadosLista = () => {
  const [trabajadores, setTrabajadores] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    axios.get("/api/empleados").then((res) => setTrabajadores(res.data));
  }, []);

  const trabajadoresFiltrados = trabajadores.filter((emp) =>
    (emp.nombreCompleto + emp.numeroDocumento)
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  return (
    <div className="empleados-lista-container">
      <h1 className="titulo">Lista de Empleados</h1>
      <div className="buscador">
        <input
          type="text"
          placeholder="Buscar por nombre, DNI, etc."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <button>Buscar</button>
      </div>
      <table className="tabla-empleados">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tipo de Doc.</th>
            <th>Numero de Doc.</th>
            <th>Cargo</th>
            <th>Sueldo</th>
            <th>Moneda</th>
            <th>Estado del contrato</th>
            <th>Más info</th>
          </tr>
        </thead>
        <tbody>
          {trabajadoresFiltrados.map((emp) => (
            <tr key={emp.idTrabajador}>
              <td>{emp.nombreCompleto}</td>
              <td>{emp.tipoDocumento}</td>
              <td style={{ fontWeight: "bold" }}>{emp.numeroDocumento}</td>
              <td>{emp.cargo}</td>
              <td>S/.{emp.sueldo}</td>
              <td>{emp.moneda}</td>
              <td>{emp.estadoContrato}</td>
              <td>
                <button className="info-btn">+ Info</button>
              </td>
            </tr>
          ))}
          {}
          {[...Array(5 - trabajadoresFiltrados.length)].map((_, i) => (
            <tr key={`empty-${i}`}>
              <td colSpan={8} style={{ background: "#f6fafd" }}>&nbsp;</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="acciones">
        <button className="planilla-btn">Generar planilla</button>
        <button className="agregar-btn">+</button>
      </div>
    </div>
  );
};

export default EmpleadosLista;