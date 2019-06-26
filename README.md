# Desenvolvimento de uma API Rest - Sistema de Livraria

Descrição

O sistema da qual a API faz parte é um sistema de uma livraria. Nele, os clientes podem pesquisar por livros e autores. Se o livro estiver em estoque, o preço é apresentado, caso contrário, o cliente pode indicar o interesse pelo livro, recebendo um e-mail avisando quando o livro estiver disponível. Os funcionários podem acessar o sistema para cadastrar novos livros e autores, atualizar ou deletar os já existentes. Também podem alterar o estoque, quando novos exemplares forem recebidos.
A API Rest desenvolvida faz o controle dos livros da livraria. Nela é possível adicionar, listar, atualizar e deletar registros de livros. 

URI ou rota do recurso | Método HTTP | Status bem-sucedido | Status mal-sucedido
------------ | ------------- | ------------- | -------------
/api/livros | GET | 200 | -
/api/livros/{id} | GET | 200 | 400, 404
/api/livros | POST | 201 | 400
/api/livros/{id} | PUT | 200 | 400, 404
/api/livros/{id} | DELETE | 200 | 400, 404

Recurso
Abaixo os campos do recurso acessado pela API:

Livro
{
	id: Integer,
	titulo: String,
	isbn: String,
	editora: String,
	autor: String,
	descricao: String,
	lancamento: String
}

Descrição das rotas e exemplos de requisições

Rota /api/livros GET
Uma requisição GET na rota /api/livros retorna todos os livros cadastrados no sistema.

Exemplo:

Requisição:
curl -X GET \
  http://localhost:3000/api/livros \
  -H 'cache-control: no-cache'

Resposta:
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 4996

[{"id":1,"titulo":"O Cortiço","isbn":"978-8578886431","editora":"Panda Books","autor":"Aluísio Azevedo","descricao":"Aluí­sio Azevedo retrata as péssimas...","lancamento":"01/03/2017"},{"id":2,"titulo":"Era dos Extremos","isbn":"978-8571644687","editora":"Companhia das Letras","autor":"Eric Hobsbawm","descricao":"Eric Hobsbawm, um dos maiores historiadores da atualidade, ...","lancamento":"04/08/1995"},{"id":3,"titulo":"Sejamos todos feministas","isbn":"978-8535925470","editora":"Companhia das Letras","autor":"Chimamanda Ngozi Adichie","descricao":"O que significa ser feminista no século XXI? ....","lancamento":"18/02/2015"},{"id":4,"titulo":"Quarto de Despejo. Diário de Uma Favelada","isbn":"978-8508171279","editora":"Ática","autor":"Carolina Maria de Jesus","descricao":"O diário da catadora de papel Carolina Maria de Jesus ...","lancamento":"01/01/2014"},{"id":5,"titulo":"O mundo de Sofia","isbn":"978-8535921892","editora":"Seguinte","autor":"Jostein Gaarder","descricao":"Às vésperas de seu aniversário de quinze anos, Sofia Amundsen ...","lancamento":"19/11/2012"}]

Rota /api/livros/{id} GET
Uma requisição GET na rota /api/livros/{id}, passando um id numérico na url, retorna o livro cadastrado no sistema que corresponde ao id pesquisado, em caso de sucesso (código 200). Caso o id informado não seja um número, um erro com o código 400 e a mensagem “id deve ser um número” será retornado. Caso o id pesquisado não corresponda a nenhum livro cadastrado no sistema, um erro com código 404 e a mensagem “Livro com id: {id} não encontrado” será retornado.

Exemplo:

Requisição:
curl -X GET \
  http://localhost:3000/api/livros/5 \
  -H 'cache-control: no-cache'

Respostas:
Sucesso (200)
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 931

{"id":5,"titulo":"O mundo de Sofia","isbn":"978-8535921892","editora":"Seguinte","autor":"Jostein Gaarder","descricao":"Às vésperas de seu aniversário de quinze anos, Sofia Amundsen ...","lancamento":"19/11/2012"}


Falha (400)
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 36

{"message":"id deve ser um número"}

Falha (404)
	HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 45

{"message":"Livro com id: 7 não encontrado"}

Rota /api/livros POST
Uma requisição POST na rota /api/livros irá cadastrar um novo livro no sistema. A requisição deve conter no corpo da mensagem os dados correspondentes a um recurso livro, exceto o id, com os devidos tipos. Cumprindo este pré-requisito, será retornado o livro cadastrado e um status de sucesso na criação de um novo recurso (201). Caso qualquer um dos campos exigidos não esteja no formato adequado, será retornado um erro com código 400 e a mensagem “{campo} deve ser {formato}”, onde campo especifica o campo do objeto livro que não atendeu o pré-requisito e formato o tipo de dado esperado para que o pré-requisito seja atendido.

Exemplo:

Requisição:
curl -X POST \
  http://localhost:3000/api/livros \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d 'titulo=Teste&isbn=TST-00001111&editora=EDITORA%20TESTE&autor=AUTOR&descricao=DESCRICAO%20TESTE&lancamento=01%2F01%2F2000'

Respostas:
Sucesso (201)
HTTP/1.1 201 Created
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 145

{"id":6,"titulo":"Teste","isbn":"TST-00001111","editora":"EDITORA TESTE","autor":"AUTOR","descricao":"DESCRICAO TESTE","lancamento":"01/01/2000"}

Falha (400)
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 40

{"message":"titulo deve ser uma string"}


Rota /api/livros/{id} PUT
Uma requisição PUT na rota /api/livros/{id} irá atualizar os dados de um livro existente no sistema. A requisição deve conter na url o id do livro a ser atualizado e no corpo da mensagem os dados correspondentes a um recurso livro, exceto o id, com os devidos tipos. 
Cumprindo estes pré-requisitos, será retornado o livro atualizado e um status de sucesso (200).
Caso o id informado não seja um número, um erro com o código 400 e a mensagem “id deve ser um número” será retornado. Caso o id pesquisado não corresponda a nenhum livro cadastrado no sistema, um erro com código 404 e a mensagem “Livro com id: {id} não encontrado” será retornado.
Caso qualquer um dos campos exigidos não esteja no formato adequado, será retornado um erro com código 400 e a mensagem “{campo} deve ser {formato}”, onde campo especifica o campo do objeto livro que não atendeu o pré-requisito e formato o tipo de dado esperado para que o pré-requisito seja atendido.

Exemplo:

Requisição:
curl -X PUT \
  http://localhost:3000/api/livros/1 \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d 'titulo=Teste&isbn=TST-00001111&editora=EDITORA%20TESTE&autor=AUTOR&descricao=DESCRICAO%20TESTE&lancamento=01%2F01%2F2000'

Respostas:
Sucesso (200)
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 147

{"id":"1","titulo":"Teste","isbn":"TST-00001111","editora":"EDITORA TESTE","autor":"AUTOR","descricao":"DESCRICAO TESTE","lancamento":"01/01/2000"}

Falha (400)
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 40

{"message":"titulo deve ser uma string"}

Falha (404)
HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 46

{"message":"Livro com id: 10 não encontrado"}


Rota /api/livros/{id} DELETE
Uma requisição DELETE na rota /api/livros/{id} irá remover um livro cadastrado do sistema. A requisição deve conter na url o id do livro a ser removido. Caso o id informado não seja um número, um erro com o código 400 e a mensagem “id deve ser um número” será retornado. Caso o id pesquisado não corresponda a nenhum livro cadastrado no sistema, um erro com código 404 e a mensagem “Livro com id: {id} não encontrado” será retornado.
Cumprindo este pré-requisito, será retornado o livro removido e um status de sucesso (200).
Exemplo:

Requisição:
curl -X DELETE \
  http://localhost:3000/api/livros/5 \
  -H 'Postman-Token: 5c1df12a-b3a4-4ef9-a5bd-c68159205242' \
  -H 'cache-control: no-cache'

Respostas:
Sucesso (200)
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 141

{"id":"1","titulo":1,"isbn":"TST-00001111","editora":"EDITORA TESTE","autor":"AUTOR","descricao":"DESCRICAO TESTE","lancamento":"01/01/2000"}


Falha (400)
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 36

{"message":"id deve ser um número"}


Falha (404)
HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 47

{"message":"Livro com id: 100 não encontrado"}
