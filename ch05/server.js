const http = require("http");
const path = require("path");
const queryString = require("querystring");
const static = require("../shared/serve-static");

const logRequest = (req) => {
  const log = [
    `${new Date().toISOString()}`,
    `IP: ${req.socket.remoteAddress || req.conection.remoteAddress}`,
    `User-Agent: ${req.headers["user-agent"]}`,
    `Referer: ${req.headers["referer"]}`,
  ].join("\n");

  console.log(log);
};

const getLogin = (req, res) => {
  const { searchParams } = new URL(req.url, `http://${req.headers.host}`);

  const email = searchParams.get("email");
  const password = searchParams.get("password");

  const authenticated = email === "myemail" && password === "mypassword";

  if (!authenticated) {
    res.statusCode = 401;
    res.write("Unathorized\n");

    res.end();
    return;
  }

  res.write("Login Success!");
  res.end();
};

const postLogin = (req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const { email, password } = queryString.parse(body);

    const authenticated = email === "myemail" && password === "mypassword";

    if (!authenticated) {
      res.statusCode = 401;
      res.write("Unathorized\n");

      res.end();
      return;
    }

    res.write("Login Success!");
    res.end();
  });
};

const handler = (req, res) => {
  const { pathname } = new URL(req.url, `http://${req.headers.host}`);

  if (pathname === "/tracking-pixel.gif") logRequest(req);
  if (pathname === "/login") return postLogin(req, res);

  // static 함수로 위임.. 현재 파일이 위치한 폴더의 절대 경로에 public을 합쳐 인자로 전달해 함수를 리턴 받는다.
  // 리턴되는 함수로 전달된 req, res 객체를 다시 전달한다.
  static(path.join(__dirname, "public"))(req, res);
};

const server = http.createServer(handler);

server.listen(3000, () => console.log("server is running ::3000"));
