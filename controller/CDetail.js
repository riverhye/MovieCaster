const dotenv = require('dotenv');
const path = require('path');
dotenv.config();
dotenv.config({ path: path.join(__dirname, '../config/envs/key.env') });

const key = process.env.API_KEY;

exports.key = (req, res) => {
  res.send(key);
};

const { MovieInfo } = require('../model');
const { User } = require('../model');
const { Comment } = require('../model');
const { error } = require('console');

exports.detail = (req, res) => {
  res.render('detail');
};

// model/comment에 저장된 리뷰 받기
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Comment.findAll();
    res.json({ reviews: 'review data' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error' });
  }
};

// 작성한 리뷰 저장하기
exports.saveReview = async (req, res) => {
  try {
    const { description, rate } = req.body;

    const savedReview = await Comment.create({
      description: description,
      rate: rate,
    });
    res.status(201).json({ message: 'Review saved successfully', review: savedReview });
  } catch (error) {
    console.error('Error saving review:', error);
    res.status(500).json({ error: 'Failed to save review' });
  }
};
