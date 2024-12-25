import { UserI } from "@/commonTypes";
import { clearCookies } from "@/services/cookieService";
import { Avatar, Button, Stack, Typography } from "@mui/material";
import { head, toString, toUpper } from "lodash";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface ProtectedLayoutProps {
  children: ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  const router = useRouter();

  const [userDetails, setUserDetails] = useState<UserI | null>(null);

  useEffect(() => {
    const storedUserDetails = localStorage.getItem("userDetails");

    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
    }
  }, []);

  const handleLogout = () => {
    clearCookies();
    localStorage.removeItem("userDetails");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-300 flex flex-col">
      <div className="h-16 bg-white flex items-center justify-between p-4 px-6">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="start"
          gap={2}
        >
          <Avatar className="bg-green-900 h-8 w-8">
            {toUpper(head(toString(userDetails?.name)))}
          </Avatar>
          <Typography variant="subtitle1" component="span">
            {userDetails?.name}
          </Typography>
        </Stack>

        <Button variant="text" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <div className="h-[calc(100vh-4rem)] overflow-auto flex justify-center p-4">
        <div className="max-w-3xl w-full">
          <div className="bg-white shadow-lg rounded-lg p-6 mb-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProtectedLayout;
