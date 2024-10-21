"use client";
import useAllUsers from "@/api/getAllUsers";
import { ResponseData } from "@/types/response.type";
import TableUsers from "./ui/TableUsers";
import SkeletonTable from "@/components/SkeletonTable";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { clearUser } from "@/store/auth/sessionSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SucursalData } from "@/types/sucursal.type";
import useAllSucursales from "@/api/getSucursalesNotPagination";
import { Search } from "lucide-react";
import useGetAllUsuarios from "@/api/getAllUsuarios";

export default function UsersPage() {
  const user = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const [check, setCheck] = useState(true);
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);
  const [sexo, setSexo] = useState("");
  const [sucursal, setSucursal] = useState("");
  const [correo, setCorreo] = useState("");
  const [searchCorreo, setSearchCorreo] = useState("");
  const token = user.token;

  const { result, loading, error }: ResponseData = useAllUsers(
    check,
    user.token,
    limit,
    offset,
    sexo,
    sucursal,
    correo
  );
  const { result: resultBusqueda } = useGetAllUsuarios(user.token);
  const [sucursales, setSucursales] = useState<SucursalData[]>([]);
  const { resultSucursal } = useAllSucursales(token);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  useEffect(() => {
    if (error === "Request failed with status code 401") {
      dispatch(clearUser());
      router.push("/");
    }
  }, [error, dispatch, router]);

  useEffect(() => {
    if (result) {
      setTotalPages(Math.ceil(result.total / limit));
    }
  }, [result, limit]);

  useEffect(() => {
    if (resultSucursal) {
      setSucursales(resultSucursal ?? []);
    }
  }, [resultSucursal]);

  useEffect(() => {
    if (searchCorreo && resultBusqueda) {
      const filteredSuggestions = resultBusqueda
        .map((user: any) => user.correo)
        .filter((correo: string) =>
          correo.toLowerCase().includes(searchCorreo.toLowerCase())
        );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchCorreo, result]);

  const handleSearch = () => {
    if (highlightedIndex !== -1) {
      setSearchCorreo(suggestions[highlightedIndex]);
    }
    setCorreo(searchCorreo);
    setSuggestions([]);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (e.key === "Enter") {
      if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
        setSearchCorreo(suggestions[highlightedIndex]);
        setSuggestions([]);
        setHighlightedIndex(-1);
      } else {
        handleSearch();
      }
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setOffset((page - 1) * limit);
  };

  const handleSexoChange = (value: string) => {
    setSexo(value === "all" ? "" : value);
  };

  const handleSucursalChange = (value: string) => {
    setSucursal(value === "all" ? "" : value);
  };

  function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  }

  const debouncedSearchCorreo = useDebounce(searchCorreo, 300);

  useEffect(() => {}, [debouncedSearchCorreo, result]);

  return (
    <div className="mx-auto px-4 md:px-12">
      <div className="mt-5 text-center mb-5">
        <p className="text-3xl font-semibold text-custom-title dark:text-white">
          Usuarios
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 mt-5 gap-5 mb-5">
        <div className="col-span-1 flex justify-center gap-3">
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
          <Select onValueChange={(value) => handleSucursalChange(value)}>
            <SelectTrigger className="w-auto">
              <SelectValue placeholder="Sucursal" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sucursal</SelectLabel>
                <SelectItem value="all">Todas</SelectItem>
                {sucursales && sucursales.length > 0 ? (
                  sucursales.map((sucursal: SucursalData) => (
                    <SelectItem key={sucursal.id} value={sucursal.nombre}>
                      {sucursal.nombre}
                    </SelectItem>
                  ))
                ) : (
                  <p>No hay sucursales disponibles</p>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-2 flex justify-center items-center">
          <div className="w-full">
            <div className="relative">
              <input
                onChange={(e) => setSearchCorreo(e.target.value)}
                type="text"
                placeholder="Buscar correo electronico ..."
                className="p-3 rounded-sm border border-custom-title w-full"
                value={searchCorreo}
                onKeyDown={handleKeyDown}
              />
              <Search
                onClick={handleSearch}
                size={25}
                className="absolute text-custom-title dark:text-white top-1/2 -translate-y-3 transform right-1 cursor-pointer"
              />
              {suggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1">
                  {suggestions.map((correo, index) => (
                    <li
                      key={index}
                      className={`p-2 cursor-pointer ${
                        index === highlightedIndex
                          ? "bg-gray-200"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => {
                        setSearchCorreo(correo);
                        setSuggestions([]);
                      }}
                    >
                      {correo}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      {loading ? (
        <SkeletonTable />
      ) : error ? (
        <div className="flex justify-center">
          <p className="text-red-500 text-3xl font-bold mt-10">
            No se encontraron usuarios disponibles
          </p>
        </div>
      ) : (
        <div className="px-3 mx-auto">
          <TableUsers users={result.data} check={check} setCheck={setCheck} />
        </div>
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
    </div>
  );
}
