import api from "../../api";
import { Produto } from "../../models/Produto";

const UpdateProduto = async (props: Produto): Promise<string> => {
  try {
    const response = await api.put(`/putProdutos/${props.id_produto}`, props);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar Endereços:", error);
    throw new Error("Falha ao atualizar Endereços.");
  }
};

export default UpdateProduto;
