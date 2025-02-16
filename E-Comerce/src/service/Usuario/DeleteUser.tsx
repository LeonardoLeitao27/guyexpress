import api from "../../api";
const DeleteUser = async (id: number): Promise<string> => {
  try {
    const response = await api.delete("/deleteUsuarios", {
      data: { id },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    throw new Error("Falha ao deletar usuário.");
  }
};

export default DeleteUser;
