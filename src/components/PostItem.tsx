import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { AiFillLike } from "react-icons/ai";
import { head, toString, toUpper } from "lodash";
import { formatDate } from "@/utils/commonFunc";
import { useEffect, useMemo, useState } from "react";
import { PostI } from "@/commonTypes";

interface PostItemProps {
  postDetails: PostI;
  handlePostLike: (postId: string) => void;
}

const PostItem = (props: PostItemProps) => {
  const { postDetails, handlePostLike } = props;

  const [hasLiked, setHasLiked] = useState(false);

  const firstCharOfName = toUpper(
    head(toString(postDetails?.userDetails?.name))
  );
  const totalLikes = useMemo(
    () => postDetails?.likesData?.length || 0,
    [postDetails]
  );

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails") || "{}");
    const userId = userDetails?.id;

    // Check if the userId is in likesData
    const liked = postDetails?.likesData?.some(
      (like) => like?.userId === userId
    );

    setHasLiked(liked);
  }, [postDetails]);

  return (
    <Box p={2} pb={0} mb={3} className="border-2 border-grey-200 rounded-md">
      <Stack
        pb={1}
        direction="row"
        alignItems="center"
        justifyContent="start"
        gap={2}
        className="border-b-2 border-grey-300"
      >
        <Avatar sx={{ bgcolor: deepOrange[500], width: 32, height: 32 }}>
          {firstCharOfName}
        </Avatar>
        <Stack direction="column">
          <Typography variant="subtitle1" component="span">
            {postDetails?.userDetails?.name}
          </Typography>
          <Typography
            variant="caption"
            component="span"
            className="text-gray-500"
          >
            {formatDate(postDetails?.created_at).toLocaleString()}
          </Typography>
        </Stack>
      </Stack>

      <Box p={2} className="border-b-2 border-grey-300">
        <Typography variant="body1" component="p" className="text-sm">
          {postDetails?.content}
        </Typography>
      </Box>

      <Button
        variant="text"
        startIcon={<AiFillLike size={16} />}
        onClick={() => handlePostLike(postDetails?.id)}
        className={`text-gray-700 ${
          hasLiked ? "!text-blue-600" : "text-gray-700 hover:text-gray-900"
        }`}
      >
        Like {totalLikes > 0 ? `(${totalLikes})` : null}
      </Button>
    </Box>
  );
};
export default PostItem;
