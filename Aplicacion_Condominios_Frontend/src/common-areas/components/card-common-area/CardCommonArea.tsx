import { Link } from "react-router-dom";
import { CommonArea } from "../../interfaces/common-areas";

import "./card-common-area.css";

interface CardCommonAreaProps {
  commonArea: CommonArea;
}

export default function CardCommonArea({ commonArea }: CardCommonAreaProps) {
  return (
    <Link
      to={`/areas-comunes/${commonArea.id}`}
      className="card-common-area-link"
    >
      <article key={commonArea.id} className="card-common-area">
        <h3>{commonArea.name}</h3>
        <p>Capacidad: {commonArea.capacity}</p>
        <p>{commonArea.description}</p>
      </article>
    </Link>
  );
}
