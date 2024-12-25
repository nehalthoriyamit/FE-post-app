"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import axiosInstance from "@/services/axiosInstance";
import Layout from "@/components/Layout";
import { Button, IconButton, Stack } from "@mui/material";
import InputText from "@/components/InputText";
import { API_ROUTES } from "@/apiRoutes";
import { toast } from "react-toastify";
import { MdClose } from "react-icons/md";
import ProtectedLayout from "@/components/ProtectedLayout";

const PostSchema = Yup.object({
  content: Yup.string()
    .trim()
    .min(10, "Post content must be at least 10 characters")
    .required("Content is required"),
});

const CreatePostPage = () => {
  const router = useRouter();

  const initialValues = {
    content: "",
  };

  const handleCreatePost = async (values: typeof initialValues) => {
    try {
      const res = await axiosInstance.post(API_ROUTES.createPost, values);
      if (res?.data?.status === "success") {
        toast.success(res?.data?.message);
        router.push("/feeds");
      }
    } catch (error: any) {
      console.error("Failed to create post");
    }
  };

  const handleClickClose = () => {
    router.push("/feeds");
  };

  return (
    <ProtectedLayout>
      <Stack
        mb={3}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <h1 className="text-2xl font-bold">Create Post</h1>
        <IconButton onClick={handleClickClose}>
          <MdClose />
        </IconButton>
      </Stack>
      <Formik
        initialValues={initialValues}
        validationSchema={PostSchema}
        onSubmit={handleCreatePost}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
        }) => (
          <Form>
            <InputText
              name="content"
              value={values.content}
              multiline
              rows={6}
              placeholder="What's on your mind?"
              onChange={handleChange}
              onBlur={handleBlur}
              errorMessage={
                errors?.content && touched?.content ? errors?.content : null
              }
            />

            <Button type="submit" variant="contained" disabled={isSubmitting}>
              {isSubmitting ? "Posting..." : "Post"}
            </Button>
          </Form>
        )}
      </Formik>
    </ProtectedLayout>
  );
};

export default CreatePostPage;
