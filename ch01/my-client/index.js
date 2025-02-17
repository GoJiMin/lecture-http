// 마찬가지로 클라이언트 환경에도 http 모듈을 가져온다.
const http = require("http");

// // 클라이언트에서 요청할 서버의 URL 객체를 생성한다.
// const options = new URL("http://localhost:3000/");

// // 클라이언트 측에서 서버의 응답을 처리할 handler 함수를 정의한다. 응답 객체인 res 객체가 들어온다.
// const handler = (res) => {
//   const data = [];

//   // res 객체의 data 이벤트를 구독한다.
//   // 서버의 응답 데이터가 chunk로 들어오는데, 문자열로 변경해 data 배열에 추가한다.
//   res.on("data", (chunk) => {
//     data.push(chunk.toString());
//   });

//   // 응답이 종료될 때, end 이벤트가 발행되는데 그동안 쌓인 데이터를 하나로 모아 콘솔에 출력한다.
//   res.on("end", () => {
//     console.log(data.join(""));
//   });
// };

// // request 함수를 통해 요청 객체를 만든다. URL 객체와 handler 함수를 등록한다.
// const req = http.request(options, handler);

// // end 함수를 호출해 서버에 요청을 보낸다.
// req.end();

// 노드의 process 객체의 argv 객체 배열에는 노드 플랫폼에서 실행될 때 사용한 커맨드라인 명령어에 접근이 가능하다. 2번 인덱스에 프로그램 경로 이후에 전달된 인자 값을 문자열로 받을 수 있다.
// node my-client/ch01 <여기>
const url = process.argv[2];

if (!url) {
  console.error(`Usage: node my-client <요청할 파일 이름>`);
  process.exit();
}

// 이제 요청할 파일별로 요청 URL 객체를 생성한다.
const options = new URL(`http://localhost:3000/${url}`);

const handler = (res) => {
  const data = [];

  res.on("data", (chunk) => {
    data.push(chunk.toString());
  });

  res.on("end", () => {
    console.log(data.join(""));
  });
};

const req = http.request(options, handler);
req.end();
