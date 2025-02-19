import Post from '../models/postModel.js'
const postController = {
  getAllPost: async (req, res, next) => {
    try {
      const posts = await Post.find();
      res.status(200).json({
        status: 'success',
        results: posts.length,
        data: {
          posts
        }
      });
    } catch (e) {
      res.status(400).json({
        status: 'fail'
      });
    }
  },

  getOnePost: async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).json({
        status: 'success',
        data: {
          post
        }
      });
    } catch (e) {
      res.status(400).json({
        status: 'fail'
      });
    }
  },

  createPost: async (req, res, next) => {
    try {
      const post = await Post.create(req.body);
      res.status(200).json({
        status: 'success, post create',
        data: {
          post
        }
      });
    } catch (e) {
      res.status(400).json({
        status: 'fail'
      });
    }
  },

  updatePost: async (req, res, next) => {
    try {
      const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(200).json({
        status: 'success',
        data: {
          post
        }
      });
    } catch (e) {
      res.status(400).json({
        status: 'fail'
      });
    }
  },

  deletePost: async (req, res, next) => {
    try {
      const post = await Post.findByIdAndDelete(req.params.id);
      res.status(200).json({
        status: 'success'
      });
    } catch (e) {
      res.status(400).json({
        status: 'fail'
      });
    }
  }
};


export default postController;