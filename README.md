# Express.js code for [classicmodels](http://www.mysqltutorial.org/mysql-sample-database.aspx)

이 코드는 [꾼즈](http://www.ggoons.com)에 의해 생성된 샘플 소스코드 로서 
MySQL 용 샘플 데이터베이스 classicmodels 를 위한 express 4.x 용 코드 이며
자바스크립트로 구현 되었습니다.
타입스크립트로 구현된 샘플을 더 선호 하신다면 꾼즈의 [샘플 목록](http://www.ggoons.com#samples)에서
다운로드 할 수 있습니다.

> 이 코드는 백엔드 코드 입니다.
  따라서 이 코드의 동작을 확인 하기 위해서는 프론트엔드 코드들과 함께 실행 되어야 합니다.
  꾼즈의 [샘플 목록](http://www.ggoons.com#samples)에서 원하는 프론트엔드를 선택하여 다운로드 후 실행 하십시요.

## 샘플 데이터베이스 설치
샘플 데이터베이스를 [여기](http://www.mysqltutorial.org/mysql-sample-database.aspx) 에서 다운로드 한 후,
MySQL 데이터베이스 에 설치 하십시요.

## Username & password
코드가 데이터베이스에 접근하기 위해 사용자의 username 과 password 를 app.js 의 다음 
**FIXME: your-xxx-here** 부분 대신 붙혀 넣으십시요.
```
app.use(
    connection(mysql,{
        host: 'localhost',
        user: 'FIXME: your-username-here',
        password : 'FIXME: your-password-here',
        port: 3306, //port mysql
        database: 'classicmodels',
        connectionLimit: 20,
        waitForConnections: true
    },'pool') //or single
);
```

다음은 이 코드의 컴파일, 테스트 및 실행 방법 입니다.

## to install all dependencies
```
$ npm install
```

## to test code
```
$ npm test
```

## to run server on http://localhost:8080
```
$ npm start
```
