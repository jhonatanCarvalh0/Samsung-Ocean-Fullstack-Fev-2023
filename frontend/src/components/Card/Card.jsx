import "./Card.css";

function Card(props) {
  // console.log(props);
  const item = props.item;

  const colors = item.color;
  const getColor = (colors) => {
    let arr = colors.slice();
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === "Pink") {
        return { backgroundColor: arr[i] };
      }

      if (arr[i] === "Lilac") {
        return { backgroundColor: "#d2afff", color: "#FFFFFF" };
      }

      if (arr[i] === "Light Peach") {
        return { backgroundColor: "#FFB4E3", color: "#FFFFFF" };
      }

      if (arr[i]) {
        return { backgroundColor: arr[i], color: "white" };
      }

      return;
    }
  };
  console.log(colors);
  const bkgColor = getColor(colors);
  console.log(bkgColor);

  return (
    <div className="card">
      <h1>{item.characterName}</h1>

      {/* Renderização condicional do elemento color */}
      {colors && (
        <div className="color-wrapper">
          {colors.map(function (color, index) {
            return (
              <div key={`color-${index}`} className="color" style={bkgColor}>
                {color}
              </div>
            );
          })}
        </div>
      )}

      <img src={item.imgURL} />
    </div>
  );
}

export default Card;
