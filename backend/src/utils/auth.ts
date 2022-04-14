import type { Socket } from "socket.io";

const https = require("https");

function validateToken(token: string, socket: Socket) {
  // testing invalid token
  // const invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN0dWRlbnQiLCJmaXJzdE5hbWUiOiJzdHVkZW50IiwibGFzdE5hbWUiOiJzdHVkZW50Iiwicm9sZSI6InN0dWRlbnQiLCJlbWFpbCI6InN0dWRlbnRAc3R1ZGVudC5uZXQiLCJpYXQiOjE2NDk4OTg1OTUsInBhcmVudFVzZXJuYW1lIjoicGFyZW50IiwiZXhwIjoxNjUwMjU4NTk1fQ.DrQuHQ1zVBYWNPTZm5876Rb_WUg9wcsVkIEwOFA96wW";
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
      console.log("Couldn't validate token.");
      socket.disconnect();
      console.log("connected in validateToken? ", socket.connected); //expect false
    } else console.log("Validated token"); // do nothing if valid token
  });
  req.end();
}

export { validateToken };
