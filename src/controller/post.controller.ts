import { Request, Response } from 'express';
import IResponse from '../interface/response.interface';
import Post from '../model/post.model';

const getPostDetail = async (req: Request, res: Response) => {
  try {
    const _id: string = req.params._id;

    const post = await Post.findById(_id);

    const response: IResponse<any> = {
      result: true,
      data: post,
      error: null,
    };
    res.status(200).json({ data: response });
  } catch (error) {
    const response: IResponse<any> = {
      result: false,
      data: null,
      error: error,
    };
    res.status(200).json({ data: response });
  }
};

const filterPost = (req: Request, res: Response) => {
  const { province, district, ward, area, type, priceRange } = req.body;

  try {
  } catch (error) {}
};

const countPosts = async (req: Request, res: Response) => {
  try {
    const numberOfPosts: number = await Post.count({});

    const response: IResponse<number> = {
      result: true,
      data: numberOfPosts,
      error: false,
    };

    res.status(200).json({ data: response });
  } catch (error) {}
};

const getPostsOfPage = async (req: Request, res: Response) => {
  const page: number = parseInt(req.params.page);
  const limit = 15;
  const startIndex = (page - 1) * limit;

  try {
    const posts = await Post.find({ typePost: { $ne: 1 } })
      .skip(startIndex)
      .limit(limit);

    const filterPosts = posts.map((post, i) => {
      post.accommodation.images.length = 1;
      const filterPost = {
        timeStart: post.timeStart,
        typePost: post.typePost,
        _id: post._id,
        accommodation: {
          area: post.accommodation.area,
          title: post.accommodation.title,
          retail: post.accommodation.retail,
          address: post.accommodation.address,
          images: post.accommodation.images,
        },
      };
      return filterPost;
    });

    const response: IResponse<any> = {
      result: true,
      data: filterPosts,
      error: false,
    };

    res.status(200).json({ data: response });
  } catch (error) {}
};

const getHotPosts = async (req: Request, res: Response) => {
  try {
    const hotPosts = await Post.find({ typePost: 1 }).limit(10);

    const filterPosts = hotPosts.map((post, i) => {
      post.accommodation.images.length = 1;
      const filterPost = {
        timeStart: post.timeStart,
        typePost: post.typePost,
        _id: post._id,
        accommodation: {
          area: post.accommodation.area,
          title: post.accommodation.title,
          retail: post.accommodation.retail,
          address: post.accommodation.address,
          images: post.accommodation.images,
        },
      };
      return filterPost;
    });

    const response: IResponse<Array<any>> = {
      result: true,
      data: filterPosts,
      error: null,
    };

    res.status(200).json({ data: response });
  } catch (error) {
    const response: IResponse<any> = {
      result: false,
      data: null,
      error: error,
    };
    res.status(200).json({ data: response });
  }
};

const createPost = (req: Request, res: Response) => {
  const { timeStart, timeEnd, typePost, user_id, accommodation } = req.body;

  const {
    title,
    description,
    area,
    retail,
    address,
    person,
    typeAccommdation,
    images,
  } = accommodation;

  try {
    const newPost = new Post({
      timeStart,
      timeEnd,
      typePost,
      user_id,
      accommodation: {
        address,
        title,
        description,
        area,
        retail,
        person,
        typeAccommdation,
        images,
      },
    });

    newPost.save((err, data) => {
      if (err) {
        console.log(err);

        throw new Error('fail to save');
      }
      console.log(data);
      res.json({ data: 'success' });
    });
  } catch (error) {
    res.json(error);
  }
};

export default {
  getPostDetail,
  filterPost,
  createPost,
  getHotPosts,
  getPostsOfPage,
  countPosts,
};
