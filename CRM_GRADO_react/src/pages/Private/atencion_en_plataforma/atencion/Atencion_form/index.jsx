//initJScomo_te_enteraste_emi
import MultiCheckbox from "@/components/Multicheckbox";
//endJScomo_te_enteraste_emi
//initJSunidad_academica
import Select from "@/components/Select1";
//endJSunidad_academica
import Icon from "@/components/Icon";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Error from "@/components/Error";
import { StoreContext } from "@/context/store";
import "./Atencion_form.css";
import client from "@/api";
export default function Atencion_form() {
  //essentials
  const { id } = useParams();
  const store = useContext(StoreContext);
  const navigate = useNavigate();
  const [errors, set_errors] = useState([]);
  //fields
  const [atencion, set_atencion] = useState({
    //initJSfecha_atencion
    fecha_atencion: new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000
    )
      .toISOString()
      .slice(0, 16),
    //endJSfecha_atencion
    //initJSnombres
    nombres: "",
    //endJSnombres
    //initJSapellido_paterno
    apellido_paterno: "",
    //endJSapellido_paterno
    //initJSapellido_materno
    apellido_materno: "",
    //endJSapellido_materno
    //initJScarnet_identidad
    carnet_identidad: "",
    //endJScarnet_identidad
    //initJSnumero_celular
    numero_celular: "",
    //endJSnumero_celular
    //initJSnombre_tutor
    nombre_tutor: "",
    //endJSnombre_tutor
    //initJSapellido_materno_tutor
    apellido_materno_tutor: "",
    //endJSapellido_materno_tutor
    //initJSapellido_paterno_tutor
    apellido_paterno_tutor: "",
    //endJSapellido_paterno_tutor
    //initJSnumero_celular_tutor
    numero_celular_tutor: "",
    //endJSnumero_celular_tutor
    //initJSunidad_academica
    unidad_academica: "",
    //endJSunidad_academica
    //initJSotras_carreras
    otras_carreras: "",
    //endJSotras_carreras
    //initJSgestion_bachiller
    gestion_bachiller: "",
    //endJSgestion_bachiller
    //initJScolegio
    colegio: "",
    //endJScolegio
    //initJStipo_colegio
    tipo_colegio: "",
    //endJStipo_colegio
    //initJSprovincia
    provincia: "",
    //endJSprovincia
    //initJScomo_te_enteraste_emi
    como_te_enteraste_emi: "",
    //endJScomo_te_enteraste_emi
    //initJSotro_metodo_capatacion
    otro_metodo_capatacion: "",
    //endJSotro_metodo_capatacion
    //initJShora_clase
    hora_clase: "",
    //endJShora_clase
    //initJSobservacion
    observacion: "",
    //endJSobservacion
    //initJSestado
    estado: "ATENDIDO",
    //endJSestado
    //initJSasesor
    asesor: "",
    //endJSasesor
    //initJSdepartamento
    departamento: "",
    //endJSdepartamento
    //initJScarreras
    carreras: "",
    //endJScarreras
    //initJSnombre_completo
    nombre_completo: "",
    //endJSnombre_completo
    //fieldsModel
  });
  //extraStates
  const [apiData, setApiData] = useState([]);
  //initJSunidad_academica
  const [unidades_academicas_list, set_unidades_academicas_list] = useState([]);
  //endJSunidad_academica
  //initJSasesor
  const [user_list, set_user_list] = useState([]);
  //endJSasesor
  const [originalUnidadesBD, set_originalUnidadesBD] = useState([]);
  //initJScarreras
  const [carreras_list, set_carreras_list] = useState([]);
  //endJScarreras
  //foreigns
  async function getForeigns() {
    store.setLoading(true);
    Promise.all([
      //initJSunidad_academica
      client
        .post("/unidades_academicas/list")
        .then((r) => set_unidades_academicas_list(r?.data?.list || [])),
      //endJSunidad_academica
      //initJSasesor
      client.post("/user/list").then((r) => set_user_list(r?.data?.list || [])),
      //endJSasesor
      //initJScarreras
      client
        .post("/carreras/list")
        .then((r) => set_carreras_list(r?.data?.list || [])),
      //endJScarreras
      //callForeigns
    ]).finally(() => {
      store.setLoading(false);
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    var errors = [];
    //initJSfecha_atencion
    if (!atencion?.fecha_atencion)
      errors.push("El campo Fecha de Atencion es obligatorio");
    //endJSfecha_atencion
    //initJSnombres
    if (!atencion?.nombres) errors.push("El campo Nombres es obligatorio");
    //endJSnombres
    //initJSnumero_celular
    if (!atencion?.numero_celular)
      errors.push("El campo Numero de celular es obligatorio");
    //endJSnumero_celular
    //initJSapellido_materno_tutor
    if (!atencion?.apellido_materno_tutor)
      errors.push("El campo Apellido Materno Tutor es obligatorio");
    //endJSapellido_materno_tutor
    //initJSunidad_academica
    if (!atencion?.unidad_academica)
      errors.push("El campo Unidad Academica es obligatorio");
    //endJSunidad_academica
    //initJSgestion_bachiller
    if (!atencion?.gestion_bachiller)
      errors.push("El campo Gestion Bachiller es obligatorio");
    //endJSgestion_bachiller
    //initJScolegio
    if (!atencion?.colegio) errors.push("El campo Colegio es obligatorio");
    //endJScolegio
    //initJStipo_colegio
    if (!atencion?.tipo_colegio)
      errors.push("El campo Tipo Colegio es obligatorio");
    //endJStipo_colegio
    //initJSprovincia
    if (!atencion?.provincia) errors.push("El campo Provincia es obligatorio");
    //endJSprovincia
    //initJScomo_te_enteraste_emi
    if (!atencion?.como_te_enteraste_emi.length)
      errors.push("El campo ¿Como te Enteraste de Nosotros? es obligatorio");
    //endJScomo_te_enteraste_emi
    //initJShora_clase
    if (!atencion?.hora_clase)
      errors.push("El campo Hr. de Clases es obligatorio");
    //endJShora_clase
    //initJSobservacion
    if (!atencion?.observacion)
      errors.push("El campo Observacion es obligatorio");
    //endJSobservacion
    //initJSestado
    if (!atencion?.estado) errors.push("El campo Estado es obligatorio");
    //endJSestado
    //initJSasesor
    if (!atencion?.asesor) errors.push("El campo Asesor es obligatorio");
    //endJSasesor
    //validaciones
    if (errors.length == 0) {
      store.setLoading(true);
      //beforeSend
      if (id) {
        client
          .put(`/atencion/update/${id}`, { atencion })
          .then((r) => {
            store.showSuccess({
              message: "Atencion Actualizado",
              redirect: "/dashboard/atencion/list",
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
          .post(`/atencion/create`, { atencion })
          .then((r) => {
            store.showSuccess({
              message: "Atencion Creado",
              redirect: "/dashboard/atencion/list",
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

  // UNIDADES ACADÉMICAS DESDE TU BD
  useEffect(() => {
    client.post("/unidades_academicas/list").then((r) => {
      set_unidades_academicas_list(r?.data?.list || []);
    });
  }, []);

  //extraEffect
  // 1. Cargar TODOS los datos desde la API pública al iniciar el componente
  useEffect(() => {
    fetch("https://6842f26ee1347494c31e8c0d.mockapi.io/ucad")
      .then((res) => res.json())
      .then((data) => setApiData(data));
  }, []);

  // 2. Armar la lista única de unidades académicas
  /*useEffect(() => {
  if (apiData.length > 0) {
    const unidades = Array.from(
      new Set(apiData.map(item => item.UnidadAcademica))
    );
    set_unidades_academicas_list(unidades); // Solo nombres (strings)
  }
}, [apiData]);*/

  // 1. useEffect que carga unidades desde tu backend
  useEffect(() => {
    client.post("/unidades_academicas/list").then((r) => {
      // Solo guarda los nombres (strings) en el estado para el Select
      const arr = r?.data?.list?.map((ua) => ua.nombre_unidad_academica) || [];
      set_unidades_academicas_list(arr);
      // Si necesitas guardar el array completo para otros usos (ejemplo, para el id_saga), guárdalo también:
      set_originalUnidadesBD(r?.data?.list || []);
    });
  }, []);

  useEffect(() => {
    if (
      atencion.unidad_academica &&
      originalUnidadesBD.length &&
      apiData.length
    ) {
      // Busca la unidad por nombre en el array original de la BD para obtener el id_saga
      const unidadBD = originalUnidadesBD.find(
        (u) => u.nombre_unidad_academica === atencion.unidad_academica
      );
      if (unidadBD) {
        const carreras = apiData
          .filter((item) => item.idUnidadAcademica === unidadBD.id_saga)
          .map((item) => item.Especialidad);
        set_carreras_list(carreras);
        set_atencion((prev) => ({ ...prev, carreras: "" }));
      } else {
        set_carreras_list([]);
        set_atencion((prev) => ({ ...prev, carreras: "" }));
      }
    } else {
      set_carreras_list([]);
      set_atencion((prev) => ({ ...prev, carreras: "" }));
    }
  }, [atencion.unidad_academica, apiData, originalUnidadesBD]);

  return (
    <>
      <div className="px-2 py-1 sm:py-2 xl:py-4">
        <div className="bg-gray-50 px-1  py-0.5 sm:py-0.5 2xl:py-1  sm:flex flex flex-wrap-reverse sm:items-center w-full">
          <div className="sm:flex-auto">
            <h1 className="ttext-balance 2xl:text-xl sm:text-lg text-sm  mt-2 sm:mt-0 font-semibold text-gray-900 uppercase">
              {id ? "EDITAR Atencion" : "REGISTRAR Atencion"}
            </h1>
            <h6>(*) CAMPO OBLIGATORIO</h6>
          </div>
          <div className="ml-8 sm:ml-0 flex-none">
            <Link
              to="../atencion/list"
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
                  <Select
                    label="Seleccionar Unidad Academica *"
                    options={unidades_academicas_list}
                    value={atencion.unidad_academica}
                    setValue={(e) =>
                      set_atencion({ ...atencion, unidad_academica: e })
                    }
                  />
                </div>
                {/* endJSXunidad_academica */}
                {/* initJSXnombres */}
                <div className="">
                  <label
                    htmlFor="nombres"
                    className="block font-medium text-black 2xl:text-sm text-xs"
                  >
                    Nombres *
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Icon
                        name="UserIcon"
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      type="text"
                      name="nombres"
                      value={atencion?.nombres}
                      onChange={(e) =>
                        set_atencion({ ...atencion, nombres: e.target.value })
                      }
                      required
                      className="pl-10 focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md uppercase"
                    />
                  </div>
                </div>
                {/* endJSXnombres */}
                {/* initJSXapellido_paterno */}
                <div className="">
                  <label
                    htmlFor="apellido_paterno"
                    className="block font-medium text-black 2xl:text-sm text-xs"
                  >
                    Apellido Paterno *
                  </label>
                  <input
                    type="text"
                    name="apellido_paterno"
                    value={atencion?.apellido_paterno}
                    onChange={(e) =>
                      set_atencion({
                        ...atencion,
                        apellido_paterno: e.target.value,
                      })
                    }
                    className="focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md uppercase"
                  />
                </div>
                {/* endJSXapellido_paterno */}
                {/* initJSXapellido_materno */}
                <div className="">
                  <label
                    htmlFor="apellido_materno"
                    className="block font-medium text-black 2xl:text-sm text-xs"
                  >
                    Apellido Materno
                  </label>
                  <input
                    type="text"
                    name="apellido_materno"
                    value={atencion?.apellido_materno}
                    onChange={(e) =>
                      set_atencion({
                        ...atencion,
                        apellido_materno: e.target.value,
                      })
                    }
                    className="focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md uppercase"
                  />
                </div>
                {/* endJSXapellido_materno */}
                {/* initJSXcarnet_identidad */}
                <div className="">
                  <label
                    htmlFor="carnet_identidad"
                    className="block font-medium text-black 2xl:text-sm text-xs"
                  >
                    Carnet de Identidad *
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Icon
                        name="FingerPrintIcon"
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      type="text"
                      name="carnet_identidad"
                      value={atencion?.carnet_identidad}
                      onChange={(e) =>
                        set_atencion({
                          ...atencion,
                          carnet_identidad: e.target.value,
                        })
                      }
                      className="pl-10 focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md uppercase"
                    />
                  </div>
                </div>
                {/* endJSXcarnet_identidad */}
                {/* initJSXnumero_celular */}
                <div className="">
                  <label
                    htmlFor="numero_celular"
                    className="block font-medium text-black 2xl:text-sm text-xs"
                  >
                    Numero de celular *
                  </label>
                  <div className="relative mt-1 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Icon
                        name="PhoneIcon"
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      type="number"
                      name="numero_celular"
                      value={atencion?.numero_celular}
                      onChange={(e) =>
                        set_atencion({
                          ...atencion,
                          numero_celular: e.target.value,
                        })
                      }
                      required
                      className="pl-10 focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md extraclass"
                    />
                  </div>
                </div>
                {/* endJSXnumero_celular */}
                {/* initJSXnombre_tutor */}
                <div className="">
                  <label
                    htmlFor="nombre_tutor"
                    className="block font-medium text-black 2xl:text-sm text-xs"
                  >
                    Nombres Tutor *
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Icon
                        name="UserPlusIcon"
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      type="text"
                      name="nombre_tutor"
                      value={atencion?.nombre_tutor}
                      onChange={(e) =>
                        set_atencion({
                          ...atencion,
                          nombre_tutor: e.target.value,
                        })
                      }
                      className="pl-10 focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md uppercase"
                    />
                  </div>
                </div>
                {/* endJSXnombre_tutor */}
                {/* initJSXapellido_paterno_tutor */}
                <div className="">
                  <label
                    htmlFor="apellido_paterno_tutor"
                    className="block font-medium text-black 2xl:text-sm text-xs"
                  >
                    Apellido Paterno Tutor *
                  </label>
                  <input
                    type="text"
                    name="apellido_paterno_tutor"
                    value={atencion?.apellido_paterno_tutor}
                    onChange={(e) =>
                      set_atencion({
                        ...atencion,
                        apellido_paterno_tutor: e.target.value,
                      })
                    }
                    className="focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md uppercase"
                  />
                </div>
                {/* endJSXapellido_paterno_tutor */}
                {/* initJSXapellido_materno_tutor */}
                <div className="">
                  <label
                    htmlFor="apellido_materno_tutor"
                    className="block font-medium text-black 2xl:text-sm text-xs"
                  >
                    Apellido Materno Tutor
                  </label>
                  <input
                    type="text"
                    name="apellido_materno_tutor"
                    value={atencion?.apellido_materno_tutor}
                    onChange={(e) =>
                      set_atencion({
                        ...atencion,
                        apellido_materno_tutor: e.target.value,
                      })
                    }
                    required
                    className="focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md uppercase"
                  />
                </div>
                {/* endJSXapellido_materno_tutor */}

                {/* initJSXnumero_celular_tutor */}
                <div className="">
                  <label
                    htmlFor="numero_celular_tutor"
                    className="block font-medium text-black 2xl:text-sm text-xs"
                  >
                    Numero de celular Tutor *
                  </label>
                  <div className="relative mt-1 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Icon
                        name="PhoneArrowUpRightIcon"
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      type="number"
                      name="numero_celular_tutor"
                      value={atencion?.numero_celular_tutor}
                      onChange={(e) =>
                        set_atencion({
                          ...atencion,
                          numero_celular_tutor: e.target.value,
                        })
                      }
                      className="pl-10 focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md extraclass"
                    />
                  </div>
                </div>
                {/* endJSXnumero_celular_tutor */}
                {/* initJSXfecha_atencion */}
                <div className="">
                  <label
                    htmlFor="fecha_atencion"
                    className="block font-medium text-black 2xl:text-sm text-xs"
                  >
                    Fecha de Atencion
                  </label>
                  <div className="relative mt-1 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Icon
                        name="CalendarDaysIcon"
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      type="datetime-local"
                      name="fecha_atencion"
                      value={atencion?.fecha_atencion}
                      readOnly 
                      disabled
                      onChange={(e) =>
                        set_atencion({
                          ...atencion,
                          fecha_atencion: e.target.value,
                        })
                      }
                      required
                      className="pl-10 focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md extraclass"
                    />
                  </div>
                </div>
                {/* endJSXfecha_atencion */}
                {/* initJSXotras_carreras */}
                <div className="">
                  <label
                    htmlFor="otras_carreras"
                    className="block font-medium text-black 2xl:text-sm text-xs"
                  >
                    Otras Carreras
                  </label>
                  <input
                    type="text"
                    name="otras_carreras"
                    value={atencion?.otras_carreras}
                    onChange={(e) =>
                      set_atencion({
                        ...atencion,
                        otras_carreras: e.target.value,
                      })
                    }
                    className="focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md "
                  />
                </div>
                {/* endJSXotras_carreras */}
                {/* initJSXgestion_bachiller */}
                <div className="">
                  <label
                    htmlFor="gestion_bachiller"
                    className="block font-medium text-black 2xl:text-sm text-xs"
                  >
                    Gestion Bachiller
                  </label>
                  <div className="relative mt-1 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Icon
                        name="AcademicCapIcon"
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      type="number"
                      name="gestion_bachiller"
                      value={atencion?.gestion_bachiller}
                      onChange={(e) =>
                        set_atencion({
                          ...atencion,
                          gestion_bachiller: e.target.value,
                        })
                      }
                      required
                      className="pl-10 focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md extraclass"
                    />
                  </div>
                </div>
                {/* endJSXgestion_bachiller */}
                {/* initJSXcolegio */}
                <div className="">
                  <label
                    htmlFor="colegio"
                    className="block font-medium text-black 2xl:text-sm text-xs"
                  >
                    Colegio
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Icon
                        name="HomeIcon"
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      type="text"
                      name="colegio"
                      value={atencion?.colegio}
                      onChange={(e) =>
                        set_atencion({ ...atencion, colegio: e.target.value })
                      }
                      required
                      className="pl-10 focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md uppercase"
                    />
                  </div>
                </div>
                {/* endJSXcolegio */}
                {/* initJSXtipo_colegio */}
                <div className="col-span-1">
                  <Select
                    label="Seleccionar Tipo Colegio"
                    options={["FISCAL", "CONVENIO", "PARTICULAR"]}
                    value={atencion?.tipo_colegio}
                    setValue={(e) =>
                      set_atencion({ ...atencion, tipo_colegio: e })
                    }
                  />
                </div>
                {/* endJSXtipo_colegio */}
                {/* initJSXprovincia */}
                <div className="">
                  <label
                    htmlFor="provincia"
                    className="block font-medium text-black 2xl:text-sm text-xs"
                  >
                    Provincia
                  </label>
                  <input
                    type="text"
                    name="provincia"
                    value={atencion?.provincia}
                    onChange={(e) =>
                      set_atencion({ ...atencion, provincia: e.target.value })
                    }
                    required
                    className="focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md uppercase"
                  />
                </div>
                {/* endJSXprovincia */}
                {/* initJSXcomo_te_enteraste_emi */}
                <div className="2xl:col-span-5 lg:col-span-4 sm:col-span-2 col-span-1 col-span-1 border-b-4 border-gray-200">
                  <MultiCheckbox
                    label="Seleccionar ¿Como te Enteraste de Nosotros?"
                    options={[
                      "FACEBOOK",
                      "INSTAGRAM",
                      "TIK TOK",
                      "PAGINA WEB",
                      "POR UN FAMILIAR",
                      "VISITA A TU COLEGIO",
                      "VISITA PRE MILITAR",
                      "RECOMENDACION AMIGO",
                    ]}
                    values={atencion?.como_te_enteraste_emi}
                    setValues={(e) =>
                      set_atencion({ ...atencion, como_te_enteraste_emi: e })
                    }
                  />
                </div>
                {/* endJSXcomo_te_enteraste_emi */}
                {/* initJSXotro_metodo_capatacion */}
                <div className="">
                  <label
                    htmlFor="otro_metodo_capatacion"
                    className="block font-medium text-black 2xl:text-sm text-xs"
                  >
                    ¿Otro medio de captacion?
                  </label>
                  <input
                    type="text"
                    name="otro_metodo_capatacion"
                    value={atencion?.otro_metodo_capatacion}
                    onChange={(e) =>
                      set_atencion({
                        ...atencion,
                        otro_metodo_capatacion: e.target.value,
                      })
                    }
                    className="focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md uppercase"
                  />
                </div>
                {/* endJSXotro_metodo_capatacion */}
                {/* initJSXhora_clase */}
                <div className="col-span-1">
                  <Select
                    label="Seleccionar Hr. de Clases"
                    options={["MANANA", "TARDE", "NOCHE"]}
                    value={atencion?.hora_clase}
                    setValue={(e) =>
                      set_atencion({ ...atencion, hora_clase: e })
                    }
                  />
                </div>
                {/* endJSXhora_clase */}
                {/* initJSXobservacion */}
                <div className="">
                  <label
                    htmlFor="observacion"
                    className="block text-sm font-medium text-gray-800"
                  >
                    Observacion
                  </label>
                  <textarea
                    name="observacion"
                    value={atencion?.observacion}
                    onChange={(e) =>
                      set_atencion({ ...atencion, observacion: e.target.value })
                    }
                    required
                    rows="3"
                    className="focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md uppercase"
                  />
                </div>
                {/* endJSXobservacion */}
                {/* initJSXestado */}
                <div className="col-span-1">
                  <Select
                    label="Seleccionar Estado"
                    options={[
                      "ATENDIDO",
                      "EN SEGUIMIENTO",
                      "GANADO",
                      "PERDIDO",
                    ]}
                    value={atencion?.estado}
                    setValue={(e) => set_atencion({ ...atencion, estado: e })}
                  />
                </div>
                {/* endJSXestado */}
                {/* initJSXasesor */}
                <div className="col-span-1">
                  <Select
                    label="Seleccionar Asesor"
                    options={user_list}
                    field="name"
                    value={atencion?.asesor}
                    setValue={(e) => set_atencion({ ...atencion, asesor: e })}
                  />
                </div>
                {/* endJSXasesor */}
                {/* initJSXdepartamento */}
                <div className="col-span-1">
                  <Select
                    label="Seleccionar Departamento"
                    options={[
                      "CHUQUISACA",
                      "COCHABAMBA",
                      "TARIJA",
                      "LA PAZ",
                      "ORURO",
                      "POTOSI",
                      "PANDO",
                      "BENI",
                      "SANTA CRUZ",
                    ]}
                    value={atencion?.departamento}
                    setValue={(e) =>
                      set_atencion({ ...atencion, departamento: e })
                    }
                  />
                </div>
                {/* endJSXdepartamento */}
                {/* initJSXcarreras */}
                <div className="col-span-1">
                  <Select
                    label="Seleccionar Carrera"
                    options={carreras_list}
                    value={atencion.carreras}
                    setValue={(e) => set_atencion({ ...atencion, carreras: e })}
                  />
                </div>
                {/* endJSXcarreras */}
                {/* initJSXnombre_completo */}
                <div className="">
                  <label
                    htmlFor="nombre_completo"
                    className="block font-medium text-black 2xl:text-sm text-xs"
                  >
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    name="nombre_completo"
                    value={atencion?.nombre_completo}
                    onChange={(e) =>
                      set_atencion({
                        ...atencion,
                        nombre_completo: e.target.value,
                      })
                    }
                    className="focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md uppercase"
                  />
                </div>
                {/* endJSXnombre_completo */}
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
