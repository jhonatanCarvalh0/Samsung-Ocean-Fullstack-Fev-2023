import "./Card.css";

function Card(props) {
  // console.log(props);
  const item = props.item;
  const tags = item.color;
  const checkStyle = (tag) => {
    if (tag === "Pink") {
      return { backgroundColor: tag };
    }

    if (tag === "Lilac") {
      return { backgroundColor: "#d2afff", color: "#FFFFFF" };
    }

    if (tag === "Light Peach") {
      return { backgroundColor: "#FFB4E3", color: "#FFFFFF" };
    }

    if (tag === "Purple" || tag === "Red" || tag === "Blue") {
      return { backgroundColor: tag, color: "white" };
    }

    if (tag === "Yellow") {
      return { backgroundColor: tag, color: "#FFFFFF" };
    }

    if (tag === "White") {
      return { backgroundColor: tag, color: "black"};
    }
    return { backgroundColor: "black", color: "white" };
  };
  return (
    <div className="card">
      <h1>{item.characterName}</h1>
      {tags && (
        <div className="tag-wrapper">
          {tags.map(function (tag, index) {
            const style = checkStyle(tag);
            for (let i = 0; i < tags.length; i++) {
              return (
                <div key={`tag-${index}`} className="tag" style={style}>
                  {tag}
                </div>
              );
            }
            return;
          })}
        </div>
      )}
      <img src={item.imgURL} />
      <div> id: {item._id}</div>
    </div>
  );
}

export default Card;
