# Use the docker image node:8.11
FROM node:8.11
# Into which the source will be copied inside the destination container.
WORKDIR /app
# It will copy the existing files to the `/app` directory.
COPY . /app

# Run yarn
RUN yarn

RUN yarn prebuild

# Start the app.
RUN yarn build

# Expose the port of the app thats running in the container.
EXPOSE 3000
