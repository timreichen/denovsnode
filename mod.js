async function handleRequest(request) {
  const denoStars =
    (await fetch("https://api.github.com/repos/denoland/deno").then((data) =>
      data.json()
    )).stargazers_count;
  const nodeStars =
    (await fetch("https://api.github.com/repos/nodejs/node").then((data) =>
      data.json()
    )).stargazers_count;

  return new Response(
    `<body
      align="center"
      style="font-family: Avenir, Helvetica, Arial, sans-serif; font-size: 1.5rem;"
    >
      <h1>Deno</h1>
      <span>${denoStars}⭐️</span>

      <h1>Node</h1>
        <span>${nodeStars}⭐️</span>
      </body>`,
    {
      headers: {
        "content-type": "text/html; charset=UTF-8",
      },
    },
  );
}

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
