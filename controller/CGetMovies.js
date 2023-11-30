// api DB 저장
const { Movie_info } = require('../model');
const apiMovies = require('../model/getMovies');

exports.get_api_movies = async (req, res) => {
  try {
    // 영화 API 불러오기
    const allResults = await apiMovies();
    const movieResults = allResults.movieResults;
    const genreResults = allResults.genreResults;

    // 기존에 있는 영화 확인
    for (const movieData of movieResults) {
      const existingMovie = await Movie_info.findOne({
        where: {
          title: movieData.title,
        },
      });

      // 영화 API의 장르번호와 장르 API의 장르 번호가 같은 {id, name}을 각각 컬럼에 저장
      if (!existingMovie) {
        const genreIds = movieData.genre_ids || []; // 장르 num
        const genres = []; // 장르명

        for (const genreId of genreIds) {
          const genre = genreResults.find((g) => g.id === genreId); // ex. {id: 18, name: 액션}
          genres.push(genre ? genre.name : '정보 없음');
        }

        await Movie_info.create({
          title: movieData.title,
          overview: movieData.overview,
          release_date: movieData.release_date,
          poster_path: movieData.poster_path,
          genre_ids: genreIds.join(', '),
          genre: genres.join(', '),
        });
      }
    }
    res.send('movie get');
  } catch (error) {
    console.error('err:', error);
  }
};
