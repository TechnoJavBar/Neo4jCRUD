import { Container, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxesStacked } from "@fortawesome/free-solid-svg-icons";
import "./Home.css";

const Home = () => {
  return (
    <main>
      <Container className="py-5 my-3">
        <Row className="p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
          <Col lg={7} className="p-3 p-lg-5 pt-lg-3">
            <h1 className="display-4 fw-bold lh-1">Bienvenidos a TPVaj</h1>
            <p className="lead mt-4">
              La solución moderna y eficiente para la gestión de inventario.
              Administra tus productos, controla el stock y gestiona tus
              proveedores con facilidad y rapidez.
            </p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
              <Link to="/productos">
                <Button variant="primary" size="lg" className="px-4 me-md-2">
                  Empezar
                </Button>
              </Link>
            </div>
          </Col>
          <Col lg={4} className="offset-lg-1 p-0 text-center">
            <FontAwesomeIcon
              icon={faBoxesStacked}
              size="10x"
              className="text-secondary opacity-50 mb-4"
            />
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Home;
