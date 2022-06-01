import type { Socket } from "socket.io";

const https = require("https");

function validateToken(token: string, socket: Socket) {
  // testing invalid token
  // const invalidToken = "invalid";
  const options = {
    hostname: "ystemandchess.com",
    path: "/middleware/auth/validate",
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const req = https.request(options, (res: any) => {
    if (res.statusCode !== 200) {
      // disconnect from socket if invalid token
      socket.disconnect(true);
    }
  });
  req.end();
}

export default validateToken;
