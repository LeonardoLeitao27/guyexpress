import { Box } from "@mui/material";
import "./App.css";
import MenuList from "./components/menuList";
import AppRoutes from "./routes";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Box>
        <MenuList />
        <Box
          sx={{
            marginLeft: "200px",
            padding: 4,
          }}
        >
          <AppRoutes />
        </Box>
      </Box>
    </Router>
  );
}

export default App;
