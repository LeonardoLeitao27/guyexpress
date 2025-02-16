# Importa utilitários e bibliotecas necessárias
from utils import *  # Importa funções auxiliares do projeto
from pydantic import BaseModel  # Define modelos de dados para validação
from fastapi import FastAPI, Query  # Cria a API e recebe parâmetros
from fastapi.middleware.cors import CORSMiddleware  # Middleware para permitir requisições de diferentes origens
from datetime import datetime  # Manipulação de datas
import json  # Trabalhar com JSON
import subprocess  # Executar comandos no sistema
from starlette.middleware.cors import CORSMiddleware  # Middleware para requisições CORS
from typing import Optional  # Define campos opcionais nos modelos

# Inicializa a aplicação FastAPI
app = FastAPI()

# Configura o middleware CORS para permitir requisições de qualquer origem
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todas as origens
    allow_credentials=True,  # Permite o envio de cookies
    allow_methods=["*"],  # Permite todos os métodos HTTP (GET, POST, etc.)
    allow_headers=["*"],  # Permite todos os headers
)

# === Modelos de dados ===
# Define as classes de dados que representam os objetos utilizados na API

class Tabela(BaseModel):
    tabelaa: str  # Nome da tabela a ser consultada

class Usuario(BaseModel):
    nome: str
    email: str
    telefone: str
    data_nascimento: str

class UsuarioBusca(BaseModel):
    id_usuario: Optional[int] = None
    nome: Optional[str] = None
    email: Optional[str] = None
    telefone: Optional[str] = None
    data_nascimento: Optional[str] = None

class UsuarioDel(BaseModel):
    id: int

class UsuarioPut(BaseModel):
    id: int
    nome: str = None
    email: str = None
    telefone: str = None
    data_nascimento: str = None

class Endereco(BaseModel):
    id_usuario: int
    rua: str
    cidade: str
    estado: str
    cep: str

class EnderecoBusca(BaseModel):
    id_usuario: Optional[int] = None
    rua: Optional[str] = None
    cidade: Optional[str] = None
    estado: Optional[str] = None
    cep: Optional[str] = None


class Produto(BaseModel):
    nome: str
    preco: float
    categoria: str
    estoque: int

class ProdutoBusca(BaseModel):
    nome: Optional[str] = None
    preco: Optional[float] = None
    categoria: Optional[str] = None
    estoque: Optional[int] = None

class Pedido(BaseModel):
    id_usuario: int
    status: str

class PedidoBusca(BaseModel):
    id_usuario: Optional[int] = None
    status: Optional[str] = None

class PedidoProduto(BaseModel):
    id_pedido: int
    id_produto: int
    quantidade: int
    preco_unitario: float

class Transportadora(BaseModel):
    nome: str

class Motorista(BaseModel):
    nome: str
    telefone: str

class Entrega(BaseModel):
    id_pedido: int
    id_transportadora: int
    id_motorista: int
    data_entrega: str

class Tabela(BaseModel):
    tabelaa: str

# === Endpoints de busca ===
@app.post("/buscarUsuarios")
def api_buscar_usuarios(usuario: UsuarioBusca):
    return buscar_usuarios(usuario.id_usuario, usuario.nome, usuario.email, usuario.telefone, usuario.data_nascimento)


@app.post("/buscarProdutos")
def api_buscar_produtos(produto: ProdutoBusca):
    return buscar_produtos(produto.nome, produto.preco, produto.categoria, produto.estoque)

@app.post("/buscarPedidos")
def api_buscar_pedidos(pedido: PedidoBusca):
    return buscar_pedidos(pedido.id_usuario, pedido.status)

@app.post("/buscarEnderecos")
def api_buscar_enderecos(endereco: EnderecoBusca):
    return buscar_enderecos(endereco.id_usuario, endereco.rua, endereco.cidade, endereco.estado, endereco.cep)


@app.get("/getTabela")
def e(tabelaa: str = Query(...)):
    resulTabela = pesquisar_tabela(tabelaa)
    return resulTabela

# === Endpoints CRUD ===
# Operações CRUD para Usuários
@app.get("/getUsuarios")
def get_usuarios():
    return pesquisar_tabela('Usuarios')

@app.post("/postUsuarios")
def post_usuario(usuario: Usuario) -> str:
    inserir_dados('Usuarios', ['nome', 'email', 'telefone', 'data_nascimento'], 
                  (usuario.nome, usuario.email, usuario.telefone, usuario.data_nascimento))
    return "Usuário adicionado com sucesso"

@app.delete("/deleteUsuarios")
def delete_usuario(usuario: UsuarioDel) -> str:
    remover_dados('Usuarios', f"id_usuario = {usuario.id}")
    return "Usuário removido com sucesso"

@app.put("/putUsuarios")
def put_usuario(usuario: UsuarioPut) -> str:
    atualizacoes = {k: v for k, v in usuario.dict().items() if v is not None and k != 'id'}
    atualizar_dados('Usuarios', atualizacoes, f"id_usuario = {usuario.id}")
    return "Usuário atualizado com sucesso"

# === Outros endpoints CRUD (Endereços, Produtos, Pedidos, Transportadoras, Motoristas, Entregas) ===
# A lógica é a mesma para cada entidade, incluindo busca, inserção, remoção e atualização.

@app.get("/getEnderecos")
def get_enderecos():
    return pesquisar_tabela('Enderecos')

@app.post("/postEnderecos")
def post_endereco(endereco: Endereco) -> str:
    inserir_dados('Enderecos', ['id_usuario', 'rua', 'cidade', 'estado', 'cep'], 
                  (endereco.id_usuario, endereco.rua, endereco.cidade, endereco.estado, endereco.cep))
    return "Endereço adicionado com sucesso"

@app.delete("/deleteEnderecos/{id_endereco}")
def delete_endereco(id_endereco: int) -> str:
    remover_dados('Enderecos', f"id_endereco = {id_endereco}")
    return "Endereço removido com sucesso"

@app.put("/putEnderecos/{id_endereco}")
def put_endereco(id_endereco: int, endereco: Endereco) -> str:
    atualizacoes = endereco.dict()
    atualizar_dados('Enderecos', atualizacoes, f"id_endereco = {id_endereco}")
    return "Endereço atualizado com sucesso"

# Operações CRUD para Produtos
@app.get("/getProdutos")
def get_produtos():
    return pesquisar_tabela('Produtos')

@app.post("/postProdutos")
def post_produto(produto: Produto) -> str:
    inserir_dados('Produtos', ['nome', 'preco', 'categoria', 'estoque'], 
                  (produto.nome, produto.preco, produto.categoria, produto.estoque))
    return "Produto adicionado com sucesso"

@app.delete("/deleteProdutos/{id_produto}")
def delete_produto(id_produto: int) -> str:
    remover_dados('Produtos', f"id_produto = {id_produto}")
    return "Produto removido com sucesso"

@app.put("/putProdutos/{id_produto}")
def put_produto(id_produto: int, produto: Produto) -> str:
    atualizacoes = produto.dict()
    atualizar_dados('Produtos', atualizacoes, f"id_produto = {id_produto}")
    return "Produto atualizado com sucesso"

# Operações CRUD para Pedidos
@app.get("/getPedidos")
def get_pedidos():
    return pesquisar_tabela('Pedidos')

@app.post("/postPedidos")
def post_pedido(pedido: Pedido) -> str:
    inserir_dados('Pedidos', ['id_usuario', 'status'], 
                  (pedido.id_usuario, pedido.status))
    return "Pedido adicionado com sucesso"

@app.delete("/deletePedidos/{id_pedido}")
def delete_pedido(id_pedido: int) -> str:
    remover_dados('Pedidos', f"id_pedido = {id_pedido}")
    return "Pedido removido com sucesso"

@app.put("/putPedidos/{id_pedido}")
def put_pedido(id_pedido: int, pedido: Pedido) -> str:
    atualizacoes = pedido.dict()
    atualizar_dados('Pedidos', atualizacoes, f"id_pedido = {id_pedido}")
    return "Pedido atualizado com sucesso"

# Operações CRUD para Transportadoras
@app.get("/getTransportadoras")
def get_transportadoras():
    return pesquisar_tabela('Transportadoras')

@app.post("/postTransportadoras")
def post_transportadora(transportadora: Transportadora) -> str:
    inserir_dados('Transportadoras', ['nome'], (transportadora.nome,))
    return "Transportadora adicionada com sucesso"

@app.delete("/deleteTransportadoras/{id_transportadora}")
def delete_transportadora(id_transportadora: int) -> str:
    remover_dados('Transportadoras', f"id_transportadora = {id_transportadora}")
    return "Transportadora removida com sucesso"

# Operações CRUD para Motoristas
@app.get("/getMotoristas")
def get_motoristas():
    return pesquisar_tabela('Motoristas')

@app.post("/postMotoristas")
def post_motorista(motorista: Motorista) -> str:
    inserir_dados('Motoristas', ['nome', 'telefone'], 
                  (motorista.nome, motorista.telefone))
    return "Motorista adicionado com sucesso"

@app.delete("/deleteMotoristas/{id_motorista}")
def delete_motorista(id_motorista: int) -> str:
    remover_dados('Motoristas', f"id_motorista = {id_motorista}")
    return "Motorista removido com sucesso"

# Operações CRUD para Entregas
@app.get("/getEntregas")
def get_entregas():
    return pesquisar_tabela('Entrega')

@app.post("/postEntregas")
def post_entrega(entrega: Entrega) -> str:
    inserir_dados('Entrega', ['id_pedido', 'id_transportadora', 'id_motorista', 'data_entrega'], 
                  (entrega.id_pedido, entrega.id_transportadora, entrega.id_motorista, entrega.data_entrega))
    return "Entrega adicionada com sucesso"

@app.delete("/deleteEntregas/{id_entrega}")
def delete_entrega(id_entrega: int) -> str:
    remover_dados('Entrega', f"id_entrega = {id_entrega}")
    return "Entrega removida com sucesso"

@app.put("/putEntregas/{id_entrega}")
def put_entrega(id_entrega: int, entrega: Entrega) -> str:
    atualizacoes = entrega.dict()
    atualizar_dados('Entrega', atualizacoes, f"id_entrega = {id_entrega}")
    return "Entrega atualizada com sucesso"



if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
