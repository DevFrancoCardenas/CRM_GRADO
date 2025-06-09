//initJSunidad_academica
import Select from "@/components/Select1";
//endJSunidad_academica
import Icon from "@/components/Icon";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Error from "@/components/Error";
import { StoreContext } from "@/context/store";
import "./Carreras_form.css";
import client from "@/api";
//import unidadesAcademicasData from "@/assets/uacad.json";

export default function Carreras_form() {
  //essentials
  
  const { id } = useParams();
  const store = useContext(StoreContext);
  const navigate = useNavigate();
  const [errors, set_errors] = useState([]);
  //fields

  const [carreras, set_carreras] = useState({
    //initJSunidad_academica
    unidad_academica: "",
    //endJSunidad_academica
    //initJSnombre_carrera
    nombre_carrera: "",
    //endJSnombre_carrera
    //initJSid_saga_carrera
    id_saga_carrera: "",
    //endJSid_saga_carrera
    //fieldsModel
  });
  const [apiData, setApiData] = useState([]);

  //extraStates
  //initJSunidad_academica
  const [unidades_academicas_list, set_unidades_academicas_list] = useState([]);
  //endJSunidad_academica
  //foreigns
  async function getForeigns() {
    store.setLoading(true);
    Promise.all([
      client.post("/unidades_academicas/list").then((r) => {
        set_unidades_academicas_list(r?.data?.list || []);
        // 👇 Agrega este log justo aquí:
        console.log("Opciones unidad académica:", r?.data?.list || []);
      }),
    ]).finally(() => {
      store.setLoading(false);
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    var errors = [];
    //initJSunidad_academica
    if (!carreras?.unidad_academica)
      errors.push("El campo Unidad Academica es obligatorio");
    //endJSunidad_academica
    //initJSnombre_carrera
    if (!carreras?.nombre_carrera)
      errors.push("El campo Carrera es obligatorio");
    //endJSnombre_carrera
    //initJSid_saga_carrera
    if (!carreras?.id_saga_carrera)
      errors.push("El campo Id Saga es obligatorio");
    //endJSid_saga_carrera
    //validaciones
    if (errors.length == 0) {
      store.setLoading(true);
      //beforeSend
      if (id) {
        client
          .put(`/carreras/update/${id}`, { carreras })
          .then((r) => {
            store.showSuccess({
              message: "Carreras Actualizado",
              redirect: "/dashboard/carreras/list",
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
          .post(`/carreras/create`, { carreras })
          .then((r) => {
            store.showSuccess({
              message: "Carreras Creado",
              redirect: "/dashboard/carreras/list",
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
  // Al cargar el formulario, llama al backend:
  useEffect(() => {
    getForeigns();
  }, []);

useEffect(() => {
  fetch("https://6842f26ee1347494c31e8c0d.mockapi.io/ucad")
    .then((res) => res.json())
    .then((data) => setApiData(data));
}, []);


  useEffect(() => {
  // Solo ejecutar si ambos campos tienen valor
  if (carreras.unidad_academica && carreras.id_saga_carrera) {
    // 1. Busca el nombre de la unidad académica seleccionada
    const uaSeleccionada = unidades_academicas_list.find(
      (ua) => ua._id === carreras.unidad_academica
    );

    // 2. Busca el id saga real (idUnidadAcademica) relacionado a la unidad
    const idUnidadApi = uaSeleccionada?.id_saga; // O el campo que conecte tu select con la API

    // 3. Busca en la data de la API el registro correcto
    const encontrada = apiData.find(
      (item) =>
        item.idUnidadAcademica === idUnidadApi &&
        item.idEspecialidad === carreras.id_saga_carrera
    );

    set_carreras((prev) => ({
      ...prev,
      nombre_carrera: encontrada ? encontrada.Especialidad : "",
    }));
  } else {
    set_carreras((prev) => ({
      ...prev,
      nombre_carrera: "",
    }));
  }
}, [carreras.unidad_academica, carreras.id_saga_carrera, unidades_academicas_list, apiData]);


  return (
    <>
      <div className="px-2 py-1 sm:py-2 xl:py-4">
        <div className="bg-gray-50 px-1  py-0.5 sm:py-0.5 2xl:py-1  sm:flex flex flex-wrap-reverse sm:items-center w-full">
          <div className="sm:flex-auto">
            <h1 className="ttext-balance 2xl:text-xl sm:text-lg text-sm  mt-2 sm:mt-0 font-semibold text-gray-900 uppercase">
              {id ? "EDITAR Carreras" : "REGISTRAR Carreras"}
            </h1>
          </div>
          <div className="ml-8 sm:ml-0 flex-none">
            <Link
              to="../carreras/list"
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
                {/* initJSXunidad_academica */}
                <div className="col-span-1">
                  <div className="col-span-1">
                    <label className="block font-medium text-black 2xl:text-sm text-xs mb-1">
                      Seleccionar Unidad Académica
                    </label>

                    <select
                      name="unidad_academica"
                      value={carreras.unidad_academica}
                      onChange={(e) =>
                        set_carreras({
                          ...carreras,
                          unidad_academica: e.target.value,
                        })
                      }
                      className="block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md uppercase"
                      required
                    >
                      <option value="">
                        -- Selecciona Unidad Academica --
                      </option>
                      {unidades_academicas_list.map((ua) => (
                        <option key={ua._id} value={ua._id}>
                          {ua.nombre_unidad_academica}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* endJSXunidad_academica */}
                {/* initJSXnombre_carrera */}
                <div className="">
                  <label
                    htmlFor="nombre_carrera"
                    className="block font-medium text-black 2xl:text-sm text-xs"
                  >
                    Carrera
                  </label>
                  <input
                    type="text"
                    name="nombre_carrera"
                    value={carreras?.nombre_carrera}
                    readOnly
                    className="focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md uppercase"
                  />
                </div>
                {/* endJSXnombre_carrera */}
                {/* initJSXid_saga_carrera */}
                <div className="">
                  <label
                    htmlFor="id_saga_carrera"
                    className="block font-medium text-black 2xl:text-sm text-xs"
                  >
                    Id Saga
                  </label>
                  <input
                    type="text"
                    name="id_saga_carrera"
                    value={carreras?.id_saga_carrera}
                    onChange={(e) =>
                      set_carreras({
                        ...carreras,
                        id_saga_carrera: e.target.value,
                      })
                    }
                    required
                    className="focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md "
                  />
                </div>
                {/* endJSXid_saga_carrera */}
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
