"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/services/axiosInstance";
import { Box, Button, Stack, Typography } from "@mui/material";
import { BsPlus } from "react-icons/bs";
import PostItem from "@/components/PostItem";
import { API_ROUTES } from "@/apiRoutes";
import { PostI } from "@/commonTypes";
import ProtectedLayout from "@/components/ProtectedLayout";
import { isEmpty } from "lodash";

const FeedPage = () => {
  const router = useRouter();

  const [posts, setPosts] = useState<PostI[]>([]);
  const [showLoader, setShowLoader] = useState(false);
  // const [isButtonVisible, setIsButtonVisible] = useState(false);

  // // Function to handle scroll events
  // const handleScroll = () => {
  //   const scrollPosition = window.scrollY + window.innerHeight;
  //   const documentHeight = document.documentElement.scrollHeight;
  //   if (scrollPosition >= documentHeight - 100) {
  //     setIsButtonVisible(true);
  //   } else {
  //     setIsButtonVisible(false);
  //   }
  // };

  // // Attach scroll event to window on mount and clean up on unmount
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     window.addEventListener("scroll", handleScroll);
  //     // Cleanup the event listener
  //     return () => {
  //       window.removeEventListener("scroll", handleScroll);
  //     };
  //   }
  // }, []);

  // const handleButtonClick = () => {
  //   setIsButtonVisible(false);
  // };

  const fetchPosts = async () => {
    try {
      const res = await axiosInstance.get(API_ROUTES.getPosts);
      if (res?.data?.status === "success") {
        setPosts(res?.data?.data?.posts);
      }
    } catch (error) {
      console.log("Failed to fetch posts");
    } finally {
      setShowLoader(false);
    }
  };

  useEffect(() => {
    setShowLoader(true);
    fetchPosts();
  }, []);

  const handlePostLike = async (id: string) => {
    try {
      const bodyData = {
        postId: id,
      };
      const res = await axiosInstance.post(API_ROUTES.postLike, bodyData);
      if (res?.data?.status === "success") {
        const postDetails = res?.data?.data?.post;
        const updatedPosts = posts?.map((post) =>
          post?.id === postDetails?.id ? postDetails : post
        );
        setPosts(updatedPosts);
      }
    } catch (error) {
      console.log("Failed to like post");
    }
  };

  const handleClickAddPost = () => {
    router.push("/create-post");
  };

  return (
    <ProtectedLayout>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <h1 className="text-2xl font-bold">Feeds</h1>
        <Button
          variant="outlined"
          startIcon={<BsPlus />}
          onClick={handleClickAddPost}
        >
          Add Post
        </Button>
      </Stack>

      <Box pt={4} key={"post-list"}>
        {showLoader ? (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            py={5}
          >
            <Typography
              variant="body1"
              component="span"
              className="text-gray-600"
            >
              Loading posts...
            </Typography>
          </Stack>
        ) : isEmpty(posts) ? (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            py={5}
          >
            <Typography
              variant="body1"
              component="span"
              className="text-gray-600"
            >
              No posts found
            </Typography>
          </Stack>
        ) : (
          <>
            {posts?.map((post) => (
              <PostItem
                key={post?.id}
                postDetails={post}
                handlePostLike={handlePostLike}
              />
            ))}
          </>
        )}
      </Box>

      {/* {isButtonVisible && (
        <Button
          onClick={handleButtonClick}
          variant="contained"
          className="fixed bottom-5 right-5 bg-blue-500 text-white p-3 rounded-full"
        >
          Load more posts
        </Button>
      )} */}
    </ProtectedLayout>
  );
};

export default FeedPage;
