import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Header = () => {
  return (
    <AppBar role="header">
      <Toolbar>
        <Typography variant="h6" component="div">
          TODO App
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
