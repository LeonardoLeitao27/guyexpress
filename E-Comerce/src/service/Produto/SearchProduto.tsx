import api from "../../api";
import { Produto } from "../../models/Produto";

const SearchProduto = async (filtros: Produto) => {
  try {
    const response = await api.post("/buscarProdutos", filtros);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar Produto:", error);
    throw new Error("Falha ao buscar Produto.");
  }
};

export default SearchProduto;
