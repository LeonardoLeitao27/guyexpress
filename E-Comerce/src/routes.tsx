import { Routes, Route, Navigate } from "react-router-dom";
import Usuarios from "./pages/TabelaUsuarios/Usuarios";
import Enderecos from "./pages/TabelaEnderecos/Enderecos";
import Entrega from "./pages/Entrega";
import Motoristas from "./pages/Motoristas";
import Pedido_Produto from "./pages/Pedido_Produto";
import Pedidos from "./pages/Pedidos";
import Produtos from "./pages/TabelaProduto/Produtos ";
import Transportadoras from "./pages/Transportadoras";
import EditUser from "./pages/TabelaUsuarios/EditUser";
import EditEndereco from "./pages/TabelaEnderecos/EditEndereco";
import EditProduto from "./pages/TabelaProduto/EditProduto";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/usuarios" />} />
      //Usuários
      <Route path="/usuarios" element={<Usuarios />} />
      <Route path="/editUser/:id" element={<EditUser />} />
      //Endereços
      <Route path="/endereços" element={<Enderecos />} />
      <Route path="/editEndereços/:id" element={<EditEndereco />} />
      //Produtos
      <Route path="/produtos" element={<Produtos />} />
      <Route path="/editProduto/:id" element={<EditProduto />} />
      <Route path="/entrega" element={<Entrega />} />
      <Route path="/motoristas" element={<Motoristas />} />
      <Route path="/pedido_produto" element={<Pedido_Produto />} />
      <Route path="/pedidos" element={<Pedidos />} />
      <Route path="/transportadoras" element={<Transportadoras />} />
    </Routes>
  );
};

export default AppRoutes;
