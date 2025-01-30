# SistemaFrontend

## A conteinerização da aplicação está na branch docker/card01. Faca o checkout para esta branch e leia a documentacao nela para rodar todos os projetos em um unico container.

## Caso decida iniciar o projeto por um único container, ignore esta documentacao e prossiga com a que tem em docker/card01.

##### Pré-requisitos:
##### Docker do sistema backend deve estar em execução.
##### No diretório raiz do sistema-backend <https://github.com/tallysprado/sistema-backend>, com Docker instalado, siga os passos a seguir:
###### Iniciar Keycloak e Postgresql no Docker:
```bash script
docker-compose -p sistema-backend up -d
```
###### Iniciar API:
```bash script
mvnw quarkus:dev
```

#### Para servir a imagem do frontend no Docker, execute os comandos a seguir:
```bash script
docker build -t angular-docker .
```
Após construir a imagem:
```bash script
docker run -p 4200:4200 angular-docker
```
# Caso inicie através do Docker, não é necessário seguir as opções abaixo.


#### Com a imagem do Keycloak e PostgreSQL em execução, siga os passos a seguir
## 1. Baixe o repositório e execute
```bash script
npm install
```

## 2. Após instalacão de dependências, inicie o servidor
```bash script
npm start
```

#### Utilize as credenciais:
#### Usuário: __universidade__
#### Senha: __123__
###### Ou então: crie um usuário no _realm_ sistema-backend e associe a ele a _role_ de coordenador.

Após execução, acessar o sistema front end em `http://localhost:4200/`.

Este front-end acessa de forma segura o backend (autenticação por token através do HTTP INTERCEPTOR). Bem como outras rotas de criação de usuário do sistema-backend
precisam de autenticação.

#### Cenários de teste:
- Menu "Usuários -> Criar": (criar usuários para acessar a aplicação através da matrícula e senha 123)
    - Nome, Cargo e CPF são dados obrigatórios e exclusivos (validação backend para exception de constraint)
    - A depender do cargo, será criado uma entidade Aluno, Professor ou Coordenador e será associada 
    à entidade usuário.
    - Enter salva os dados.
    - Responsividade dos campos (4 colunas telas largas, 1 coluna disp. mobile)
    - Usuários criados nessa tela podem acessar a aplicação de acordo com a role definida em 'cargo'. Utilizar matrícula (ver tela de consulta) e senha "123".
- Menu "Usuários -> Consultar": 
    - Testar login na aplicação utilizando matrícula e senha "123"  
    - Expandir a linha mostra disciplinas matriculadas.
    - Responsividade mobile para filtros e tabela (é exibido cards com as colunas no lugar das linhas na visualização
    em dispositivos móveis).
    - A edição do usuário reaproveita a tela de criação.
    - O filtro da matrícula é um inner join a depender do tipo se é Aluno, Professor ou Coordenador
    - Possibilita excluir o usuário da base e do Keycloak (futuramente deve-se habilitar este botão para roles específicas apenas)
- Menu "Matrícula - Aluno": (relacionar disciplina x usuário)
    - É listado apenas entidade Aluno.
    - Nome é auto-complete com os alunos cadastrados, ao selecionar deve aparecer a lista de disciplinas disponíveis
    e as matriculadas. Selecionar e salvar vai atualizar os dados da linha expandível da tela de filtros.
    - Campo de filtro "matrícula" ainda está em construção :construction:
    - Responsividade da tabela, para dispositivos mobile, ainda em construção :construction:
- Menu da Topbar abrirá "por cima" do conteúdo em dispositivos mobile, e "empurrará" o conteúdo telas maiores.
- Tela de Login foi customizada direto no .ftl e não exibe logo marca em dispositivos móveis, apenas em telas maiores.
- As rotas estão protegidas pelo AuthGuard do Keycloak. Existe duas _roles_ importadas na configuração inicial, 
ROLE_COORDENADOR e ROLE_ALUNO. Deve-se considerar no teste, atribuir diferentes papéis ao usuário e verificar a página
de acesso negado ao tentar acessar uma rota não autorizada. O papel de coordenador tem mais funcionalidades implementadas,
porém vale testar o acesso à rota <http://localhost:4200/periodo/create> sem ter o papel 'aluno' atribuído e verificar a página de _forbidden access_.
