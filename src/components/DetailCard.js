import React from "react";
import {  Card } from "react-bootstrap";

export default function DetailCard({ data }) {
  const {
    categoryFullName: { en },category
  } = data;
  return (
    <div>
      <Card style={{ width: "18rem",  boxShadow:" 0.4px 0.4px 0 rgba(0,0,0,0.6)" }}>
        <Card.Body>
          <Card.Title>{category.en}</Card.Title>
          <Card.Text>{en}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
