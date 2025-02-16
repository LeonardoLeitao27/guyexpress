import api from "../../api";
import { User } from "../../models/User";

const UpdateUser = async (user: User): Promise<string> => {
  try {
    const response = await api.put("/putUsuarios", user);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    throw new Error("Falha ao atualizar usuário.");
  }
};

export default UpdateUser;
