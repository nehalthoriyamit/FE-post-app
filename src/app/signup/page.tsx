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
import { omit } from "lodash";

const SignupSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .max(25, "Name must be at most 25 characters")
    .matches(/^[A-Za-z]+$/, "Name must contain only alphabets"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .required("Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const SignupPage = () => {
  const router = useRouter();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSignup = async (values: typeof initialValues) => {
    try {
      const bodyData = omit(values, ["confirmPassword"]);
      const res = await axiosInstance.post(API_ROUTES.register, bodyData);
      if (res?.data?.status === "success") {
        toast.success("Signup successful");
        router.push("/login");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <Layout>
      <Stack alignItems="center">
        <h1 className="text-2xl font-bold mb-5">Sign Up</h1>
      </Stack>

      <Stack alignItems="center">
        <Box width={350}>
          <Formik
            initialValues={initialValues}
            validationSchema={SignupSchema}
            onSubmit={handleSignup}
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
                  label="Name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={
                    errors?.name && touched?.name ? errors?.name : null
                  }
                />

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

                <InputText
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={
                    errors?.confirmPassword && touched?.confirmPassword
                      ? errors?.confirmPassword
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
                    {isSubmitting ? "Signing up..." : "Sign Up"}
                  </Button>

                  <Box>
                    <p className="text-sm mt-2">
                      Already have an account?{" "}
                      <Link href="/login" className="text-blue-600">
                        Login
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

  // return (
  //   <Layout>
  //     <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
  //     <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSignup}>
  //       {({ isSubmitting }) => (
  //         <Form>
  //           <div className="mb-4">
  //             <Field type="email" name="email" placeholder="Email" className="input" />
  //             <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
  //           </div>
  //           <div className="mb-4">
  //             <Field type="password" name="password" placeholder="Password" className="input" />
  //             <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
  //           </div>
  //           <button type="submit" className="btn-primary" disabled={isSubmitting}>
  //             {isSubmitting ? 'Signing up...' : 'Sign Up'}
  //           </button>
  //         </Form>
  //       )}
  //     </Formik>
  //   </Layout>
  // );
};

export default SignupPage;
