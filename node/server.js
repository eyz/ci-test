const Koa = require('koa');
const app = new Koa();

const PORT = 8080;

// Track active requests and connections
let activeRequests = 0;
const connections = new Set();

// Request tracking middleware
app.use(async (ctx, next) => {
  activeRequests++;
  console.log(`[${new Date().toISOString()}] Active requests: ${activeRequests}`);
  
  try {
    await next();
  } finally {
    activeRequests--;
    console.log(`[${new Date().toISOString()}] Active requests: ${activeRequests}`);
  }
});

// Logging middleware
app.use(async (ctx, next) => {
  const start = Date.now();
  console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.url} - Request started`);
  
  await next();
  
  const ms = Date.now() - start;
  console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.url} - ${ctx.status} - ${ms}ms`);
});

// Main route handler
app.use(async (ctx) => {
  ctx.body = 'Hello, World!\n';
});

// Start server
console.log(`[${new Date().toISOString()}] Starting Koa server...`);
const server = app.listen(PORT, () => {
  console.log(`[${new Date().toISOString()}] Koa server listening on port ${PORT}`);
  console.log(`[${new Date().toISOString()}] Server ready to accept connections`);
});

// Track connections
server.on('connection', (socket) => {
  connections.add(socket);
  console.log(`[${new Date().toISOString()}] New connection established. Total connections: ${connections.size}`);
  
  socket.on('close', () => {
    connections.delete(socket);
    console.log(`[${new Date().toISOString()}] Connection closed. Total connections: ${connections.size}`);
  });
});

// Graceful shutdown handler
const gracefulShutdown = (signal) => {
  console.log(`[${new Date().toISOString()}] Received ${signal}. Starting graceful shutdown...`);
  console.log(`[${new Date().toISOString()}] Active requests: ${activeRequests}, Total connections: ${connections.size}`);
  
  // Set a timeout to force exit if graceful shutdown takes too long
  const forceExitTimeout = setTimeout(() => {
    console.error(`[${new Date().toISOString()}] Graceful shutdown timed out. Forcing exit.`);
    process.exit(1);
  }, 10000); // 10 second timeout
  
  server.close((err) => {
    clearTimeout(forceExitTimeout);
    if (err) {
      console.error(`[${new Date().toISOString()}] Error during server shutdown:`, err);
      process.exit(1);
    }
    console.log(`[${new Date().toISOString()}] Server closed. Exiting gracefully.`);
    process.exit(0);
  });
  
  // If there are no active requests, immediately close all keepalive connections
  if (activeRequests === 0) {
    console.log(`[${new Date().toISOString()}] No active requests. Immediately closing all keepalive connections...`);
    connections.forEach(socket => {
      socket.destroy();
    });
  } else {
    // If there are active requests, wait a short time before forcing connection close
    console.log(`[${new Date().toISOString()}] ${activeRequests} active requests detected. Waiting before forcing connection close...`);
    setTimeout(() => {
      console.log(`[${new Date().toISOString()}] Forcing close of remaining connections...`);
      connections.forEach(socket => {
        socket.destroy();
      });
    }, 5000); // 5 second delay before forcing connection close
  }
};

// Handle signals for graceful shutdown
process.once('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.once('SIGINT', () => gracefulShutdown('SIGINT'));
