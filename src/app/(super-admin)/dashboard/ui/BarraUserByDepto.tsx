import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { UsersByRolPais } from "@/types/user.type";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: UsersByRolPais[] | null; // Especificamos que data puede ser null
}

const BarraUserByDepto = ({ data }: Props) => {
  // Verificamos si data es null o vacía
  if (!data || data.length === 0) {
    return (
      <Card className="w-full mt-5">
        <CardHeader>
          <CardTitle className="text-xl text-custom-title dark:text-white">
            Usuarios por departamento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>No se encontraron usuarios en los departamentos.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full h-full mt-5">
      <CardHeader>
        <CardTitle className="text-xl text-custom-title dark:text-white">
          Usuarios por departamento
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="role" />
            <YAxis />
            <Tooltip
              formatter={(value, name, props) => {
                return [`${value} - ${props.payload.role}`, name];
              }}
            />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default BarraUserByDepto;
