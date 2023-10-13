import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Navbar className="bg-info">
      <Container>
        <Navbar.Brand>
          <Link
            to={"/"}
            className="fs-4"
            style={{ textDecoration: "none", color: "white" }}
          >
            <i className="fa-solid fa-cloud-arrow-up fa-bounce"></i> Media
            Player
          </Link>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;
