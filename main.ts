import ws from "./ws.ts";

async function handleConn(conn: Deno.Conn) {
    const httpConn = Deno.serveHttp(conn);
    for await (const e of httpConn) {
      e.respondWith(handle(e.request));
    }
  }
  
  function handle(req: Request) {
    if (req.headers.get("upgrade") != "websocket") {
      return new Response("not trying to upgrade as websocket.");
    }
    const { socket: websocket, response } = Deno.upgradeWebSocket(req);
    ws(websocket);
    return response;
  }
  
  const listener = Deno.listen({ port: 8000 });
  for await (const conn of listener) {
    handleConn(conn);
  }