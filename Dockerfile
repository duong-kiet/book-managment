FROM node:20-alpine

# Đặt thư mục làm việc 
WORKDIR /usr/app

COPY . .

RUN npm install

# Start the application
CMD ["npm", "start"]
