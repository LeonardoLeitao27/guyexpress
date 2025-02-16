import api from "../../api";
import { Produto } from "../../models/Produto";

const CreateProduto = async (porps: Produto): Promise<string> => {
  try {
    const response = await api.post("/postProdutos", porps);

    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar Produto:", error);
    throw error;
  }
};

export default CreateProduto;
