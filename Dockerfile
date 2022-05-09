FROM node:16.2.0

ENV PORT 3000

# Cria o diretorio do App
RUN mkdir -p /usr/pages
WORKDIR /usr/pages

# Instala as dependencias
COPY package*.json /usr/pages
RUN npm install

# Copia os codigos fontes
COPY . /usr/pages

# Builda o App
RUN npm run build
EXPOSE 3000

# Roda o App
CMD "npm" "run" "dev"