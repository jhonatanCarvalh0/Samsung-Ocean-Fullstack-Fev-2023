import "./ReadAll.css";
import Card from "../Card/Card";
import { useEffect, useState } from "react";

// Mock Items (exatamente a mesma estrutura que o back traria)
// Isso facilita o trabalho aqui no Front, para conseguir estruturar
// comportamento, sem precisar depender do back para receber dados

const itemsMock = [
  {
    _id: "63ee1e0b18f2b9a93da8435a",
    nome: "Rick Sanchez",
    imagemUrl: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    tags: ["Status: Vivo", "Espécie: Humana", "Origem: Terra C-137"],
  },
  {
    _id: "63ef87c74522de2944ab1fa8",
    nome: "Morty Smith",
    imagemUrl: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
  },
  {
    _id: "63ef87cc4522de2944ab1fa9",
    nome: "Summer Smith",
    imagemUrl: "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
  },
  {
    _id: "63ef87d44522de2944ab1faa",
    nome: "Beth Smith",
    imagemUrl: "https://rickandmortyapi.com/api/character/avatar/4.jpeg",
  },
  {
    _id: "63ef87e24522de2944ab1fab",
    nome: "Jerry Smith",
    imagemUrl: "https://rickandmortyapi.com/api/character/avatar/5.jpeg",
  },
];

/*
- Para cada item da lista, exibe um card do Rick Sanchez
- Pegar a informação de cada item e enviar para o componente <Card />
- A informação recebida no card deve ser exibida no console.log
- Pegar cada parte da informação recebida e colocá-la nos elementos de HTML
*/

// Sintaxe de concatenação de variáveis dentro do JSX, chaves: {}
// { VARIAVEL }
// Concatenar = unir de forma lógica

// Na verdade, as chaves representam que código JavaScript pode ser
// inserido dentro delas

function ReadAll() {
  const [items, setItems] = useState([]);

  // Realiza requisição para backend obtendo a lista de itens
  async function realizarRequisicaoBackend() {
    //const url = "http://localhost:3000/characters";
    const url =
      "https://ocean-jornada-fullstack-fevereiro-2023-6vz7.onrender.com/characters";
    const response = await fetch(url);

    const data = await response.json();
    setItems(data);
  }

  useEffect(function () {
    realizarRequisicaoBackend();
  }, []);

  return (
    <div className="ReadAll">
      {items.map(function (item) {
        return <Card key={"card-" + item._id} item={item} />;
      })}
    </div>
  );
}

export default ReadAll;
