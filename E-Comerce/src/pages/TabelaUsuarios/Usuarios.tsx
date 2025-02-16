import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import DataTable from "../../components/Datatable";
import { NewUser, User } from "../../models/User";
import { GridColDef } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GetListUser from "../../service/Usuario/GetListUser";
import DeleteUser from "../../service/Usuario/DeleteUser";
import CreateUser from "../../service/Usuario/CreateUser";
import SearchUser from "../../service/Usuario/SearchUser";

const columns: GridColDef<User>[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "nome", headerName: "Nome", width: 180 },
  { field: "email", headerName: "Email", width: 240 },
  { field: "telefone", headerName: "Telefone", width: 170 },
  { field: "data_nascimento", headerName: "Data de Nascimento", width: 180 },
];

const Usuarios = () => {
  const [userList, setUserList] = useState<User[]>([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState<string>("");
  const [dataNascimento, setDataNascimento] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const updatedRows = await GetListUser();
        setUserList(updatedRows);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async () => {
    const filtros = {
      nome,
      email,
      telefone,
      data_nascimento: dataNascimento,
    };

    try {
      const usuarios = await SearchUser(filtros);

      const usuariosFormatados = usuarios.map((user: User[]) => ({
        id: user[0],
        nome: user[1],
        email: user[2],
        telefone: user[3],
        data_nascimento: user[4],
      }));

      setUserList(usuariosFormatados);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      alert("Erro ao buscar usuários.");
    }
  };

  const handleClear = () => {
    setNome("");
    setEmail("");
    setTelefone("");
    setDataNascimento("");
  };

  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/g, "");
    if (numericValue.length <= 11) {
      setTelefone(numericValue);
    }
  };

  const handleEdit = (user: User) => {
    if (user) {
      navigate(`/editUser/${user.id}`);
    }
  };

  const handleCreate = async () => {
    const novoUsuario: NewUser = {
      nome,
      email,
      telefone,
      data_nascimento: new Date(dataNascimento).toISOString().split("T")[0],
    };

    try {
      const mensagem = await CreateUser(novoUsuario);
      alert(mensagem);
      handleClear(); //

      const updatedRows = await GetListUser();
      setUserList(updatedRows);
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      alert(
        "Erro ao cadastrar usuário. Verifique o console para mais detalhes."
      );
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir este usuário?")) return;

    try {
      await DeleteUser(id);
      const updatedRows = await GetListUser();
      setUserList(updatedRows);
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
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
          label={"Email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          label={"Telefone"}
          value={telefone}
          onChange={handleTelefoneChange}
          slotProps={{
            htmlInput: {
              maxLength: 11,
            },
          }}
        />
        <TextField
          sx={{ width: "15rem" }}
          label={"Data de Nascimento"}
          type="date"
          value={dataNascimento}
          onChange={(e) => setDataNascimento(e.target.value)}
          slotProps={{
            htmlInput: {
              maxLength: 10,
            },
            inputLabel: { shrink: true },
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
          Lista de Usuários
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Box sx={{ width: "64%" }}>
          <DataTable
            columns={columns}
            rows={userList}
            getRowId={(row) => row.id ?? 0}
            onDelete={(user) => handleDelete(Number(user.id))}
            onEdit={handleEdit}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Usuarios;
