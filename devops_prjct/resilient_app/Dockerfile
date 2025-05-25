# ./devops_prjct/resilient_app/Dockerfile

# FROM node:18

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# EXPOSE 3000

# CMD ["npm", "start"]


FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Add these lines to inject the API URL
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

RUN npm run build  # Build the React app

EXPOSE 3000
CMD ["npm", "start"]