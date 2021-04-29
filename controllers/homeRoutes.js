const router = require('express').Router();
const { Post, User, Comments } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/add', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('add', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('dashboard', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// 
router.get('/update/:id', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          //attributes: ['name'],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render('update', {
      ...post
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/comments/:id', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          //model: Comments
          //attributes: ['name'],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render('comments', {
      ...post
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/screen_comments/:id', withAuth, async (req, res) => {
  try {

     // Get all posts and JOIN with user data
    const commentData = await Comments.findAll({
      where: {
        post_id: req.params.id,
      },
      include: [
        {
          model: User
        },
      ],
    });

    // Serialize data so the template can read it
    const comments = commentData.map((comment) => comment.get({ plain: true }));
    


    // Pass serialized data and session flag into template
   // res.json(comments);
     res.render('comments', { comments, post_id: req.params.id});
     
  } catch (err) {
    res.status(500).json(err);
  }
});


// Use withAuth middleware to prevent access to route
router.get('/addcomment/:id', withAuth, async (req, res) => {
  try {
   
    const postData = await Post.findByPk(req.params.id, {});
    

    const post = postData.get({ plain: true });

    res.render('add_comment', {
      ...post
    });
  } catch (err) {
    res.status(500).json(err);
  }

});



router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to home "/"
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
