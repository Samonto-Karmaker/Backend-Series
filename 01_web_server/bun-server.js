import { serve } from "bun";

serve({
    fetch(request) {
        const url = new URL(request.url);
        if (url.pathname === "/") {
            return new Response("Hello World, it's bun here", {
                status: 200,
                headers: {
                    contentType: "text/plain"
                }
            })
        } else {
            return new Response("Not Found", {
                status: 404,
                headers: {
                    contentType: "text/plain"
                }
            })
        }
    },
    port: 3000,
    hostname: "127.0.0.1",
})