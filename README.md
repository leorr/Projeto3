# Projeto 3 : Back-end
### Alunos : Leonardo Rodrigues Ribeiro - 1835785</br>

### Deploy em : http://projeto3-leorr.herokuapp.com
### Front em : https://leorr.github.io/projeto2 (falta implementações)

### Rotas
* /user/signup  →  registro **POST** json body requer ***username*** e ***password***
* /user/login   →  login **POST** json body requer ***username*** e ***password***
* /user/me      →  recupera informações de usuario logado **GET** headers requer ***token***

O projeto utiliza frameworks como <a href = "https://expressjs.com/">Express</a> para facilitação de funcionalidades da API e <a href = "https://mongoosejs.com/"> Mongoose</a> para modelagem de objetos, entre outros pacotes do node para facilitar algumas implementações.
O Bando de dados do mongoDB está sendo hosteado com o serviço gratuito de <a href = "cloud.mongodb.com"> Cloud MongoDB </a>

1. Atendimento as diretrizes de desenvolvimento web apresentadas durante as aulas. ✅
2. A utilização de Frameworks de desenvolvimento de aplicações web será permitida com autorizacão prévia do professor. ✅
3. Verificação de preenchimento de campos obrigatórios. ✅
4. Validação de unicidade e autenticidade de campos como email e login. ✅
5. Permissao de publicação ao apenas ao adminstrador do sistema, verificada com o uso de sessoes. `TODO`
6. Instalação da página web em algum serviço de hospedagem de aplicações web baseado em PaaS de Cloud Computing. ✅
7. Implementação da funcionalidade de Login. ✅
8. Implementação da funcionalidade de Cadastramento de usuários. ✅
9. Implementação da funcionalidade de Publicação de conteudos para o administrador. `TODO`
10. Implementação da funcionalidade de Busca de conteudo. `TODO`
11. Atualizção incremental das mudanças de código-fonte no Git. ✅
