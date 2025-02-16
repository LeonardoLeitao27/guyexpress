import api from "../../api";
const DeleteProduto = async (id: number): Promise<string> => {
  try {
    const response = await api.delete(`/deleteProdutos/${id}`);

    return response.data;
  } catch (error) {
    console.error("Erro ao deletar Endereco:", error);
    throw new Error("Falha ao deletar Endereco.");
  }
};

export default DeleteProduto;
