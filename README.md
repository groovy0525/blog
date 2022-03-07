# Board project

**Heroku배포로 인해 처음 접속 시 데이터 로딩이 느릴 수 있습니다**

<a href="https://elated-shirley-039a7c.netlify.app/">웹 페이지 보기</a>

## About project

- Tech stack

  - COMMON : TypeScript
  - FE : ReactJS, Redux-Toolkit ( Redux-Thunk )
  - BE : NestJS
  - DB : MongoDB

- Features

  - 회원가입, 로그인, 로그인 유지, JWT를 이용한 권한 이용
  - 게시글 CRUD

---

<img width="400px" src="https://user-images.githubusercontent.com/60678333/157039354-648a540a-7894-402e-a9e6-3e9790819dfe.png"/>

메인 페이지 입니다. 헤더에는 관련 깃허브 링크가 있고

로그인, 회원가입 페이지로 이동 가능합니다

스크롤을 내리면 게시글을 추가로 불러오고, 하단 우측에 글 모양의 버튼을 누르면

글 작성 페이지로 이동 합니다.

만약 로그인이 되어있지 않다면 로그인 페이지로 이동 시킵니다.

---

<img width="400px" src="https://user-images.githubusercontent.com/60678333/157043559-44f89e62-3bbf-4030-96ff-8a526de4c286.png"/>

글 작성 페이지 입니다.

---

<img width="400px" src="https://user-images.githubusercontent.com/60678333/157046201-3bf19fd2-6282-48c8-8fef-1414f8134862.png"/>
<img width="400px" src="https://user-images.githubusercontent.com/60678333/157046248-a9a6708f-23e0-4871-91c1-c2021031aa1f.png"/>

유저가 상세 글 보기 페이지로 이동 한 모습입니다.

해당 게시글을 작성한 유저가 아니면 수정, 삭제 버튼이 비 활성화 됩니다.

만약 해당 게시글이 자기가 작성한 글이라면 아래와 같은 모양의 페이지로 표시됩니다.

---

<img width="400px" src="https://user-images.githubusercontent.com/60678333/157046404-3ad18071-29c1-4016-8683-e7da44d88167.png"/>
<img width="400px" src="https://user-images.githubusercontent.com/60678333/157046457-86a90152-0a7c-484d-aa45-092f06b7bb56.png"/>

회원가입 페이지 입니다.

이미 존재하는 아이디는 가입이 불가능 하고, 비밀번호와 비밀번호 확인이 다르면

가입 되지 않습니다.

회원가입이 성공하면 메인 페이지로 이동 되며 자동으로 로그인 됩니다.

---

<img width="400px" src="https://user-images.githubusercontent.com/60678333/157046703-3a2df651-001c-41a5-98bf-332d90645f05.png"/>

유효하지 않은 아이디나 비밀번호 입력시 로그인 되지 않습니다.

로그인에 성공하면 메인 페이지로 이동 되고, 새로고침을 해도 로그인이 유지 됩니다.
