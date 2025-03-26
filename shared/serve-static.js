const fs = require("fs");
const path = require("path");

// 경로를 인자로 받아 함수를 리턴
const serveStatic = (root) => {
  // handler 함수의 인자로 들어온 req, res 객체를 받아서 처리
  return (req, res) => {
    // 전달된 root 경로는 파일이 위치한 경로 => __dirname + "/public"
    // req 객체의 url 프로퍼티는 요청된 URL을 의미 ex) http://localhost:3000/ => "/"로 index.html을 서빙함.
    // 만약 요청된 url이 "/"이 아니라면 해당 url 자체를 사용함 ex) http://localhost:3000/favicon.ico => "/favicon.ico"
    const filePath = path.join(root, req.url === "/" ? "/index.html" : req.url);

    // fs.readFile을 통해 파일을 읽어서 응답을 보냄
    // 두번째 인자로 콜백함수를 전달해 처리하는데 콜백함수의 인자로 파일을 읽는데 실패한 경우 err 객체를 받음
    fs.readFile(filePath, (err, data) => {
      if (err) {
        // 파일을 읽는데 실패한 경우
        if (err.code === "ENOENT") {
          res.statusCode = 404;
          res.write("Not Found\n");
          res.end();
          return;
        }

        // 서버에서 에러가 발생한 경우
        res.statusCode = 500;
        res.write("Internal Server Error\n");
        res.end();
        return;
      }

      // 여기까지 도착했다면 파일을 읽는데 성공한 경우로 extname을 통해 파일의 확장자를 추출함
      // Return the extension of the path, from the last '.' to end of string in the last portion of the path.
      // If there is no '.' in the last portion of the path or the first character of it is '.', then it returns an empty string.
      // 위는 extname 함수의 jsdoc 설명으로 파일을 읽어 .을 기점으로 확장자를 추출함
      const ext = path.extname(filePath).toLowerCase();
      // 브라우저가 서버로부터 받은 데이터를 해석할 수 있게 마임 타입을 설정함 index.html의 경우 text/html
      let contentType = "text/html";
      switch (ext) {
        case ".html":
          contentType = "text/html";
          break;
        case ".js":
          contentType = "text/javascript";
          break;
        case ".css":
          contentType = "text/css";
          break;
        case ".png":
          contentType = "image/png";
          break;
        case ".json":
          contentType = "application/json";
          break;
        case ".otf":
          contentType = "font/otf";
          break;
        default:
          contentType = "application/octet-stream";
      }

      // 응답의 헤더로 Content-Type을 넣어줌
      res.setHeader("Content-Type", contentType);

      res.write(data);
      res.end();
    });
  };
};

module.exports = serveStatic;
