# SistemaBackend
#### Esta _branch_ contém a configuracão necessária para rodar o Angular, Quarkus, Keycloak e Postgres todos num único container. Para isto, siga os passos a seguir:

#### 1. Efetuar o clone dos dois projetos numa mesma pasta.
##### A disposicão dos dois repositórios deve estar lado a lado no mesmo diretório.
```
pasta_qualquer_na_area_de_trabalho/
├── sistema-frontend/
│   ├── src/
│   ├── package.json
│   └── ...
├── sistema-backend/
│   ├── src/
│   ├── pom.xml
│   └── ...
```
#### 2. Abra o terminal dentro do diretório 'sistema-backend':
##### 2.1 O projeto precisa de um único comando para rodar todas as imagens num container, onde a compilacão do backend Quarkus e frontend Angular sao feitos de forma autônoma em seus respectivos Dockerfile. Para rodar todos os projetos e compilar de forma automática execute:

```shell script
docker-compose up --build
```

##### 2.2 Caso tenha interesse em compilar o backend por fora e apenas rodar o Quarkus copiando o projeto compilado:
###### 2.2.1 No windows, primeiro compile o projeto quarkus por fora e depois rode a imagem:
```shell script
.\mvnw package -DskipTests
```
```shell script
$env:BUILD_DOCKERFILE = "DockerfileRun"; docker-compose up --build
```
##### 2.2.2 Para voltar a fazer a compilacão padrão, que é durante a construcão da imagem, faca: 
```shell script
$env:BUILD_DOCKERFILE = "DockerfileRun"; docker-compose up --build
```
##### 2.2.3 Caso esteja utilizando Linux, o comando é:
```shell script
export BUILD_DOCKERFILE=DockerfileRun
```
e em seguida:
```shell script
docker-compose up --build
```


### Estes passos são suficientes para rodar o projeto dentro de um único container.
#### Acesse a aplicacão através da url <http://127.0.0.1:4200> utilizando as credenciais
#### Usuário: __universidade__
#### Senha: __123__

#### O console de administrador do Keycloak é acessado em <http://127.0.0.1:8080>

##### Configuração do banco de dados:
- Host: 0.0.0.0:5433
- Banco de dados: sistema
- Usuário: postgres
- Senha: postgres

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

###### Dúvidas entre em contato no Whatsapp ou E-mail:
- (88) 9 9651 - 0001
- tallys.prado@gmail.com
