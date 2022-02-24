FROM node:12-alpine
WORKDIR /app
COPY . .
ENV PORT 5700
RUN npm i
EXPOSE 5700
CMD ["npm", "install"]
