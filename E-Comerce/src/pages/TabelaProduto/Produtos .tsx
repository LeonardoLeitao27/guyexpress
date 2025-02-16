import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import DataTable from "../../components/Datatable";
import { GridColDef } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Produto } from "../../models/Produto";
import GetListProduto from "../../service/Produto/GetListProduto";
import CreateProduto from "../../service/Produto/CreateProduto";
import DeleteProduto from "../../service/Produto/DeleteProduto";
import SearchProduto from "../../service/Produto/SearchProduto";

const columns: GridColDef<Produto>[] = [
  { field: "id_produto", headerName: "ID_Produto", width: 120 },
  { field: "nome", headerName: "Nome", width: 180 },
  { field: "preco", headerName: "Preço ", width: 240 },
  { field: "categoria", headerName: "Categoria", width: 170 },
  { field: "estoque", headerName: "Estoque ", width: 180 },
];

const Usuarios = () => {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState(0);
  const [categoria, setCategoria] = useState("");
  const [estoque, setEstoque] = useState(0);
  const [produtoList, setProdutoList] = useState<Produto[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const updatedRows = await GetListProduto();
        setProdutoList(updatedRows);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async () => {
    const filtros = {
      nome,
      preco,
      categoria,
      estoque,
    };

    try {
      const Endereco = await SearchProduto(filtros);

      const EnderecoFormatados = Endereco.map((props: Produto[]) => ({
        id_produto: props[0],
        nome: props[1],
        preco: props[2],
        categoria: props[3],
        estoque: props[4],
      }));

      setProdutoList(EnderecoFormatados);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      alert("Erro ao buscar usuários.");
    }
  };

  const handleClear = () => {
    setNome("");
    setPreco(0);
    setCategoria("");
    setEstoque(0);
  };

  const handleEdit = (props: Produto) => {
    if (props) {
      navigate(`/editProduto/${props.id_produto}`);
    }
  };

  const handleCreate = async () => {
    const novoCreateEndereco: Produto = {
      nome,
      categoria,
      estoque,
      preco,
    };

    try {
      const mensagem = await CreateProduto(novoCreateEndereco);
      alert(mensagem);
      handleClear();
      const updatedRows = await GetListProduto();
      setProdutoList(updatedRows);
    } catch (error) {
      console.error("Erro ao cadastrar Endereço:", error);
      alert(
        "Erro ao cadastrar Endereço. Verifique o console para mais detalhes."
      );
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir este Endereço?"))
      return;

    try {
      await DeleteProduto(id);
      const updatedRows = await GetListProduto();
      setProdutoList(updatedRows);
    } catch (error) {
      console.error("Erro ao deletar Endereço:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          paddingBottom: "2rem",
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        <TextField
          sx={{ width: "30rem" }}
          label={"Nome"}
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          slotProps={{
            htmlInput: { maxLength: 50 },
          }}
        />
        <TextField
          sx={{ width: "30rem" }}
          label={"Preço"}
          value={preco}
          onChange={(e) => setPreco(Number(e.target.value))}
          slotProps={{
            htmlInput: { maxLength: 100 },
          }}
        />
      </Box>
      <Box
        sx={{
          paddingBottom: "2rem",
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        <TextField
          sx={{ width: "15rem" }}
          label={"Categoria "}
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          slotProps={{
            htmlInput: {
              maxLength: 11,
            },
          }}
        />
        <TextField
          sx={{ width: "15rem" }}
          label={"Estoque"}
          value={estoque}
          onChange={(e) => {
            setEstoque(Number(e.target.value));
          }}
        />
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            paddingBottom: "2rem",
            paddingLeft: "7rem",
            gap: "1rem",
          }}
        >
          <Button variant="outlined" onClick={handleClear} color="error">
            Limpar
          </Button>
          <Button
            sx={{ backgroundColor: "green" }}
            variant="contained"
            onClick={handleSubmit}
          >
            Consultar
          </Button>
          <Button variant="contained" onClick={handleCreate}>
            Cadastrar
          </Button>
        </Stack>
      </Box>
      <Box
        sx={{
          paddingBottom: "1rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" component="h2">
          Lista de Produtos
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Box sx={{ width: "66%" }}>
          <DataTable
            columns={columns}
            rows={produtoList}
            getRowId={(row) => row.id_produto ?? 0}
            onDelete={(props) => handleDelete(props.id_produto ?? 0)}
            onEdit={handleEdit}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Usuarios;
