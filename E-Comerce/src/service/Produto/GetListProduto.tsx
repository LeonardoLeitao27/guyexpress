import api from "../../api";
import { Produto } from "../../models/Produto";

const GetListProduto = async (): Promise<Produto[]> => {
  try {
    const response = await api.get("/getProdutos", {
      params: { tabelaa: "Produtos" },
    });

    console.log("Resposta da API:", response.data);

    const updatedRows = response.data.map((props: Produto[]) => ({
      id_produto: props[0],
      nome: props[1],
      preco: props[2],
      categoria: props[3],
      estoque: props[4],
    }));

    return updatedRows;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    throw error;
  }
};

export default GetListProduto;
