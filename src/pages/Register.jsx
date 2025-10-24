import * as Yup from "yup";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { auth } from "../../firebaseConfig";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const navigate = useNavigate();

  const RegisterSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    repassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  const handleSumbit = async (values) => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      await updateProfile(auth.currentUser, {
        displayName: values.username,
      });

      Swal.fire({
        icon: "success",
        title: "Account Created",
        text: "Your account has been created successfully",
        confirmButtonText: "OK",
      }).then(() => {
          navigate("/sign");
      })


      console.log("User created:", user);
    } catch (error) {
      console.log(error.code, error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md mx-auto p-6 border rounded-lg shadow-xl bg-white ">
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            repassword: "",
          }}
          validationSchema={RegisterSchema}
          onSubmit={handleSumbit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              {/* Username */}
              <div>
                <label htmlFor="username" className="block text-gray-700 mb-2">
                  User Name
                </label>
                <Field
                  id="username"
                  name="username"
                  placeholder="Enter your name"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Email
                </label>
                <Field
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-gray-700 mb-2">
                  Password
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Re-enter Password */}
              <div>
                <label
                  htmlFor="repassword"
                  className="block text-gray-700 mb-2"
                >
                  Re-Password
                </label>
                <Field
                  id="repassword"
                  name="repassword"
                  type="password"
                  placeholder="Re-enter your password"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2"
                />
                <ErrorMessage
                  name="repassword"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
              >
                {isSubmitting ? "Registering..." : "Register"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
