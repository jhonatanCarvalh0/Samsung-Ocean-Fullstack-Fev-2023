import React from "react";
import "./Header.css";

function Header({onClick}) {
  return (
    <div className="Header">
      <img src="https://oceanbrasil.com/assets/logo.svg" alt="Logo do Ocean" />
      <div className="Header__links">
        <a href="characters" onClick={onClick}>Get All</a>
        <a href=""> | </a>
        <a href="characters">Find One</a>
      </div>
    </div>
  );
}

export default Header;
