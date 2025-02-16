import api from "../../api";
import { User } from "../../models/User";

const SearchUser = async (filtros: User) => {
  try {
    const response = await api.post("/buscarUsuarios", filtros);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    throw new Error("Falha ao buscar usuários.");
  }
};

export default SearchUser;
