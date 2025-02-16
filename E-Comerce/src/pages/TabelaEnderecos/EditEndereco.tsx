import { Box, Button, MenuItem, Select, Stack, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Endereco } from "../../models/Endereco";
import GetListEndereco from "../../service/Endereco/GetListEndereco";
import GetUserList from "../../service/Usuario/GetListUser";
import { User } from "../../models/User";
import UpdateEndereco from "../../service/Endereco/UpdateEndereco";

const EditEndereco = () => {
  const { id } = useParams<string>();
  const navigate = useNavigate();

  const [rua, setRua] = useState<string>("");
  const [cidade, setCidade] = useState<string>("");
  const [estado, setEstado] = useState<string>("");
  const [cep, setCep] = useState<string>("");
  const [userList, setUserList] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | string>(
    Number(id)
  );

  useEffect(() => {
    const fetch = async () => {
      try {
        const enderecos = await GetListEndereco();
        const selectedEndereco = enderecos.find(
          (d: Endereco) => d.id_usuario === Number(id)
        );

        if (selectedEndereco) {
          setRua(selectedEndereco.rua);
          setCidade(selectedEndereco.cidade);
          setEstado(selectedEndereco.estado);
          setCep(selectedEndereco.cep);
          setSelectedUserId(selectedEndereco.id_usuario);
        }

        const users = await GetUserList();
        setUserList(users);
      } catch (error) {
        console.error("Erro ao buscar informações:", error);
      }
    };

    fetch();
  }, [id]);

  const handleCancel = () => {
    navigate("/endereços");
  };

  const handleEdit = async () => {
    try {
      const updatedEndereco = {
        id_endereco: Number(id),
        id_usuario: Number(selectedUserId),
        rua,
        cidade,
        estado,
        cep,
      };

      const edit = await UpdateEndereco(updatedEndereco);
      if (edit) {
        navigate("/endereços");
      }

      console.log("Atualizações feitas:", updatedEndereco);
    } catch (error) {
      console.error("Error: ", error);
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
          <Select
            sx={{ width: "20rem" }}
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
          >
            <MenuItem value={id}>{id}</MenuItem>
            {userList.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.id} - {user.nome}
              </MenuItem>
            ))}
          </Select>

          <TextField
            sx={{ width: "30rem" }}
            label="Rua"
            value={rua}
            onChange={(e) => setRua(e.target.value)}
          />
          <TextField
            sx={{ width: "30rem" }}
            label="Cidade"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
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
            label="Estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          />
          <TextField
            sx={{ width: "15rem" }}
            label="CEP"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
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

export default EditEndereco;
