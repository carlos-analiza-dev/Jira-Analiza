"use client";
import { useEffect, useState } from "react";
import ChartActivos from "./ui/ChartActivos";
import ChartBarras from "./ui/ChartBarras";
import ChartPastel from "./ui/ChartPastel";
import ChartUsuarios from "./ui/ChartUsuarios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { clearUser } from "@/store/auth/sessionSlice";
import { useRouter } from "next/navigation";
import ModalExpired from "@/components/ModalExpired";

export default function DashBoardPage() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const user = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user && !user.token) {
      setShowModal(true);
    }
  }, [dispatch]);

  const handleCloseModal = () => {
    setShowModal(false);
    dispatch(clearUser());
    router.push("/");
  };

  return (
    <div className=" mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="mt-4 w-full">
          <ChartBarras />
        </div>
        <div className="mt-4 w-full">
          {" "}
          <ChartUsuarios />
        </div>
        <div className="mt-4 w-full">
          {" "}
          <ChartPastel />
        </div>
        <div className="mt-4 w-full">
          <ChartActivos />
        </div>
      </div>
      {showModal && <ModalExpired handleCloseModal={handleCloseModal} />}
    </div>
  );
}
