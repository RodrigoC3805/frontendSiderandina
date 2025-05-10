import React from "react";
import { Link } from "react-router-dom";

const MenuLateral = () => (
  <nav className="menu-lateral">
    <ul>
      <li>
        <Link to="/casos-uso">Casos de uso</Link>
      </li>
      <li>
        <Link to="/empleados">R.R.H.H.</Link>
      </li>
      {/* otras opciones */}
    </ul>
  </nav>
);

export default MenuLateral;