# Caixa Postal

Este projeto foi dividido em duas partes: **backend** e **frontend**.

## Frontend

O frontend foi construído utilizando apenas HTML, CSS e JavaScript, portanto, não há requisitos específicos. Recomenda-se a instalação de uma extensão para facilitar a visualização, como **Live Preview** (mais recomendado) ou **Live Server**.

## Backend

O backend foi desenvolvido com **Node.js**. Para executá-lo, você precisará ter o Node.js instalado. É recomendado utilizar a versão **12.22.9** ou superior para o Node e **6.14.15** ou superior para o npm.

### Instalação

1. Navegue até a pasta do backend e execute o seguinte comando para instalar as dependências principais:

   ```bash
   npm install
   ```

2. Instale as dependências específicas necessárias:

   ```bash
   npm install cors express
   ```

### Configuração do Banco de Dados

Para conectar ao banco de dados, você precisa ter o PostgreSQL instalado e configurar um arquivo .env com as seguintes informações:

- **DB_NAME**: nome do banco de dados (recomendado: correio_web)
- **DB_USER**: seu usuário do PostgreSQL com permissões para acessar o banco
- **DB_PASSWORD**: senha do seu usuário

Após configurar o arquivo .env, siga estas etapas:

1. Crie um banco de dados com o nome **correio_web**.
2. Crie uma tabela chamada **users** com os seguintes atributos:
   - **id**: INTEGER 
   - **name**: VARCHAR
   - **email**: VARCHAR
   - **password**: VARCHAR

### Testando a Conexão

Depois de configurar tudo, teste se a aplicação está funcionando corretamente. Na pasta do backend, execute:

```bash
npm run serve
```

A conexão com o banco de dados deve ser estabelecida com sucesso.

### Testes 

Há um arquivo chamado `testes.http`, que permite fazer requisições manualmente. Recomenda-se criar um usuário utilizando este arquivo e tentar fazer login com as credenciais no `login.html`. O esperado é que apareça um alerta com a mensagem "deu certo".

