"use client";
import useAllDepartamentos from "@/api/roles/getAllDepartamentos";
import useAllSucursales from "@/api/sucursal/getSucursalesNotPagination";
import useGetUserAuth from "@/api/users/getUserAuth";
import SkeletonTable from "@/components/SkeletonTable";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { clearUser } from "@/store/auth/sessionSlice";
import { SucursalData } from "@/types/sucursal.type";
import { TableRolesData } from "@/types/table.roles.type";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import TableAuth from "./ui/TableAuth";
import { Button } from "@/components/ui/button";
import ModalExpired from "@/components/ModalExpired";

const AuthManager = () => {
  const user = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [check, setCheck] = useState(true);
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);
  const [departamento, setDepartamento] = useState("");
  const [sucursal, setSucursal] = useState("");
  const [sexo, setSexo] = useState("");
  const token = user.token;
  const pais = useSelector((state: any) => state.country.selectedCountry);
  const { loading, result, error } = useGetUserAuth(
    check,
    user.token,
    limit,
    offset,
    sucursal,
    departamento,
    sexo,
    pais
  );

  const { resultSucursal } = useAllSucursales(token, pais);
  const [sucursales, setSucursales] = useState<SucursalData[]>([]);

  const { result: rolesResult } = useAllDepartamentos(token, pais);
  const [roles, setRoles] = useState<TableRolesData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (resultSucursal) {
      setSucursales(resultSucursal);
    }
  }, [resultSucursal]);

  useEffect(() => {
    if (rolesResult) {
      setRoles(rolesResult);
    }
  }, [rolesResult]);

  useEffect(() => {
    if (error === "Request failed with status code 401") {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleCloseModal = () => {
    setShowModal(false);
    dispatch(clearUser());
    router.push("/");
  };

  useEffect(() => {
    if (result) {
      setTotalPages(Math.ceil(result.total / limit));
    }
  }, [result, limit]);

  const handleSucursalChange = (value: string) => {
    setSucursal(value === "all" ? "" : value);
  };

  const handleSexoChange = (value: string) => {
    setSexo(value === "all" ? "" : value);
  };

  const handleDepartamentoChange = (value: string) => {
    setDepartamento(value === "all" ? "" : value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setOffset((page - 1) * limit);
  };
  return (
    <div className="mx-auto px-4 md:px-12">
      <div className="mt-5 text-center mb-5">
        <p className="text-3xl font-semibold text-custom-title dark:text-white">
          Usuarios
        </p>
      </div>
      <div className="flex justify-start gap-4 mt-5 mb-5">
        <div>
          <Select onValueChange={(value) => handleSucursalChange(value)}>
            <SelectTrigger className="w-auto">
              <SelectValue placeholder="Sucursal" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sucursal</SelectLabel>
                <SelectItem value="all">Todos</SelectItem>
                {sucursales && sucursales.length > 0 ? (
                  sucursales.map((suc: SucursalData) => (
                    <SelectItem key={suc.id} value={suc.nombre}>
                      {suc.nombre}
                    </SelectItem>
                  ))
                ) : (
                  <p>No se encontraron sucursales</p>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select onValueChange={(value) => handleDepartamentoChange(value)}>
            <SelectTrigger className="w-auto">
              <SelectValue placeholder="Departamento" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Departamento</SelectLabel>
                <SelectItem value="all">Todos</SelectItem>
                {roles && roles.length > 0 ? (
                  roles.map((depto: TableRolesData) => (
                    <SelectItem key={depto.id} value={depto.nombre}>
                      {depto.nombre}
                    </SelectItem>
                  ))
                ) : (
                  <p>No se encontraron departamentos</p>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select onValueChange={(value) => handleSexoChange(value)}>
            <SelectTrigger className="w-auto">
              <SelectValue placeholder="Sexo" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sexo</SelectLabel>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="M">Masculino</SelectItem>
                <SelectItem value="F">Femenino</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div></div>
      </div>
      {loading ? (
        <SkeletonTable />
      ) : error ? (
        <div className="block mb-20">
          <div className="flex justify-center mt-10">
            <Image src="nousers.svg" alt="NotFound" width={500} height={500} />
          </div>
          <div className="mt-5">
            <p className="text-center font-bold text-custom-title text-2xl dark:text-white">
              No se encontraron usuarios disponibles para autorizar.
            </p>
          </div>
        </div>
      ) : (
        result && <TableAuth users={result} check={check} setCheck={setCheck} />
      )}
      <div className="flex justify-between mt-5">
        <Button
          className="bg-custom-title text-white dark:bg-white dark:text-custom-title font-bold"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Anterior
        </Button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <Button
          className="bg-custom-title text-white dark:bg-white dark:text-custom-title font-bold"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Siguiente
        </Button>
      </div>
      {showModal && <ModalExpired handleCloseModal={handleCloseModal} />}
    </div>
  );
};

export default AuthManager;
