import { Link } from "react-router-dom";
import { Box, List, ListItem, ListItemButton, Typography } from "@mui/material";
import Logo from "../assets/GUY-EXPRESS.png";

const MenuList = () => {
  return (
    <Box
      sx={{
        width: 240,
        top: 0,
        left: 0,
        height: "100vh",
        position: "fixed",
        backgroundColor: "#d8d2cb",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "2rem",
          paddingBottom: "3rem",
        }}
      >
        <img
          src={Logo}
          alt="Logo"
          style={{
            width: "100%",
            height: "auto",
            justifyContent: "center",
            borderRadius: "1rem",
          }}
        />
      </Box>

      <List
        sx={{
          color: "#282a2c",
          fontFamily: "Poppins, sans-serif",
          flexGrow: 1,
        }}
      >
        {[
          { to: "/usuarios", label: "Usuários" },
          { to: "/endereços", label: "Endereços" },
          { to: "/entrega", label: "Entrega" },
          { to: "/motoristas", label: "Motoristas" },
          { to: "/pedido_produto", label: "Pedido dos Produtos" },
          { to: "/pedidos", label: "Pedidos" },
          { to: "/produtos", label: "Produtos" },
          { to: "/transportadoras", label: "Transportadoras" },
        ].map(({ to, label }) => (
          <ListItem key={to} disablePadding>
            <ListItemButton
              component={Link}
              to={to}
              sx={{
                "&:hover": {
                  backgroundColor: "#b9b5b5",
                },
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  color: "#282a2c",
                }}
              >
                {label}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box
        sx={{
          textAlign: "center",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#c4bfba",
          fontSize: "0.9rem",
          fontWeight: "bold",
          color: "#282a2c",
        }}
      >
        Beta 1.0.1
      </Box>
    </Box>
  );
};

export default MenuList;
