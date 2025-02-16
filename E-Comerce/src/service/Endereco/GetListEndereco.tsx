import api from "../../api";
import { Endereco } from "../../models/Endereco";

const GetListEndereco = async (): Promise<Endereco[]> => {
  try {
    const response = await api.get("/getEnderecos", {
      params: { tabelaa: "Enderecos" },
    });

    console.log("Resposta da API ENdereço:", response.data);

    const updatedRows = response.data.map((props: Endereco[]) => ({
      id_endereco: props[0],
      id_usuario: props[1],
      rua: props[2],
      cidade: props[3],
      estado: props[4],
      cep: props[5],
    }));

    return updatedRows;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    throw error;
  }
};

export default GetListEndereco;
