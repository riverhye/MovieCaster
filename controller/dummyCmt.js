const {User, Comment} = require('../model'); // 'model' 폴더 위치에 따라 경로를 조정해주세요.

// 더미 데이터 생성 함수
async function createDummyData() {
  try {
    // 20명의 사용자 생성
    const user = await User.bulkCreate([
      { userid: 'user001', pw: 'Password1!', email: 'user1@example.com', nickname: '홍길동' },
      { userid: 'user002', pw: 'Passw0rd2!', email: 'user2@example.com', nickname: '성춘향' },
      { userid: 'user003', pw: 'P@ssword3', email: 'user3@example.com', nickname: '이몽룡' },
      { userid: 'user004', pw: 'SecurePass4', email: 'user4@example.com', nickname: '봉신방' },
      { userid: 'user005', pw: 'StrongP@ss5', email: 'user5@example.com', nickname: '강우동' },
      { userid: 'user006', pw: 'P@ssw0rd6', email: 'user6@example.com', nickname: '춘향이' },
      { userid: 'user007', pw: 'Passw0rd7!', email: 'user7@example.com', nickname: '변학도' },
      { userid: 'user008', pw: 'P@ssword8', email: 'user8@example.com', nickname: '이순신' },
      { userid: 'user009', pw: 'SecurePass9', email: 'user9@example.com', nickname: '김유신' },
      { userid: 'user010', pw: 'StrongP@ss10', email: 'user10@example.com', nickname: '강감찬' },
      { userid: 'user011', pw: 'P@ssw0rd11', email: 'user11@example.com', nickname: '을지문덕' },
      { userid: 'user012', pw: 'Passw0rd12!', email: 'user12@example.com', nickname: '신사임당' },
      { userid: 'user013', pw: 'P@ssword13', email: 'user13@example.com', nickname: '김종서' },
      { userid: 'user014', pw: 'SecurePass14', email: 'user14@example.com', nickname: '장영실' },
      { userid: 'user015', pw: 'StrongP@ss15', email: 'user15@example.com', nickname: '이이' },
      { userid: 'user016', pw: 'P@ssw0rd16', email: 'user16@example.com', nickname: '율곡 이이' },
      { userid: 'user017', pw: 'Passw0rd17!', email: 'user17@example.com', nickname: '황진이' },
      { userid: 'user018', pw: 'P@ssword18', email: 'user18@example.com', nickname: '이해인' },
      { userid: 'user019', pw: 'SecurePass19', email: 'user19@example.com', nickname: '이사부' },
      { userid: 'user020', pw: 'StrongP@ss20', email: 'user20@example.com', nickname: '전봉준' },
    ]);

    // 모든 사용자에게 11개의 영화에 대해 코멘트 작성
    for (let i = 0; i < user.length; i++) {
      for (let j = 0; j < 11; j++) {
        const randomMovieIdx = Math.floor(Math.random() * 22) + 1;
        const rate = (Math.floor(Math.random() * 9) + 1) * 0.5; // 1.0부터 5.0까지 0.5 간격으로
    
        if (rate >= 1) {  // rate가 1 이상일 때만 Comment 생성
          await Comment.create({
            rate: rate,
            useridx: user[i].useridx,
            movieidx: randomMovieIdx,
            description: `Comment ${j + 1} by ${user[i].nickname} for Movie ${randomMovieIdx}`,
          });
        }
      }
    }
  
      console.log('Dummy data created successfully!');
    } catch (error) {
      console.error('Error creating dummy data:', error);
    }
  }
  
  // 더미 데이터 생성 함수 호출
  createDummyData();