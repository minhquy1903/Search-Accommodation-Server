import { Request, Response } from "express";
import IResponse from "../interface/response.interface";
import Post from "../model/post.model";

const getPostDetail = async (req: Request, res: Response) => {
  try {
    const _id: string = req.params._id;

    const post = await Post.findById(_id).populate("user_id");

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

const filterPost = async (req: Request, res: Response) => {
  const {
    province,
    district,
    ward,
    area,
    type,
    retail,
    newPost,
    typePost,
    status,
  } = req.body;

  const page: number = parseInt(req.params.page);
  const limit = 15;
  const startIndex = (page - 1) * limit;

  const timeExpire = new Date();

  const filterInfo = {
    typePost: typePost,
    status: status,
    timeEnd: { $gte: timeExpire },
    "accommodation.address.province": province,
    "accommodation.address.district": district,
    "accommodation.address.ward": ward,
    "accommodation.typeAccommdation": type,
    "accommodation.area": area,
    "accommodation.retail": retail,
  };

  const filterQuery = getFilterQuery(filterInfo);

  console.log(filterQuery);

  try {
    let posts: Array<any> = [];
    if (newPost)
      posts = await Post.find(filterQuery)
        .skip(startIndex)
        .limit(limit)
        .sort({ timeStart: -1 });
    else
      posts = await Post.find(filterQuery)
        .skip(startIndex)
        .limit(limit)
        .sort("typePost")
        .sort({ timeStart: -1 });
    const filterPosts = posts.map((post, i) => {
      post.accommodation.images.length = 1;
      const filterPost = {
        timeStart: post.timeStart,
        typePost: post.typePost,
        _id: post._id,
        status: post.status,
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

const countPosts = async (req: Request, res: Response) => {
  const { province, district, ward, area, type, retail, typePost, status } =
    req.body;
  const timeExpire = new Date();

  const filterInfo = {
    typePost: typePost,
    timeEnd: { $gte: timeExpire },
    status: status,
    "accommodation.address.province": province,
    "accommodation.address.district": district,
    "accommodation.address.ward": ward,
    "accommodation.typeAccommdation": type,
    "accommodation.area": area,
    "accommodation.retail": retail,
  };

  const filterQuery = getFilterQuery(filterInfo);

  try {
    const numberOfPosts: number = await Post.count(filterQuery);

    const response: IResponse<number> = {
      result: true,
      data: numberOfPosts,
      error: false,
    };

    res.status(200).json({ data: response });
  } catch (error) {
    const response: IResponse<null> = {
      result: false,
      data: null,
      error: error,
    };

    res.status(200).json({ data: response });
  }
};

const updatePost = async (req: Request, res: Response) => {
  try {
    const postId: string = req.params.post_id;
    const {
      address,
      typeAccommdation,
      title,
      description,
      price,
      area,
      images,
    } = req.body;

    const postAfterUpdate = await Post.findByIdAndUpdate(
      { _id: postId },
      {
        "accommodation.address": address,
        "accommodation.typeAccommdation": typeAccommdation,
        "accommodation.title": title,
        "accommodation.price": price,
        "accommodation.area": area,
        "accommodation.images": images,
        "accommodation.description": description,
      },
    );

    const response: IResponse<any> = {
      result: true,
      data: postAfterUpdate,
      error: null,
    };

    return res.status(200).json({ data: response });
  } catch (error) {
    const response: IResponse<any> = {
      result: true,
      data: null,
      error: error.message,
    };
    return res.status(200).json({ data: response });
  }
};

const confirmPost = async (req: Request, res: Response) => {
  const postId = req.params.post_id;
  const { status } = req.params;

  try {
    const result = await Post.updateOne({ _id: postId }, { status: status });

    if (result.nModified === 1) {
      const response: IResponse<any> = {
        result: true,
        data: null,
        error: null,
      };

      res.json({ data: response });
    }
  } catch (error) {
    console.log(error);
    res.status(404);
  }
};

const createPost = async (req: Request, res: Response) => {
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

    newPost.save((err: any, data: any) => {
      if (err) {
        console.log(err);

        throw new Error("fail to save");
      }
      console.log(data);
      res.json({ data: "success" });
    });
  } catch (error) {
    res.json(error);
  }
};

const getPostByUserId = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const posts = await Post.find({ user_id: userId }).sort({ timeStart: -1 });

    const response: IResponse<any> = {
      result: true,
      data: posts,
      error: null,
    };

    res.status(200).json({ data: response });
  } catch (error) {
    const response: IResponse<any> = {
      result: false,
      data: null,
      error: error.error,
    };

    res.status(200).json({ data: response });
  }
};

const getFilterQuery = (obj: object) => {
  return Object.entries(obj)
    .filter((item) => item[1] || item[1] === 0)
    .reduce((filterQuery, field) => {
      let value = field[1];

      if (field[0] === "accommodation.retail") value = getRangeRetail(field[1]);
      else if (field[0] === "accommodation.area")
        value = getRangeArea(field[1]);

      return { ...filterQuery, [field[0]]: value };
    }, {});
};

const getRangeRetail = (number: number) => {
  switch (number) {
    case 1:
      return { ["$gt"]: 1, ["$lt"]: 2 };
    case 2:
      return { ["$gt"]: 2, ["$lt"]: 3 };
    case 3:
      return { ["$gt"]: 3, ["$lt"]: 5 };
    case 4:
      return { ["$gt"]: 5, ["$lt"]: 7 };
    case 5:
      return { ["$gt"]: 7, ["$lt"]: 10 };
    case 6:
      return { ["$gt"]: 10, ["$lt"]: 15 };
    case 7:
      return { ["$gt"]: 15 };

    default:
      break;
  }
};

const getRangeArea = (number: number) => {
  switch (number) {
    case 1:
      return { ["$lt"]: 20 };
    case 2:
      return { ["$gt"]: 20, ["$lt"]: 30 };
    case 3:
      return { ["$gt"]: 30, ["$lt"]: 50 };
    case 4:
      return { ["$gt"]: 50, ["$lt"]: 60 };
    case 5:
      return { ["$gt"]: 60, ["$lt"]: 70 };
    case 6:
      return { ["$gt"]: 70, ["$lt"]: 80 };
    case 7:
      return { ["$gt"]: 80, ["$lt"]: 90 };
    case 8:
      return { ["$gt"]: 90, ["$lt"]: 100 };
    case 9:
      return { ["$gt"]: 100 };

    default:
      break;
  }
};

export default {
  getPostDetail,
  filterPost,
  createPost,
  countPosts,
  updatePost,
  getPostByUserId,
  confirmPost,
};
