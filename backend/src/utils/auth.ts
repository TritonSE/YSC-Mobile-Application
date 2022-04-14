import type { Socket } from "socket.io";

import { YSC_SERVER } from "../constants";

const https = require("https");

function validateToken(token: string, socket: Socket) {
  // testing invalid token
  // const invalidToken = "invalid";
  const options = {
    hostname: YSC_SERVER,
    path: "/middleware/auth/validate",
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const req = https.request(options, (res: any) => {
    if (res.statusCode !== 200) {
      // disconnect from socket if invalid token
      console.log("Couldn't validate token.");
      socket.disconnect();
      console.log("connected in validateToken? ", socket.connected); //expect false
    } else console.log("Validated token"); // do nothing if valid token
  });
  req.end();
}

export { validateToken };
