// http 모듈을 가져와 웹 서버를 만든다.
const http = require("http");

// 서버가 제공할 컨텐츠
const content = `HTTP Lecture
1. Basic
  1.1 HTTP Start
  1.2 HTTP Message
2. Web Browser
  2.1 Content Negotitation
  2.2 Cookie
`;

const handler = (req, res) => {
  // res 객체의 write 함수를 사용하면, 요청한 클라이언트한테 데이터를 전송할 수 있다.
  res.write(content);
  // end 함수로 종료 응답을 클라이언트에게 전송
  res.end();
};

// createServer로 서버 인스턴스를 만들며, 생성한 handler 함수를 전달해 요청이 들어올 때, 서버 객체가 req, res 객체를 핸들러 함수로 전달해준다.
const server = http.createServer(handler);

// 컴퓨터의 3000번 포트를 열어 http 요청을 기다리게 된다.
server.listen(3000, () => console.log("server is running ::3000"));
