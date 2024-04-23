import * as React from "react";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Home from "../Pages/Home";
import Header from "./Header";
import ScrollTop from "../Components/ScrollTop";

const darkTheme = createTheme({ palette: { mode: "dark" } });
const centerFlex = { display: "flex", justifyContent: "center" };

export default function Layout(props) {
  return (
    <Grid container sx={{ height: "100vh" }}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header />
        <Toolbar id="back-to-top-anchor" />
        <Container sx={centerFlex}>
          <Home />
        </Container>
        <ScrollTop />
      </ThemeProvider>
    </Grid>
  );
}
