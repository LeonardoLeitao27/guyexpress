import api from "../../api";
import { NewUser } from "../../models/User";

const CreateUser = async (usuario: NewUser): Promise<string> => {
  try {
    const response = await api.post("postUsuarios", usuario);

    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    throw error;
  }
};

export default CreateUser;
