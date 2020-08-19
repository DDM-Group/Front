import _ from "lodash";
import React, { Component } from "react";
import {
  Container,
  Icon,
  Image,
  Menu,
  Sidebar,
  Responsive
} from "semantic-ui-react";

export default function NavBarChildren({ children }) {
    return(
            <Container style={{ marginTop: "5em" }}>{children}</Container>
        );
    }