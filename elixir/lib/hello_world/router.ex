defmodule HelloWorld.Router do
  use Plug.Router
  require Logger

  plug :match
  plug :dispatch

  get "/" do
    Logger.info("GET / - Hello World request - Sent 200")
    send_resp(conn, 200, "Hello, World!")
  end

  match _ do
    Logger.info("#{conn.method} #{conn.request_path} - Not Found - Sent 404")
    send_resp(conn, 404, "Not Found")
  end
end
