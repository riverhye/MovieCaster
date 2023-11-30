# 🎥 MovieCaster

영화를 사랑하는 이들을 위한 영화 정보 제공 & 한줄평 작성 웹사이트

웹사이트 방문자는 페이지에서 추천하는 영화 및 검색한 영화의 상세 내용과 해당 영화에 남겨진 다른 회원들의 리뷰를 읽어볼수 있습니다.  
회원가입 시 직접 리뷰를 작성하고 다른 회원이 작성한 리뷰 및 자신이 마음에 드는 영화에 좋아요를 눌러 마이페이지에서 관리할 수 있습니다.  
를 받아와 MySql 데이터 베이스에 저장했으며 미리 작성된 테이블의 고유키와 외례키를 이용해 회원이 상호작용한 결과값을 저장했습니다.

- **개발 기간** : 2023-11-07 ~ 2023-11-23(2주)
- **배포 주소** : http://101.101.218.151:8000/

## 👨‍👩‍👧‍👦 팀 구성

||이름|담당 페이지/ 역할|
|------|---|---|
|Full-stack|박윤혜|메인페이지 / 팀장, API DB저장, 와이어프레임 작성(figma), notion관리|
|Fullstack|구은현|마이페이지 / 와이어프레임 작성(figma), canva제작 |
|Full-stack|이병진|상세페이지 / 와이어프레임 작성(figma)|
|Back-end|허윤우|마이페이지 + 회원가입 로그인 기능 보조, 발표|

### 그외 사용한 패키지
- axios, ejs, express-session, multer, dotenv

## 개발환경
### Front
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

### Back
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)

### Environment
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

### Communication & Tool
![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)
![Canva](https://img.shields.io/badge/Canva-%2300C4CC.svg?style=for-the-badge&logo=Canva&logoColor=white)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)

### API
**[TMDB](https://developer.themoviedb.org/reference/intro/getting-started)**(The Movie Database)

## 디렉토리 구조
```
4FLEX/  
├── config/  
│ ├── envs/  
│ │ └── key.env  
│ └── config.json  
├── controller/  
│ ├── CDetail.js  
│ ├── CFindid.js  
│ ├── CFindpw.js  
│ ├── CGetMovies.js  
│ ├── CMain.js  
│ ├── CMypage.js  
│ ├── CSearch.js  
│ ├── CSignin.js  
│ ├── CSignup.js  
│ ├── CUser.js  
│ └── dummyCmt.js  
├── model/  
│ ├── Comment.js  
│ ├── CommentLike.js  
│ ├── FavMovie.js  
│ ├── getMovie.js  
│ ├── index.js  
│ ├── MovieInfo.js  
│ ├── MovieLike.js  
│ └── User.js  
├── node_modules/  
├── routes/  
│ ├── datail.js  
│ ├── findid.js  
│ ├── findpw.js  
│ ├── indes.js  
│ ├── mypage.js  
│ ├── search.js  
│ ├── signin.js  
│ ├── signout.js  
│ └── signup.js  
├── static/  
│ ├── css/  
│ │ ├── mypage/  
│ │ │ ├── mypage.css  
│ │ │ ├── mypageComment.css  
│ │ │ ├── mypageFav.css  
│ │ │ └── mypageMovieLike.css  
│ │ ├── detail.review.css  
│ │ ├── detail.css  
│ │ ├── findid.css  
│ │ ├── findpw.css  
│ │ ├── footer.css  
│ │ ├── header.css  
│ │ ├── index.css  
│ │ ├── main.css  
│ │ ├── search.css  
│ │ ├── signin.css  
│ │ └── signup.css  
│ └── img/  
├── uploads/  
├── views/  
│ ├── mypage/  
│ │ ├── mypage.ejs  
│ │ ├── mypageComment.ejs  
│ │ ├── mypageCommentLike.ejs  
│ │ ├── mypageFav.ejs  
│ │ ├── mypageInfo.ejs  
│ │ └── mypageMovieLike.ejs  
│ ├── detail.ejs  
│ ├── findid.ejs  
│ ├── findpw.ejs  
│ ├── footer.ejs  
│ ├── header.ejs  
│ ├── main.ejs  
│ ├── search.ejs  
│ ├── signin.ejs  
│ └── signup.ejs  
├── .gitignore  
├── index.js  
├── package-lock.json  
├── package.json  
└── README.md
```

# 페이지별 주요 기능
## 메인 페이지
![좋아요+main gif](https://github.com/riverhye/MovieCaster/assets/77149171/888a30a6-e008-4ef5-9b5c-15f55d6221b9)

## 검색 페이지
![검색 gif](https://github.com/riverhye/MovieCaster/assets/77149171/c8e119bf-1cc8-410d-a4c3-37bce17d1e50)

## 상세 페이지
Section1. 한줄평  
여기에서는 해당 영화에 대한 다른 회원들이 작성한 리뷰와 남긴 평점을 볼 수 있습니다.  
만약 로그인을 했다면 직접 리뷰 및 평점을 남길 수 있으며 다른 회원들이 작성한 리뷰에 좋아요을 눌러 마이페이지에서 자신이 좋아요를 누른 리뷰 목록을 불러올 수 있습니다.  
다른 회원들이 본인의 리뷰를 읽어볼 수 있으며 자신이 작성한 평점 또한 바로 반영되어 메인 페이지에서 영화의 순위에 변동이 일어날 수 있습니다.

## 마이 페이지(프로필 관리)
![마이페이지1](https://github.com/riverhye/MovieCaster/assets/139302489/418a0309-34ab-49d7-9ba4-8627a6205b1a)

## 마이 페이지(인생작품 등록)
![마이페이지2](https://github.com/riverhye/MovieCaster/assets/139302489/d8533bda-bc16-466d-99d2-243211f56058)

## 마이 페이지(영화/코멘트 좋아요)
![마이페이지3](https://github.com/riverhye/MovieCaster/assets/139302489/b3cdc0ba-d334-407e-bbec-3ccc94a4e5fb)

## 마이 페이지(내코멘트)
![마이페이지4](https://github.com/riverhye/MovieCaster/assets/139302489/c415247d-a4f2-448a-83e5-f65e824c0c81)


Section2. 상세내용
여기에서는 영화의 제목, 장르, 줄거리 등 다양한 정보를 제공합니다.  
영화 포스터에 좋아요를 눌러 마이페이지에서 자신이 좋아요를 누른 영화 목록을 불러올 수 있습니다.

Section3. 비슷한 영화 추천  
여기에서는 해당 영화의 장르를 세분화 해 비슷한 장르의 영화를 총 세개 추천하여 표시합니다.
영화의 고유키를 이용하여 각 영화 클릭 시 해당 영화의 상세페이지로 이동이 가능합니다.
