let denoStars = NaN;
let nodeStars = NaN;

async function fetchData() {
  denoStars = Number(
    (await fetch("https://api.github.com/repos/denoland/deno").then((data) =>
      data.json()
    )).stargazers_count,
  );
  nodeStars = Number(
    (await fetch("https://api.github.com/repos/nodejs/node").then((data) =>
      data.json()
    )).stargazers_count,
  );
}

await fetchData();
setInterval(fetchData, 60 * 1000);

async function handleRequest(request: Request) {
  let differenceText;
  if (nodeStars > denoStars) {
    differenceText = `${nodeStars - denoStars} ⭐️ missing`;
  } else {
    if (isNaN(denoStars)) {
      differenceText = "github ratelimit got the better of us! Come back later!";
    } else {
      differenceText = "We have done it!";
    }
  }

  return new Response(
    `
    <head>
    <style>
      body {
        font-family: Avenir, Helvetica, Arial, sans-serif; font-size: 1.5rem;
      }
      section {
        margin: 25px;
      }
    </style>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    </head>
    <body align="center">
      <section>
        <a href="https://github.com/denoland/deno" target="_blank"><h1>Deno</h1></a>
        <span>${denoStars} ⭐️</span>
      </section>

      <section>
      <a href="https://github.com/nodejs/node" target="_blank"><h1>Node</h1></a>
      <span>${nodeStars} ⭐️</span>
      </section>
 
      <section>
      <span>${differenceText}</span>
      </section>

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
