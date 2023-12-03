# Define a imagem base
FROM node:12-alpine

# Define o diretório de trabalho na imagem
WORKDIR /app

# Copia o package.json e o package-lock.json para o diretório de trabalho
COPY . .

# Instala as dependências do projeto
RUN npm install

# Expõe a porta 3000 para acesso externo
EXPOSE 3000

# Define o comando padrão para iniciar a aplicação
CMD ["npm", "run", "start:dev"]
