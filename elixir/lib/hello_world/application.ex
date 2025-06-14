defmodule HelloWorld.Application do
  @moduledoc false

  use Application
  require Logger

  @port 8080

  @impl true
  def start(_type, _args) do
    # Configure logger format at runtime to remove blank lines
    :logger.set_handler_config(:default, :formatter, 
      {:logger_formatter, %{single_line: true, template: [:time, " [", :level, "] ", :msg, "\n"]}})
    
    children = [
      {Plug.Cowboy, scheme: :http, plug: HelloWorld.Router, options: [port: @port]}
    ]

    opts = [strategy: :one_for_one, name: HelloWorld.Supervisor]
    
    case Supervisor.start_link(children, opts) do
      {:ok, pid} ->
        Logger.info("🚀 Hello World HTTP server started on port #{@port} - Visit http://localhost:#{@port}")
        {:ok, pid}
      error ->
        Logger.error("Failed to start server: #{inspect(error)}")
        error
    end
  end
end
