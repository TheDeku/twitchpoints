FROM node:12-alpine
WORKDIR /app
COPY . .
ENV PORT 80
RUN npm i
EXPOSE 80
CMD ["npm", "start"]
