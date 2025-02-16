import api from "../../api";
import { Endereco } from "../../models/Endereco";

const UpdateEndereco = async (props: Endereco): Promise<string> => {
  try {
    const response = await api.put(`/putEnderecos/${props.id_endereco}`, props);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar Endereços:", error);
    throw new Error("Falha ao atualizar Endereços.");
  }
};

export default UpdateEndereco;
