import swaggerAutogen from 'swagger-autogen';
import path from 'path';

// Define the Swagger document
const doc = {
  info: {
    title: 'API Documentation',
    description: 'API documentation for the application',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

// Define paths
const outputFile = path.resolve('swagger-output.json'); // Adjust to your desired output path
const endpointsFiles = [path.resolve('src/routes/index.js')]; // Adjust to the correct path of your main routes file

// Generate Swagger documentation
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger documentation generated');
});
