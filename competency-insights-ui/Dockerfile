# Use an official Node.js runtime as a base image
FROM node:18-alpine

# Set the working directory
WORKDIR /competency-insights-ui/

# Copy the local code to working directory
COPY public/ /competency-insights-ui/public
COPY src/ /competency-insights-ui/src
COPY package.json /competency-insights-ui/
COPY tailwind.config.js /competency-insights-ui/

# Passing URI Value
ENV REACT_APP_URI https://competency.co.in
ENV REACT_APP_BACKEND_APP_URI https://competency.co.in/cs
ENV REACT_APP_PROFILE_PAGE_URL /cs/nasher/email

# Install app dependencies
RUN npm install

# Define the command to run the application
CMD ["npm", "start"]