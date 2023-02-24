import "./ReadSingle.css";
import Card from "../Card/Card";
import { useEffect, useState } from "react";

function ReadSingle(props) {
  const [items, setItems] = useState([]);
  const characterId = props.id;
  // Realiza requisição para backend obtendo a lista de itens
  async function realizarRequisicaoBackend() {
    const url = `http://localhost:3000/characters/${characterId}`;
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
