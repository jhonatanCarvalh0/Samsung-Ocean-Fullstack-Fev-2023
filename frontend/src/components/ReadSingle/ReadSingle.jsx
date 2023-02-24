import "./ReadSingle.css";
import Card from "../Card/Card";
import { useEffect, useState } from "react";

function ReadSingle(props) {
  const [items, setItems] = useState([]);
  const characterId = props.id;
  // Realiza requisição para backend obtendo a lista de itens
  async function realizarRequisicaoBackend() {
    const url = `https://ocean-jornada-fullstack-fevereiro-2023-6vz7.onrender.com/characters/${characterId}`;
    const response = await fetch(url);

    const data = await response.json();
    setItems(data);
  }

  useEffect(function () {
    realizarRequisicaoBackend();
  }, []);

  const character = items;

  return (
    <div className="ReadSingle">
      <Card key={"card-" + character._id} item={character} />
    </div>
  );
}

export default ReadSingle;
