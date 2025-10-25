import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserInfo } from "../Redux/productSlice";
import Swal from "sweetalert2";
import { auth, db } from "../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

const UserInfo = () => {
  const userInfo = useSelector((state) => state.products.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phone: "",
    address: "",
  });

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/sign"); // redirect if not logged in
      } else {
        setFormData({
          userName: userInfo?.userName || "",
          email: userInfo?.email || user.email || "",
          phone: userInfo?.phone || "",
          address: userInfo?.address || "",
        });
      }
    });

    return () => unsubscribe();
  }, [userInfo, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const currentUser = auth.currentUser;
    if (!currentUser) {
      Swal.fire("خطأ", "لم يتم تسجيل الدخول", "error");
      return;
    }

    try {
      // ✅ Clean data before saving
      const cleanData = Object.fromEntries(
        Object.entries(formData).filter(([, v]) => v !== undefined)
      );

      // ✅ Create or update Firestore document
      const userRef = doc(db, "users", currentUser.uid);
      await setDoc(userRef, cleanData, { merge: true });

      // ✅ Update Redux
      dispatch(updateUserInfo(cleanData));

      await Swal.fire({
        icon: "success",
        title: "تم تحديث البيانات!",
        text: "سيتم توجيهك إلى الصفحة الرئيسية...",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (error) {
      console.error("Firestore write error:", error);
      Swal.fire("حدث خطأ أثناء التحديث", error.message, "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          معلومات المستخدم
        </h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1">الاسم</label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">رقم الهاتف</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">العنوان</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            تحديث المعلومات
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserInfo;
