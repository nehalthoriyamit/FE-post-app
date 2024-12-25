"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import axiosInstance from "@/services/axiosInstance";
import Layout from "@/components/Layout";
import InputText from "@/components/InputText";
import { Box, Button, Stack } from "@mui/material";
import Link from "next/link";
import { toast } from "react-toastify";
import { API_ROUTES } from "@/apiRoutes";
import { setCookie } from "cookies-next/client";

const LoginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginPage = () => {
  const router = useRouter();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleLogin = async (values: typeof initialValues) => {
    try {
      const res = await axiosInstance.post(API_ROUTES.login, values);
      if (res?.data?.status === "success") {
        toast.success("Login successful");
        setCookie("token", res?.data?.data?.token);
        localStorage.setItem(
          "userDetails",
          JSON.stringify(res?.data?.data?.user)
        );

        router.push("/feeds");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <Layout>
      <Stack alignItems="center">
        <h1 className="text-2xl font-bold mb-5">Login</h1>
      </Stack>

      <Stack alignItems="center">
        <Box width={350}>
          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
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
                  label="Email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={
                    errors?.email && touched?.email ? errors?.email : null
                  }
                />

                <InputText
                  label="Password"
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={
                    errors?.password && touched?.password
                      ? errors?.password
                      : null
                  }
                />

                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Logging in..." : "Login"}
                  </Button>

                  <Box>
                    <p className="text-sm mt-2">
                      Don't have an account?{" "}
                      <Link href="/signup" className="text-blue-600">
                        Sign Up
                      </Link>
                    </p>
                  </Box>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Stack>
    </Layout>
  );
};

export default LoginPage;
