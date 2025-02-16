import {
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DataTable from "../../components/Datatable";
import { GridColDef } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Endereco } from "../../models/Endereco";
import GetListEndereco from "../../service/Endereco/GetListEndereco";
import CreateEndereco from "../../service/Endereco/CreateEndereco";
import DeleteEndereco from "../../service/Endereco/DeleteEndereco";
import { User } from "../../models/User";
import GetListUser from "../../service/Usuario/GetListUser";
import SearchEndereco from "../../service/Endereco/SearchEndereco";

const columns: GridColDef<Endereco>[] = [
  { field: "id_endereco", headerName: "ID_Endereço", width: 120 },
  { field: "id_usuario", headerName: "ID_Usuario", width: 90 },
  { field: "rua", headerName: "RUA", width: 180 },
  { field: "cidade", headerName: "Cidade", width: 240 },
  { field: "estado", headerName: "Estado", width: 170 },
  { field: "cep", headerName: "CEP", width: 180 },
];

const Enderecos = () => {
  const [EnderecoList, setEnderecoList] = useState<Endereco[]>([]);
  const [rua, setRua] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState<string>("");
  const [cep, setCep] = useState<string>("");
  const [id_usuario, setId_Usuario] = useState(0);
  const [UserList, setUserList] = useState<User[]>([]);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const updatedRows = await GetListEndereco();
        setEnderecoList(updatedRows);
        const updatedRowsUser = await GetListUser();
        if (!Array.isArray(updatedRowsUser)) {
          console.error("Erro: GetListUser não retornou uma lista!");
          return;
        }

        setUserList([...updatedRowsUser]);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async () => {
    const filtros = {
      id_endereco: 0,
      id_usuario,
      rua,
      cidade,
      estado,
      cep,
    };

    try {
      const response = await SearchEndereco(filtros);

      if (!Array.isArray(response)) {
        console.error("Erro: SearchEndereco não retornou uma lista válida!");
        return;
      }

      const formattedData = response.map((item) => ({
        id_endereco: item[0],
        id_usuario: item[1],
        rua: item[2],
        cidade: item[3],
        estado: item[4],
        cep: item[5],
      }));

      setEnderecoList(formattedData);
      console.log("Estado atualizado:", formattedData);
    } catch (error) {
      console.error("Erro ao buscar endereços:", error);
      alert("Erro ao buscar endereços.");
    }
  };

  const handleClear = () => {
    setRua("");
    setCidade("");
    setEstado("");
    setCep("");
    setId_Usuario(0);
  };

  const handleEdit = (props: Endereco) => {
    if (props) {
      navigate(`/editEndereços/${props.id_usuario}`);
    }
  };

  const handleCreate = async () => {
    const novoCreateEndereco: Endereco = {
      id_usuario,
      rua,
      cidade,
      estado,
      cep,
    };

    try {
      const mensagem = await CreateEndereco(novoCreateEndereco);
      alert(mensagem);
      handleClear();
      const updatedRows = await GetListEndereco();
      setEnderecoList(updatedRows);
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
      await DeleteEndereco(id);
      const updatedRows = await GetListEndereco();
      setEnderecoList(updatedRows);
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
        <Select
          sx={{ width: "20rem" }}
          value={id_usuario}
          onChange={(e) => setId_Usuario(e.target.value as number)}
        >
          <MenuItem value={0}>Selecione um usuário</MenuItem>
          {UserList.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.id} - {user.nome}
            </MenuItem>
          ))}
        </Select>

        <TextField
          sx={{ width: "30rem" }}
          label={"Rua"}
          value={rua}
          onChange={(e) => setRua(e.target.value)}
          slotProps={{
            htmlInput: { maxLength: 50 },
          }}
        />
        <TextField
          sx={{ width: "30rem" }}
          label={"Cidade"}
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
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
          label={"Estado"}
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          slotProps={{
            htmlInput: {
              maxLength: 11,
            },
          }}
        />
        <TextField
          sx={{ width: "15rem" }}
          label={"CEP"}
          value={cep}
          onChange={(e) => {
            const numericValue = e.target.value.replace(/\D/g, "");
            setCep(numericValue);
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
          Lista de Endereços
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Box sx={{ width: "75%" }}>
          <DataTable
            columns={columns}
            rows={EnderecoList}
            getRowId={(row) => row.id_endereco ?? 0}
            onDelete={(props) => handleDelete(props.id_endereco ?? 0)}
            onEdit={handleEdit}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Enderecos;
