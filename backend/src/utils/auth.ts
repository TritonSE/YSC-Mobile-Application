const https = require("https");

async function validateToken(token: string) {
  const options = {
    hostname: "ystemandchess.com",
    path: "/middleware/auth/validate",
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const req = https.request(options, (res: any) => {
    if (res.statusCode !== 200) console.log("Couldn't validate token.");
    else console.log("Validated token");
  });
  req.end();
}

export { validateToken };
