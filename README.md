# 📱 Wassap - Real-Time Chat Application

Este projeto é uma aplicação de chat em tempo real construída com React Native utilizando Expo e Firebase. A aplicação permite que os usuários enviem e recebam mensagens em tempo real.

## 📋 Funcionalidades
- Envio e recebimento de mensagens em tempo real
- Autenticação de usuário através do Firebase
- Integração com Firestore para armazenamento de dados

## 🚀 Começando

##### Pré-requisitos:

##### Antes de começar, você precisará ter as seguintes ferramentas instaladas no seu computador:

- [Node.js](https://nodejs.org/en/)
- [Git](https://git-scm.com/)

## 📦 Instalação

##### 1. Clone o repositório:

   ```sh
   git clone https://github.com/Faran42/Wassapp.git
   cd seu-repositorio
   ```
##### 2. Instale as dependências:  

   ```sh
   npm install
   ```
   Ou
   ```sh
   yarn
   ```
## 🔧 Configuração do Firebase

##### 1. Acesse o [Firebase Console](https://console.firebase.google.com/).

##### 2. Crie um novo projeto.

##### 3. Adicione um aplicativo para Web ao seu projeto Firebase. Siga as instruções para registrar seu aplicativo.

##### 4. Na seção Configurações do projeto do Firebase Console, copie as configurações do Firebase SDK para web. Elas terão o seguinte formato:

```js
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO",
  storageBucket: "SEU_PROJETO.appspot.com",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID"
};
```
##### 5. Vá no arquivo .env na raiz do projeto e adicione as suas chaves Firebase.

##### 6. Inicialize o Firestore. No Firebase Console, vá até Firestore Database e clique em "Criar banco de dados". Siga as instruções para configurar o Firestore no modo de produção ou de teste.

## 🔥 Inicialização do Projeto
##### Execute o projeto com Expo:

``` sh
npx expo start
```

##### Abra o aplicativo Expo Go no seu dispositivo móvel e escaneie o QR code exibido no terminal ou na página web que será aberta.

## 🤝 Contribuindo
##### Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## 📄 Licença

##### Este projeto está licenciado sob a Licença MIT. Veja o arquivo LICENSE para mais detalhes.

##### Feito com ❤️ por Franklyn Rocha
