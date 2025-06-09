import Icon from "@/components/Icon";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Error from "@/components/Error";
import { StoreContext } from "@/context/store";
import "./Unidades_academicas_form.css";
import client from "@/api";
//import unidadesAcademicasData from '@/assets/uacad.json';

export default function Unidades_academicas_form() {
  //essentials
  const { id } = useParams();
  const store = useContext(StoreContext);
  const navigate = useNavigate();
  const [errors, set_errors] = useState([]);
  const [unidadesOptions, setUnidadesOptions] = useState([]);
  //fields
  const [unidades_academicas, set_unidades_academicas] = useState({
    //initJSnombre_unidad_academica
    nombre_unidad_academica: "",
    //endJSnombre_unidad_academica
    //initJSid_saga
    id_saga: "",
    //endJSid_saga
    //fieldsModel
  });
  //extraStates
  //foreigns
  async function getForeigns() {
    store.setLoading(true);
    Promise.all([
      //callForeigns
    ]).finally(() => {
      store.setLoading(false);
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    var errors = [];
    //initJSnombre_unidad_academica
    if (!unidades_academicas?.nombre_unidad_academica)
      errors.push("El campo Unidad Academica es obligatorio");
    //endJSnombre_unidad_academica
    //initJSid_saga
    if (!unidades_academicas?.id_saga)
      errors.push("El campo Id Saga es obligatorio");
    //endJSid_saga
    //validaciones
    if (errors.length == 0) {
      store.setLoading(true);
      //beforeSend
      if (id) {
        client
          .put(`/unidades_academicas/update/${id}`, { unidades_academicas })
          .then((r) => {
            store.showSuccess({
              message: "Unidades academicas Actualizado",
              redirect: "/dashboard/unidades_academicas/list",
              navigate,
            });
          })
          .catch((e) => {
            const errorMessage =
              e?.response?.data?.message || "Error al Actualizar Registro";
            set_errors([errorMessage]);
            store.showErrors([errorMessage]);
          })
          .finally(() => store.setLoading(false));
      } else {
        client
          .post(`/unidades_academicas/create`, { unidades_academicas })
          .then((r) => {
            store.showSuccess({
              message: "Unidades academicas Creado",
              redirect: "/dashboard/unidades_academicas/list",
              navigate,
            });
          })
          .catch((e) => {
            const errorMessage =
              e?.response?.data?.message || "Error al Crear Registro";
            set_errors([errorMessage]);
            store.showErrors([errorMessage]);
          })
          .finally(() => store.setLoading(false));
      }
    } else {
      set_errors([errors[0]]);
      store.showErrors([errors]);
    }
  }
  //extraEffect
  useEffect(() => {
    async function fetchUnidades() {
      store.setLoading(true);
      try {
        const res = await fetch(
          "https://6842f26ee1347494c31e8c0d.mockapi.io/ucad"
        );
        const data = await res.json();
        setUnidadesOptions(data);
      } catch (err) {
        set_errors(["No se pudieron obtener las Unidades Académicas"]);
      } finally {
        store.setLoading(false);
      }
    }
    fetchUnidades();
  }, []);

  useEffect(() => {
    if (unidades_academicas.id_saga && unidadesOptions.length > 0) {
      const encontrado = unidadesOptions.find(
        (ua) => ua.idUnidadAcademica === unidades_academicas.id_saga
      );
      set_unidades_academicas((prev) => ({
        ...prev,
        nombre_unidad_academica: encontrado ? encontrado.UnidadAcademica : "",
      }));
    } else {
      set_unidades_academicas((prev) => ({
        ...prev,
        nombre_unidad_academica: "",
      }));
    }
  }, [unidades_academicas.id_saga, unidadesOptions]);

  return (
    <>
      <div className="px-2 py-1 sm:py-2 xl:py-4">
        <div className="bg-gray-50 px-1  py-0.5 sm:py-0.5 2xl:py-1  sm:flex flex flex-wrap-reverse sm:items-center w-full">
          <div className="sm:flex-auto">
            <h1 className="ttext-balance 2xl:text-xl sm:text-lg text-sm  mt-2 sm:mt-0 font-semibold text-gray-900 uppercase">
              {id
                ? "EDITAR Unidades academicas"
                : "REGISTRAR Unidades academicas"}
            </h1>
          </div>
          <div className="ml-8 sm:ml-0 flex-none">
            <Link
              to="../unidades_academicas/list"
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-gray-300 shadow-sm bg-transparent 2xl:px-6 px-4 py-2 text-sm font-medium text-black shadow-sm hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
            >
              <Icon
                name="ArrowLeftCircleIcon"
                className="2xl:h-6 2xl:w-6 sm:mr-4 mr-1 sm:h-5 sm:w-5 h-4 w-4"
              />
              Atras
            </Link>
          </div>
        </div>
        <div className="sm:mt-3 2xl:mt-4 mt-1 bg-gray-50 rounded-lg border border-gray-200">
          <Error title="Error en el Formulario" errors={errors} />
          <form
            onSubmit={handleSubmit}
            className="space-y-8 divide-y divide-gray-200"
          >
            <div className="px-4 py-4">
              <div className="grid 2xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 2xl:gap-4 sm:gap-2 gap-1">
                {/* initJSXnombre_unidad_academica */}
                <div className="">
                  <label
                    htmlFor="nombre_unidad_academica"
                    className="block font-medium text-black 2xl:text-sm text-xs"
                  >
                    Unidad Academica
                  </label>
                  <input
                    type="text"
                    name="nombre_unidad_academica"
                    value={unidades_academicas?.nombre_unidad_academica}
                    onChange={(e) =>
                      set_unidades_academicas({
                        ...unidades_academicas,
                        nombre_unidad_academica: e.target.value,
                      })
                    }
                    readOnly
                    className="focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md uppercase"
                  />
                </div>
                {/* endJSXnombre_unidad_academica */}
                {/* initJSXid_saga */}
                <div className="">
                  <label
                    htmlFor="id_saga"
                    className="block font-medium text-black 2xl:text-sm text-xs"
                  >
                    Id Saga
                  </label>
                  <input
                    type="text"
                    name="id_saga"
                    value={unidades_academicas?.id_saga}
                    onChange={(e) =>
                      set_unidades_academicas({
                        ...unidades_academicas,
                        id_saga: e.target.value,
                      })
                    }
                    required
                    className="focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md "
                  />
                </div>
                {/* endJSXid_saga */}
                {/* inputFields */}
              </div>
            </div>
            <div className="p-2">
              <div className="flex justify-end">
                <Link
                  to="../user/list"
                  className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Cancelar
                </Link>
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Aceptar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
