const http = require("http");

const handler = (req, res) => {
  const cookie = req.headers["cookie"];

  if (cookie && cookie.includes("sid")) {
    res.write("Welcome again!\n");
    res.end();
    return;
  }

  // res.setHeader("Set-Cookie", "sid=1; Domain=mysite.com; Path=/private");
  // res.setHeader("Set-Cookie", "sid=1; Max-Age=600");
  const threeDaysLater = new Date(
    Date.now() + 3 * 24 * 60 * 60 * 1000
  ).toUTCString();
  res.setHeader("Set-Cookie", `sid=1; Expires=${threeDaysLater};`);
  res.write("Welcome!\n");
  res.end();
};

const server = http.createServer(handler);
server.listen(3000, () => console.log("server is running ::3000"));
