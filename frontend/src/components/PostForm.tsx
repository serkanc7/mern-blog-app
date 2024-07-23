import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useAddCommentMutation } from "../features/api/apiSlice";
import StarRating from "./StarRating";

interface IFormInputs {
    content: string;
    rating?: number;
  }
  

interface PostFormProps {
  postId: string;
  onSubmitSuccess: (message: string) => void;
}

const PostForm: React.FC<PostFormProps> = ({ postId, onSubmitSuccess }) => {
  const [addComment] = useAddCommentMutation();
  const [rating, setRating] = useState(0);
  const validationSchema = Yup.object().shape({
    content: Yup.string().required("Content is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInputs>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    try {
      const result = await addComment({ postId, ...data, rating }).unwrap();
      onSubmitSuccess(result.message);
      reset();
    } catch (error: any) {
      onSubmitSuccess("Failed to add comment. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <div className="mb-4">
        <label className="block text-gray-700">Content</label>
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.content ? "border-red-500" : ""
              }`}
            />
          )}
        />
        {errors.content && (
          <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Rating</label>
        <StarRating rating={rating} onRatingChange={(rating) => setRating(rating)} />
        <Controller
          name="rating"
          control={control}
          render={({ field }) => (
            <input {...field} type="hidden" value={rating} />
          )}
        />
        {errors.rating && (
          <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </form>
  );
};

export default PostForm;