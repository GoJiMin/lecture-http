const http = require("http");
const path = require("path");
const static = require("../shared/serve-static");

const handler = (req, res) => {
  // static 함수로 위임.. 현재 파일이 위치한 폴더의 절대 경로에 public을 합쳐 인자로 전달해 함수를 리턴 받는다.
  // 리턴되는 함수로 전달된 req, res 객체를 다시 전달한다.
  static(path.join(__dirname, "public"))(req, res);
};

const server = http.createServer(handler);

server.listen(3000, () => console.log("server is running ::3000"));
