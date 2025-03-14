# 初始化Git仓库
git init

# 添加所有文件到暂存区
git add .

# 提交更改
git commit -m "Initial commit: Geradordecpf.Shop with profile generator and enhanced export features"

# 添加远程仓库（替换YOUR_USERNAME为您的GitHub用户名）
git remote add origin https://github.com/YOUR_USERNAME/geradordecpf.shop.git

# 推送到GitHub
git push -u origin master# Geradordecpf.Shop

Um gerador de documentos brasileiros para fins de teste e desenvolvimento. Este projeto fornece uma interface web para gerar documentos como CPF, CNPJ, RG, PIS/PASEP, CNH, Título de Eleitor, Certidão de Nascimento, Cartão de Crédito, RENAVAM e perfis completos de pessoas.

## Funcionalidades

- **Geradores de Documentos**: Gere documentos brasileiros válidos para fins de teste
- **Validadores de Documentos**: Verifique se um documento é válido
- **Gerador de Perfil Completo**: Crie perfis completos com nome, endereço, contato e documentos
- **Exportação em Massa**: Gere múltiplos documentos de uma vez
- **Múltiplos Formatos de Exportação**: Exporte dados em CSV, Excel, JSON e TXT
- **Modo Escuro/Claro**: Interface adaptável às preferências do usuário

## Documentos Suportados

- CPF (Cadastro de Pessoas Físicas)
- CNPJ (Cadastro Nacional da Pessoa Jurídica)
- RG (Registro Geral)
- PIS/PASEP
- CNH (Carteira Nacional de Habilitação)
- Título de Eleitor
- Certidão de Nascimento
- Cartão de Crédito
- RENAVAM (Registro Nacional de Veículos Automotores)
- Perfil Completo (combinação de todos os documentos acima)

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla)
- Design Responsivo

## Uso

1. Acesse o site: [Geradordecpf.Shop](https://geradordecpf.shop)
2. Selecione o tipo de documento que deseja gerar
3. Clique no botão "Gerar"
4. Copie o documento gerado ou utilize as opções de exportação

## Aviso Legal

Os documentos gerados por esta ferramenta são fictícios e devem ser utilizados apenas para fins de teste, desenvolvimento e educação. O uso indevido destes dados para fraudes ou qualquer atividade ilegal é estritamente proibido e de total responsabilidade do usuário.

## Instalação Local

Para executar este projeto localmente:

1. Clone o repositório:
   ```
   git clone https://github.com/seu-usuario/geradordecpf.shop.git
   ```

2. Abra o arquivo `index.html` em seu navegador ou utilize um servidor local:
   ```
   # Usando Python
   python -m http.server 8000
   
   # Ou usando Node.js com http-server
   npx http-server
   ```

3. Acesse `http://localhost:8000` em seu navegador

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes.
