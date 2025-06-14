use hyper::server::conn::http1;
use hyper::service::service_fn;
use hyper::{body::Bytes, Request, Response};
use hyper_util::rt::TokioIo;
use http_body_util::Full;
use std::convert::Infallible;
use std::net::SocketAddr;
use tokio::net::TcpListener;
use tokio::signal;

async fn hello_world(req: Request<hyper::body::Incoming>) -> Result<Response<Full<Bytes>>, Infallible> {
    let method = req.method();
    let uri = req.uri();
    println!("Received {} request to {}", method, uri);
    Ok(Response::new(Full::new(Bytes::from("Hello, World!\n"))))
}

async fn shutdown_signal() {
    // Wait for the SIGTERM or SIGINT signal
    let ctrl_c = async {
        signal::ctrl_c()
            .await
            .expect("failed to install Ctrl+C handler");
    };

    #[cfg(unix)]
    let terminate = async {
        signal::unix::signal(signal::unix::SignalKind::terminate())
            .expect("failed to install signal handler")
            .recv()
            .await;
    };

    #[cfg(not(unix))]
    let terminate = std::future::pending::<()>();

    tokio::select! {
        _ = ctrl_c => {},
        _ = terminate => {},
    }

    println!("Shutdown signal received, starting graceful shutdown");
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
    let addr = SocketAddr::from(([0, 0, 0, 0], 8080));
    let listener = TcpListener::bind(addr).await?;
    
    println!("Server running on http://0.0.0.0:8080");
    println!("Press Ctrl+C to shutdown");

    tokio::select! {
        _ = shutdown_signal() => {
            println!("Received shutdown signal, exiting...");
        }
        _ = async {
            loop {
                let (stream, addr) = listener.accept().await?;
                println!("New connection from: {}", addr);
                let io = TokioIo::new(stream);

                tokio::task::spawn(async move {
                    if let Err(err) = http1::Builder::new()
                        .serve_connection(io, service_fn(hello_world))
                        .await
                    {
                        eprintln!("Error serving connection: {:?}", err);
                    }
                });
            }
            #[allow(unreachable_code)]
            Ok::<(), Box<dyn std::error::Error + Send + Sync>>(())
        } => {}
    }

    Ok(())
}
