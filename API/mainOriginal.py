from utils import *

# Exemplo de uso
if __name__ == '__main__':
    print('começando')
    criar_tabelas()

    # Inserção de Produtos
    inserir_dados('Produtos', ['nome', 'preco', 'categoria'], ('Camiseta', 39.90, 'Roupas'))
    inserir_dados('Produtos', ['nome', 'preco', 'categoria', 'estoque'], 
              ('Notebook Dell', 4500.00, 'Eletrônicos', 10))
    inserir_dados('Produtos', ['nome', 'preco', 'categoria', 'estoque'], 
              ('Teclado Mecânico', 250.00, 'Periféricos', 30))

    # Inserção de Usuários
    inserir_dados('Usuarios', ['nome', 'email', 'telefone', 'data_nascimento'], 
              ('Carlos Silva', 'carlos@email.com', '11987654321', '1990-05-10'))
    inserir_dados('Usuarios', ['nome', 'email', 'telefone', 'data_nascimento'], 
                ('Mariana Souza', 'mariana@email.com', '11976543210', '1988-08-25'))
    
    # Inserção de Endereços
    inserir_dados('Enderecos', ['id_usuario', 'rua', 'cidade', 'estado', 'cep'], 
              (1, 'Rua das Flores, 123', 'São Paulo', 'SP', '01010-000'))
    inserir_dados('Enderecos', ['id_usuario', 'rua', 'cidade', 'estado', 'cep'], 
              (2, 'Avenida Brasil, 456', 'Rio de Janeiro', 'RJ', '22020-000'))
    
    # Inserção de Pedidos
    inserir_dados('Pedidos', ['id_usuario', 'status'], 
                (1, 'Pendente'))
    inserir_dados('Pedidos', ['id_usuario', 'status'], 
                (2, 'Enviado'))
    
    # Inserção de Produtos pedidos
    inserir_dados('Pedido_Produto', ['id_pedido', 'id_produto', 'quantidade', 'preco_unitario'], 
                (1, 1, 1, 4500.00))  # Carlos comprou um Notebook
    inserir_dados('Pedido_Produto', ['id_pedido', 'id_produto', 'quantidade', 'preco_unitario'], 
                (2, 2, 2, 250.00))  # Mariana comprou 2 Teclados Mecânicos
    
    # Inserção de Transportadoras
    inserir_dados('Transportadoras', ['nome'], 
                ('Transportes Rápidos',))
    inserir_dados('Transportadoras', ['nome'], 
                ('Logística Express',))
    
    # Inserção de Motoristas
    inserir_dados('Motoristas', ['nome', 'telefone'], 
                ('João Pereira', '11999998888'))
    inserir_dados('Motoristas', ['nome', 'telefone'], 
                ('Ana Lima', '11988887777'))
    
    # Inserção de Entregas
    inserir_dados('Entrega', ['id_pedido', 'id_transportadora', 'id_motorista', 'data_entrega'], 
                (2, 1, 1, '2024-02-10'))  # Pedido da Mariana foi entregue pela Transportes Rápidos com João Pereira
    inserir_dados('Entrega', ['id_pedido', 'id_transportadora', 'id_motorista', 'data_entrega'], 
                (1, 2, 2, None))  # Pedido do Carlos ainda não foi entregue


    # Exemplo de Atualização
    atualizar_dados('Produtos', {'preco': 45.00}, "nome = 'Camiseta'")
    atualizar_dados('Produtos', {'preco': 3700.00}, "nome = 'Notebook Dell'")

    # Exemplo de Remoção
    remover_dados('Produtos', "nome = 'Camiseta'")

    # Exemplo de Pesquisa
    produtos = pesquisar_dados('Produtos', "categoria = 'Eletrônicos'")
    print(produtos)

    # Exemplo de Busca com Substring
    produtos_eletronico = buscar_com_substring('Produtos', 'categoria', 'eletrônicos')
    print(produtos_eletronico)

    # Exemplo de Consulta Avançada 1: Agrupamento
    resultado_agrupamento = consulta_avancada_1()
    print(resultado_agrupamento)

    # Exemplo de Consulta Avançada 2: JOIN
    resultado_join = consulta_avancada_2()
    print(resultado_join)

    # Exemplo de Consulta com ANY
    resultado_any = consulta_any()
    print(resultado_any)

    # Exemplo de Consulta Ordenada
    resultado_ordenado = consulta_ordenada('Produtos', 'preco', 'DESC')
    print(resultado_ordenado)

    # Criar gatilho
    criar_gatilho()