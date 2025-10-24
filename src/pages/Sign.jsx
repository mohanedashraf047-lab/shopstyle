import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { auth } from "../../firebaseConfig";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/productSlice";
import { ErrorMessage, Field, Form, Formik } from "formik";

const Sign = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const SignSchema = Yup.object().shape({
    email: Yup.string()
      .email("بريد الكتروني غير صحيح")
      .required("الايميل مطلوب"),
    password: Yup.string().required("Required"),
  });

  const handleSumbit = async (values, { setSubmitting, resetForm }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      const user = userCredential.user;

      // dispatch user to store in redux
      dispatch(
        setUser({
          userName: user.displayName,
          email: user.email,
        })
      );
      Swal.fire({
        icon: "success",
        title: "تم تسجيل الدخول بنجاح",
        timer: 1500,
        showConfirmButton: true,
      });
      resetForm();

      setTimeout(() => navigate("/"), 500);
    } catch (error) {
      // catch error
      console.log(error.code, error.message);

      Swal.fire({
        icon: "error",
        title: "فشل تسجيل الدخول",
        text: "يرجى التحقق من البريد الالكتروني وكلمة المرور",
        showConfirmButton: true,
      });

      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-[30%] max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          تسجيل الدخول
        </h2>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={SignSchema}
          onSubmit={handleSumbit}
        >
          {({ isSubmitting }) => (
            <Form>
              {/* email */}
              <div className="space-y-5">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                >
                  البريد الالكتروني
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="أدخل البريد الالكتروني"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:right-2"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* password */}
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-medium mb-2"
                >
                  كلمة المرور
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="أدخل كلمة المرور"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="password"
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
                {isSubmitting ? "Loading..." : "Register"}
              </button>
            </Form>
          )}
        </Formik>

        <p className="text-center mt-4 text-gray-600">
          ليس لديك حساب؟{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            انشاء حساب
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Sign;
