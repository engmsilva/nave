## Navedex - Desafio de Frontend.

O sistema consiste em uma web app para visualização e criação dos navers, possuindo informações como: nomes, idades, cargos, tempo de empresa e projetos que participou.

* Usar React JS.
* Consumir dados de uma API.
* Usar Figma para guiar o desenvolvimento.
* Tela de login.
* Listagem  de navers cadastrados.
* Visualização detalhada no naver.
* Registro e edição de navers.

Requisitos:
- git 2.20.1
- node v10.15.2
- yarn 1.21.1

Para executar o aplicativo localmente:

```bash
$ git clone https://github.com/engmsilva/nave.git
$ cd nave
$ yarn install
```
Crie um arquivo .env na raiz do projeto e adicione a linha abaixo e salve:

```bash
REACT_APP_URL_API=https://navedex-api.herokuapp.com/v1
```

Agora os seguintes comandos para executar a aplicação:

```bash
$ yarn start
$ open http://localhost:3000
```
Credenciais:

```bash
e-mail: eng.msilva@yahoo.com.br
senha: 12345678
```

Para executar a versão minificada do aplicativo localmente:

Instalação do servidor Node

```bash
$ yarn global add serve
```
Exportar caminho de instalação do servidor para variável de ambiente do sistema operacional.

```bash
$ export PATH="$PATH:$(yarn global bin)" // exemplo usado no Ubuntu
```
Execute o servidor

```bash
$ serve -s build
$ open http://localhost:5000
```