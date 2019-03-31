# Use an official Python runtime as a parent image
FROM node:8.15.0

# Set the working directory to /app
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm cache clean --force && npm install

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --trusted-host pypi.python.org -r requirements.txt

# Make port 80 available to the world outside this container
EXPOSE 80

# Define environment variable
ENV NAME World

# Run app.py when the container launches
CMD [ "npm", "run", "start" ]