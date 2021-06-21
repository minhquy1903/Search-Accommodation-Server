import express from "express";
import controller from "../controller/index.controller";
import auth from "../middleware/auth";
const postRouter = express.Router();

// postRouter.use(auth);

postRouter.get("/", (req, res) => {
  res.json({ result: "hello middleware" });
});

postRouter
  .post("/create-post", controller.postController.createPost)
  .get("/get-post/:_id", controller.postController.getPostDetail)
  .post("/filter-posts/:page", controller.postController.filterPost)
  .post("/count-posts", controller.postController.countPosts)
  .get(
    "/get-posts-by-userid/:userId",
    controller.postController.getPostByUserId,
  )
  .put("/:post_id", controller.postController.updatePost);

export default postRouter;
