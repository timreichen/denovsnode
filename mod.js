async function handleRequest(request) {
  const denoStars = Number(
    (await fetch("https://api.github.com/repos/denoland/deno").then((data) =>
      data.json()
    )).stargazers_count,
  );
  const nodeStars = Number(
    (await fetch("https://api.github.com/repos/nodejs/node").then((data) =>
      data.json()
    )).stargazers_count,
  );

  let differenceText;
  if (nodeStars > denoStars) {
    differenceText = `${nodeStars - denoStars} ⭐️ missing`;
  } else {
    differenceText = "We have done it!";
  }

  return new Response(
    `<body align="center" style="font-family: Avenir, Helvetica, Arial, sans-serif; font-size: 1.5rem;">
      <h1>Deno</h1>
      <span>${denoStars} ⭐️</span>

      <h1>Node</h1>
      <span>${nodeStars} ⭐️</span>

      <span>${differenceText}</span>

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
