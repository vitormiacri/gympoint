# gympoint

Aplicação completa (Backend, Frontend e Mobile) para gerenciamento de academias.

## Instalação

> ATENÇÃO: Para rodar a aplicação é necessário a instalação do Postgres e Redis.

Antes de tudo clone este repositório e acesse a pasta do projeto:

```
git clone https://github.com/vitormiacri/gympoint gympoint
cd gympoint
```

### Backend

Para executar o **servidor da api**, siga os passos abaixo:

- Acesse a pasta do projeto backend `/backend`:

```
cd backend
```

- Execute o comando abaixo para instalar as dependências:

```
npm install
or
yarn install
```

- Agora é só rodar o comando:

```
npm run dev
or
yarn dev
```

#### Testes e Endpoints

Para orientações de testes e visualizar os endpoints da API, clique [aqui](https://github.com/vitormiacri/gympoint/tree/master/backend)

### Frontend

Para executar o **frontend**, siga os passos abaixo:

- Acesse a pasta do projeto frontend `/frontend`:

```
cd frontend
```

- Execute o comando abaixo para instalar as dependências:

```
npm install
or
yarn install
```

- Agora é só rodar o comando:

```
npm run start
or
yarn start
```

Para mais detalhes sobre o frontend, clique [aqui](https://github.com/vitormiacri/gympoint/tree/master/frontend)

### Mobile

> Atenção! Para a construção do aplicativo mobile, foi utilizado React Native, somente testado na plataforma **Android**

- Siga os passos abaixo para rodar a aplicação:

  > Caso ainda não tenha configurado um ambiente android em sua máquina siga esse [tutorial](https://facebook.github.io/react-native/docs/getting-started)

Para executar o **aplicativo mobile**, siga os passos abaixo:

- Acesse a pasta do projeto mobile `gympoint` `/gympoint`:

```
cd gympoint
```

- Execute o comando abaixo para instalar as dependências:

```
npm install
or
yarn install
```

- Plug e/ou configure o seu emulador ou dispositivo;

- Depois do ambiente com a SDK e o emulador ou dispotivo Android configurado plugado, instale a aplicação:

```
react-native run-android
```

- Agora é só rodar o comando:

```
npm run start
or
yarn start
```

Para mais detalhes sobre o aplicativo mobile, clique [aqui](https://github.com/vitormiacri/gympoint/tree/master/gympoint)
