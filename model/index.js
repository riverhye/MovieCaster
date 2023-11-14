const mysql = require('mysql');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'mc',
});

// 회원가입(유저를 db에 저장)
exports.user_signup = (data,cb) =>{
    const sql = `insert into user (userid, pw, email, nickname) values('${data.userid}', '${data.pw}', '${data.email}','${data.nickname}')`
    conn.query(sql, (err, result) => {
        // err 변수가 빈 값이 아니라면, err가 발생했다는 것.
        if (err) {
          throw err;
        }
        console.log('visitor insert', result);
        cb(result);
      });
}

