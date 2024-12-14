import { Card } from "@/components/ui/card";
import { UsersByEmpresa } from "@/types/user.type";
import React from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  data: UsersByEmpresa[];
}

const EmpresaUsuariosChart = ({ data }: Props) => {
  return (
    <Card className="p-4 w-full max-w-xl mx-auto text-custom-title dark:text-white">
      <h2 className="text-xl font-semibold mb-4 text-center ">
        Cantidad de usuarios por empresa
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          className="text-custom-title dark:text-black"
          layout="vertical"
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis type="number" />
          <YAxis type="category" dataKey="empresa" width={150} />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default EmpresaUsuariosChart;
