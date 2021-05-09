const Post = require("../modals/post");

exports.createPost = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const post = new Post({
    title: req.body.title,
    post: req.body.post,
    imagePath: url + "/images/" + req.file.filename,
    creator : req.userData.userId
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: "Post added successfully",
      post: {
        ...createdPost,
        id: createdPost._id
      }
    });
  }).catch((error)=>{
    res.status(401).json({
      message : 'Post cannot be created'
    })
  });
}

exports.updatePost = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename
  }

  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    post: req.body.post,
    imagePath: imagePath,
    creator : req.userData.userId
  });
  Post.updateOne({ _id: req.params.id, creator : req.userData.userId }, post).then(result => {
    if(result.n > 0){
      res.status(200).json({ message: "Update successful!" });
    }
    else{
      res.status(401).json({message : 'Update Failed!..'});
    }
  }).catch((error)=>{
    res.status(401).json({
      message : 'Unable to edit post'
    })
  });
}

exports.fetchPosts = (req, res, next) => {
  let postData = Post.find();
  let pageIndex = +req.query.pageIndex;
  let pageSize = +req.query.pageSize;
  if(pageIndex && pageSize){
    postData.skip(pageSize*(pageIndex-1)).limit(pageSize)
  }
  postData.then(documents => {
    fetchedPosts = documents;
    return Post.countDocuments();
  }).then((count)=>{
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: fetchedPosts,
      totalPosts : count
    });
  }).catch((error)=>{
    res.status(500).json({
      message : 'Fetching Posts Failed'
    })
  });
}

exports.fetchById = (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  }).catch((error)=>{
    res.status(500).json({
      message : 'Fetching Posts Failed'
    })
  });
}

exports.deletePosts = (req, res, next) => {
  Post.deleteOne({ _id: req.params.id,creator:req.userData.userId }).then(result => {
    if(result.n){
      res.status(200).json({ message: "Post deleted!" });
    }
    else{
      res.status(401).json({message : 'DELETE Failed!...'});
    }
  }).catch((error)=>{
    res.status(500).json({
      message : 'Could not Delete Post'
    })
  });;
}
