import React from "react";
import { Container, List } from "semantic-ui-react"
import {ListPosts} from "../../../components/Web/Blog"

export function Blog() {
  return (
    <Container>
      <ListPosts />
    </Container>
  );
}
