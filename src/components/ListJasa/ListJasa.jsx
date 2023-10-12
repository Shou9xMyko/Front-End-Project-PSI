import "./ListJasa.css";
import Card from "react-bootstrap/Card";
import CardImage from "../../assets/Image_Card.png";

const ListJasa = () => {
  const cardData = new Array(20).fill(null);

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-6">
          <h3>DAFTAR JASA</h3>
        </div>
        <div className="col-6 text-end">
          <h3>Total Jasa : {cardData.length}</h3>
        </div>
      </div>

      {/* Card */}
      <div className="row gy-4 gx-0 mt-1">
        {cardData.map((item, index) => {
          return (
            <div className="col" key={index}>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={CardImage} />
                <Card.Body>
                  <Card.Title>Print PI</Card.Title>
                  <Card.Text className="fw-semibold">Rp : 100.000</Card.Text>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the cards content.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListJasa;
