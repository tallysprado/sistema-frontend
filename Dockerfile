FROM node:21

WORKDIR /app

COPY . .

RUN npm install
RUN npm install -g @angular/cli

EXPOSE 4200
CMD ng serve --host 0.0.0.0 --proxy-config proxy.config.js --disable-host-check
