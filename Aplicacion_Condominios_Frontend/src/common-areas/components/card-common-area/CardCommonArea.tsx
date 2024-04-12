import { Link } from "react-router-dom";
import { CommonArea } from "../../interfaces/common-areas";

import "./card-common-area.css";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";

interface CardCommonAreaProps {
  commonArea: CommonArea;
}

export default function CardCommonArea({ commonArea }: CardCommonAreaProps) {
  return (
    <Card
      style={{
        width: "18rem",
      }}
    >
      <img alt="Sample" src="https://picsum.photos/300/200" />
      <CardBody>
        <CardTitle tag="h5">{commonArea.name}</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          Capacidad: {commonArea.capacity}
        </CardSubtitle>
        <CardText>{commonArea.description}</CardText>
        <Button color="info">
          <Link
            className="card-common-area-link"
            to={`/areas-comunes/${commonArea.id}`}
          >
            Ver detalles
          </Link>
        </Button>
      </CardBody>
    </Card>
  );
}
