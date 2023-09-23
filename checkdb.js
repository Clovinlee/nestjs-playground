// Import PrismaClient
const { PrismaClient } = require('@prisma/client');

// Create an instance of PrismaClient
const prisma = new PrismaClient();

async function checkDatabaseConnection() {
    try {
      await prisma.$connect();
      console.log('Database connected successfully.');
    } catch (error) {
      console.error('Error connecting to the database:', error);
    } finally {
      // Disconnect the PrismaClient to release the connection pool when done
      await prisma.$disconnect();
    }
  }

// Call the function to check the connection
checkDatabaseConnection();
  