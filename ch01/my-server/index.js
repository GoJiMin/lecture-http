// http 모듈을 가져와 웹 서버를 만든다.
const http = require("http");

// // 서버가 제공할 컨텐츠
// const content = `HTTP Lecture
// 1. Basic
//   1.1 HTTP Start
//   1.2 HTTP Message
// 2. Web Browser
//   2.1 Content Negotitation
//   2.2 Cookie
// `;

// const handler = (req, res) => {
//   // res 객체의 write 함수를 사용하면, 요청한 클라이언트한테 데이터를 전송할 수 있다.
//   res.write(content);
//   // end 함수로 종료 응답을 클라이언트에게 전송
//   res.end();
// };

// // createServer로 서버 인스턴스를 만들며, 생성한 handler 함수를 전달해 요청이 들어올 때, 서버 객체가 req, res 객체를 핸들러 함수로 전달해준다.
// const server = http.createServer(handler);

// // 컴퓨터의 3000번 포트를 열어 http 요청을 기다리게 된다.
// server.listen(3000, () => console.log("server is running ::3000"));

// handler 함수의 역할을 위임할 static 함수를 정의한다.

const path = require("path");
const fs = require("fs");

const static = (req, res) => {
  // 요청 객체의 url 속성은 요청 주소를 나타낸다.
  // path 모듈의 join 함수를 사용하면 여러 경로를 조합해 하나의 경로를 생성할 수 있다.
  // __dirname은 현재 경로를 나타낸다 process.cwd()랑 같은듯?
  const filepath = path.join(__dirname, "public", req.url);

  // fs 모듈을 사용하면 파일을 읽을 수 있다. 파일을 읽는 I/O 작업은 비동기 작업으로 콜백 함수가 제공된다.
  fs.readFile(filepath, (err, data) => {
    // 파일을 읽지 못한다면 err 객체가 전달된다.
    if (err) {
      // 응답 객체의 write 함수를 사용해 찾지 못했다고 클라이언트 측에 데이터를 전송해 응답 종료 신호를 보내고 함수를 종료한다.
      res.write("Not Found\n");
      res.end();
      return;
    }

    // 파일을 찾았다면, 데이터를 전송하고 종료 신호를 보낸다.
    res.write(data);
    res.end();
  });
};

const handler = (req, res) => static(req, res);

const server = http.createServer(handler);

server.listen(3000, () => console.log("server is running ::3000"));
