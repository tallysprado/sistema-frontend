# SistemaFrontend
##### Pré-requisitos:
##### Docker do sistema backend deve estar em execução.
##### No diretório raiz do sistema-backend <https://github.com/tallysprado/sistema-backend>, com Docker instalado, executar
```bash script
docker-compose -p sistema-backend up
```

#### Com a imagem anterior em execução, siga os passos a seguir
## 1. Baixe o repositório e execute
```bash script
npm install -f
```

## 2. Após instalacão de dependências, inicie o servidor
```bash script
npm start
```

Após execucão, acessar o sistema front end em `http://localhost:4200/`.

#### Cenários de teste:
- Menu "Usuários -> Criar":
    - Nome, Cargo e CPF são dados obrigatórios e exclusivos (validação backend para exception de constraint)
    - A depender do cargo, será criado uma entidade Aluno, Professor ou Coordenador e será associada 
    à entidade usuário.
    - Enter ao salvar.
    - Responsividade dos campos (4 colunas telas largas, 1 coluna disp. mobile)
- Menu "Usuários -> Consultar":
    - A edição está incompleta
    - O filtro da matrícula é um inner join a depender do tipo se é Aluno, Professor ou Coordenador
    - Expandir a linha mostra disciplinas matriculadas.
    - Responsividade mobile para filtros e tabela (é exibido cards com as colunas no lugar das linhas na visualização
    em dispositivos móveis).
- Menu "Matrícula - Aluno":
    - É listado apenas entidade Aluno.
    - Nome é auto-complete com os alunos cadastrados, ao selecionar deve aparecer a lista de disciplinas disponíveis
    e as matriculadas. Selecionar e salvar vai atualizar os dados da linha expandível da tela de filtros.
    - Campo de filtro "matrícula" ainda está em construção :construction:
    - Responsividade da tabela, para dispositivos mobile, ainda em construção :construction:
