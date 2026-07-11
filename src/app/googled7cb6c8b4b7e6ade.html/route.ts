export const dynamic = "force-static";

export function GET() {
  return new Response("google-site-verification: googled7cb6c8b4b7e6ade.html", {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
