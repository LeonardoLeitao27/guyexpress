import { Box, Button, Stack, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { User } from "../../models/User";
import GetListUser from "../../service/Usuario/GetListUser";
import UpdateUser from "../../service/Usuario/UpdateUser";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const users = await GetListUser();
        const selectedUser = users.find((u: User) => u.id === Number(id));
        if (selectedUser) {
          setNome(selectedUser.nome);
          setEmail(selectedUser.email);
          setTelefone(selectedUser.telefone);
          setDataNascimento(formatDateToInput(selectedUser.data_nascimento));
        }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };

    fetchUser();
  }, [id]);

  const formatDateToInput = (dateStr: string) => {
    if (!dateStr.includes("/")) return dateStr;

    const [day, month, year] = dateStr.split("/");
    return `${year}-${month}-${day}`;
  };

  const handleCancel = () => {
    navigate("/usuarios");
  };

  const handleEdit = async () => {
    try {
      const updatedUser = {
        id: Number(id),
        nome,
        email,
        telefone,
        data_nascimento: dataNascimento,
      };

      const edit = await UpdateUser(updatedUser);
      if (edit) {
        navigate("/usuarios");
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
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            label="Telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
          <TextField
            sx={{ width: "15rem" }}
            label="Data de Nascimento"
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

export default EditUser;
