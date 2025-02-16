import api from "../../api";
import { User } from "../../models/User";

const GetListUser = async (): Promise<User[]> => {
  try {
    const response = await api.get("getTabela", {
      params: { tabelaa: "Usuarios" },
    });

    const updatedRows = response.data.map((user: User[]) => ({
      id: user[0],
      nome: user[1],
      email: user[2],
      telefone: user[3],
      data_nascimento: user[4],
    }));

    return updatedRows;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    throw error;
  }
};

export default GetListUser;
