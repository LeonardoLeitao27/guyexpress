import { Box, Button, Stack, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Produto } from "../../models/Produto";
import GetListProduto from "../../service/Produto/GetListProduto";
import UpdateProduto from "../../service/Produto/UpdateProduto";

const EditProduto = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [estoque, setEstoque] = useState(0);
  const [preco, setPreco] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const users = await GetListProduto();
        const selectedUser = users.find(
          (u: Produto) => u.id_produto === Number(id)
        );
        if (selectedUser) {
          setNome(selectedUser.nome);
          setCategoria(selectedUser.categoria);
          setEstoque(selectedUser.estoque);
          setPreco(selectedUser.preco);
        }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };

    fetchUser();
  }, [id]);

  const handleCancel = () => {
    navigate("/produtos");
  };

  const handleEdit = async () => {
    try {
      const updatedUser = {
        id_produto: Number(id),
        nome,
        preco,
        categoria,
        estoque,
      };

      const edit = await UpdateProduto(updatedUser);
      if (edit) {
        navigate("/produtos");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          paddingBottom: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          justifyContent: "center",
          paddingLeft: "3rem",
        }}
      >
        <Stack
          sx={{
            paddingBottom: "2rem",
            display: "flex",
            gap: "1rem",
            flexDirection: "row",
          }}
        >
          <TextField
            sx={{ width: "30rem" }}
            label="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <TextField
            sx={{ width: "30rem" }}
            label="Preço"
            value={preco}
            onChange={(e) => setPreco(Number(e.target.value))}
          />
        </Stack>

        <Stack
          sx={{
            paddingBottom: "2rem",
            display: "flex",
            gap: "1rem",
            flexDirection: "row",
          }}
        >
          <TextField
            sx={{ width: "15rem" }}
            label="Categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          />
          <TextField
            sx={{ width: "15rem" }}
            label="Estoque"
            value={estoque}
            onChange={(e) => setEstoque(Number(e.target.value))}
            slotProps={{
              htmlInput: {
                maxLength: 10,
              },
              inputLabel: { shrink: true },
            }}
          />
          <Stack
            sx={{ paddingLeft: "5rem", flexDirection: "row", gap: "1rem" }}
          >
            <Button variant="outlined" onClick={handleCancel} color="error">
              Cancelar
            </Button>
            <Button variant="contained" onClick={handleEdit}>
              Salvar Alterações
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default EditProduto;
