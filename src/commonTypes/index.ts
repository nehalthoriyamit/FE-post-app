export interface UserI {
  id: string;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export interface LikePostI {
  id: string;
  userId: string;
  postId: string;
  created_at: Date;
  updated_at: Date;
}

export interface PostI {
  id: string;
  content: string;
  imageUrl: string | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  userId: string;
  userDetails: Omit<UserI, "created_at" | "updated_at" | "deleted_at">;
  likesData: LikePostI[];
  likes?: number;
}
