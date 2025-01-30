# Sistema Frontend

## Para rodar a aplicação localmente, siga os passos a seguir:
- Garantir que não tenha nenhum container em execução fora o do ambiente de desenvolvimento do repositório sistema-backend.
  - No repositório sistema-backend, deve-se iniciar o Postgres e Keycloak em ambiente local/desenvolvimento através de:
    - ```shell script
      docker-compose -f docker-compose.dev.yml up
      ```
- Agora neste repositório do __FRONTEND__, instalar dependências:
  - ```shell script
      npm install
    ```
- Executar frontend no ambiente de desenvolvimento:
  - ```shell script
      npm run start:dev 
    ```


Diretórios: 
```
container/
├── docker-compose.yml              <---- garantir que não esteja em execução para rodar o projeto local
├── sistema-frontend/
│   ├── src/
│   ├── package.json
│   └── ...
├── sistema-backend/
│   ├── src/
│   ├── pom.xml
│   ├── docker-compose.dev.yml      <---- executar este arquivo para desenvolvimento local
│   └── ...
```


### Estes passos são suficientes para acessar a aplicação Angular localmente.
#### Acesse através da url <http://localhost:4200> utilizando as credenciais
#### Usuário: __universidade__
#### Senha: __123__

#### O console de administrador do Keycloak é acessado em <http://localhost:8080>
#### Usuário: __admin__
#### Senha: __admin__

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
