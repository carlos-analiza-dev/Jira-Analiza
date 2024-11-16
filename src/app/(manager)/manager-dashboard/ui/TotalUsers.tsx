import React, { ReactElement } from "react";
import { useSelector } from "react-redux";

interface Props {
  title: string;
  total: any;
  icon: ReactElement;
}

const TotalUsers = ({ title, icon, total }: Props) => {
  const user = useSelector((state: any) => state.auth);

  return (
    <div className="bg-gray-100 w-full h-full rounded-md dark:bg-gray-800 text-custom-title dark:text-white flex justify-start shadow-md p-4">
      <div className="block">
        <div className="flex items-center justify-center p-2 h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-900">
          {icon}
        </div>

        <p className="text-3xl font-bold mt-2">{total}</p>

        <p className="text-lg mt-2">{title}</p>
      </div>
    </div>
  );
};

export default TotalUsers;
