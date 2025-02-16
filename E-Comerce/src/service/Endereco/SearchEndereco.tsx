import api from "../../api";
import { Endereco } from "../../models/Endereco";

const SearchEndereco = async (filtros: Endereco) => {
  try {
    const response = await api.post("/buscarEnderecos", filtros);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar Endereço:", error);
    throw new Error("Falha ao buscar Endereço.");
  }
};

export default SearchEndereco;
