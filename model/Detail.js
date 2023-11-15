// 코멘트 불러오는 db 가 description이 맞는지 물어보기
function one_line_comment(Sequelize, DataTypes) {
  return Sequelize.define('one_line_comment', {
    useridx: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    movieidx: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    commentid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.STRING(100),
    },
  });
}
// 코멘트 작성 db 미완
function one_line_comment_new(Sequelize, DataTypes) {
  return Sequelize.define('one_line_comment_new', {
    useridx: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    movieidx: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
}

module.exports = one_line_comment_new;
module.exports = one_line_comment;
