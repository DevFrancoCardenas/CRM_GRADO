import { IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { StoreContext } from "@/context/store";
import React, { useContext, useEffect } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import client from "@/api";
import Menu from "@/components/Menu";
import Home from "./Home";
import User_list from "./admin/User/User_list";
import User_form from "./admin/User/User_form";
import User_detail from "./admin/User/User_detail";
import Group_list from "./admin/Group/Group_list";
import Group_detail from "./admin/Group/Group_detail";
import Group_form from "./admin/Group/Group_form";
        import Unidades_academicas_list from "@/pages/Private/parametricas/unidades_academicas/Unidades_academicas_list";
        import Unidades_academicas_form from "@/pages/Private/parametricas/unidades_academicas/Unidades_academicas_form";
        import Unidades_academicas_detail from "@/pages/Private/parametricas/unidades_academicas/Unidades_academicas_detail";
        import Carreras_list from "@/pages/Private/parametricas/carreras/Carreras_list";
        import Carreras_form from "@/pages/Private/parametricas/carreras/Carreras_form";
        import Carreras_detail from "@/pages/Private/parametricas/carreras/Carreras_detail";
        import Tipo_de_seguimiento_list from "@/pages/Private/parametricas/tipo_de_seguimiento/Tipo_de_seguimiento_list";
        import Tipo_de_seguimiento_form from "@/pages/Private/parametricas/tipo_de_seguimiento/Tipo_de_seguimiento_form";
        import Tipo_de_seguimiento_detail from "@/pages/Private/parametricas/tipo_de_seguimiento/Tipo_de_seguimiento_detail";
        import Metas_list from "@/pages/Private/parametricas/metas/Metas_list";
        import Metas_form from "@/pages/Private/parametricas/metas/Metas_form";
        import Metas_detail from "@/pages/Private/parametricas/metas/Metas_detail";
        import Atencion_list from "@/pages/Private/atencion_en_plataforma/atencion/Atencion_list";
        import Atencion_form from "@/pages/Private/atencion_en_plataforma/atencion/Atencion_form";
        import Atencion_detail from "@/pages/Private/atencion_en_plataforma/atencion/Atencion_detail";
        import Seguimiento_plataforma_list from "@/pages/Private/atencion_en_plataforma/seguimiento_plataforma/Seguimiento_plataforma_list";
        import Seguimiento_plataforma_form from "@/pages/Private/atencion_en_plataforma/seguimiento_plataforma/Seguimiento_plataforma_form";
        import Seguimiento_plataforma_detail from "@/pages/Private/atencion_en_plataforma/seguimiento_plataforma/Seguimiento_plataforma_detail";
        import Importacion_de_datos_list from "@/pages/Private/datos_externos/importacion_de_datos/Importacion_de_datos_list";
        import Importacion_de_datos_form from "@/pages/Private/datos_externos/importacion_de_datos/Importacion_de_datos_form";
        import Importacion_de_datos_detail from "@/pages/Private/datos_externos/importacion_de_datos/Importacion_de_datos_detail";
        import Mensajeria_list from "@/pages/Private/mensajeria/mensajeria/Mensajeria_list";
        import Mensajeria_form from "@/pages/Private/mensajeria/mensajeria/Mensajeria_form";
        import Mensajeria_detail from "@/pages/Private/mensajeria/mensajeria/Mensajeria_detail";
        //importsVistas
export default function Private() {
  const store = useContext(StoreContext);
  const location = useLocation();
  function refreshToken() {
    client
      .post("/user/refreshToken")
      .then((r) => {
        store.refreshToken(r?.data);
      })
      .catch((e) => {
        store.logout();
        window.location.reload();
      });
  }
  useEffect(() => {
    refreshToken();
    const interval = setInterval(
      () => {
        refreshToken();
      },
      parseInt(import.meta.env.VITE_JWT_TIME) * 60 * 1000,
    );
    return () => clearInterval(interval);
  }, []);
  if (!store.user) return <Redirect to={"/login"} />;
  return (
    <React.Fragment>
      <IonSplitPane contentId="main">
        <Menu />
        <IonRouterOutlet id="main">
          <Route path="/app/home" exact={true} component={Home} />
          <Route path="/app/user/list" exact={true} component={User_list} />
          <Route
            path="/app/user/detail/:id"
            exact={true}
            component={User_detail}
          />
          <Route path="/app/user/create" exact={true} component={User_form} />
          <Route
            path="/app/user/update/:id"
            exact={true}
            component={User_form}
          />
          <Route path="/app/group/list" exact={true} component={Group_list} />
          <Route
            path="/app/group/detail/:id"
            exact={true}
            component={Group_detail}
          />
          <Route path="/app/group/create" exact={true} component={Group_form} />
          <Route
            path="/app/group/update/:id"
            exact={true}
            component={Group_form}
          />
        {/* initJSXunidades_academicas */}
        <Route path="/app/unidades_academicas/list" exact={true} component={Unidades_academicas_list} />
        <Route path="/app/unidades_academicas/detail/:id" exact={true} component={Unidades_academicas_detail} />
        <Route path="/app/unidades_academicas/create" exact={true} component={Unidades_academicas_form} />
        <Route path="/app/unidades_academicas/update/:id" exact={true} component={Unidades_academicas_form} />
        {/* endJSXunidades_academicas */}
        {/* initJSXcarreras */}
        <Route path="/app/carreras/list" exact={true} component={Carreras_list} />
        <Route path="/app/carreras/detail/:id" exact={true} component={Carreras_detail} />
        <Route path="/app/carreras/create" exact={true} component={Carreras_form} />
        <Route path="/app/carreras/update/:id" exact={true} component={Carreras_form} />
        {/* endJSXcarreras */}
        {/* initJSXtipo_de_seguimiento */}
        <Route path="/app/tipo_de_seguimiento/list" exact={true} component={Tipo_de_seguimiento_list} />
        <Route path="/app/tipo_de_seguimiento/detail/:id" exact={true} component={Tipo_de_seguimiento_detail} />
        <Route path="/app/tipo_de_seguimiento/create" exact={true} component={Tipo_de_seguimiento_form} />
        <Route path="/app/tipo_de_seguimiento/update/:id" exact={true} component={Tipo_de_seguimiento_form} />
        {/* endJSXtipo_de_seguimiento */}
        {/* initJSXmetas */}
        <Route path="/app/metas/list" exact={true} component={Metas_list} />
        <Route path="/app/metas/detail/:id" exact={true} component={Metas_detail} />
        <Route path="/app/metas/create" exact={true} component={Metas_form} />
        <Route path="/app/metas/update/:id" exact={true} component={Metas_form} />
        {/* endJSXmetas */}
        {/* initJSXatencion */}
        <Route path="/app/atencion/list" exact={true} component={Atencion_list} />
        <Route path="/app/atencion/detail/:id" exact={true} component={Atencion_detail} />
        <Route path="/app/atencion/create" exact={true} component={Atencion_form} />
        <Route path="/app/atencion/update/:id" exact={true} component={Atencion_form} />
        {/* endJSXatencion */}
        {/* initJSXseguimiento_plataforma */}
        <Route path="/app/seguimiento_plataforma/list" exact={true} component={Seguimiento_plataforma_list} />
        <Route path="/app/seguimiento_plataforma/detail/:id" exact={true} component={Seguimiento_plataforma_detail} />
        <Route path="/app/seguimiento_plataforma/create" exact={true} component={Seguimiento_plataforma_form} />
        <Route path="/app/seguimiento_plataforma/update/:id" exact={true} component={Seguimiento_plataforma_form} />
        {/* endJSXseguimiento_plataforma */}
        {/* initJSXimportacion_de_datos */}
        <Route path="/app/importacion_de_datos/list" exact={true} component={Importacion_de_datos_list} />
        <Route path="/app/importacion_de_datos/detail/:id" exact={true} component={Importacion_de_datos_detail} />
        <Route path="/app/importacion_de_datos/create" exact={true} component={Importacion_de_datos_form} />
        <Route path="/app/importacion_de_datos/update/:id" exact={true} component={Importacion_de_datos_form} />
        {/* endJSXimportacion_de_datos */}
        {/* initJSXmensajeria */}
        <Route path="/app/mensajeria/list" exact={true} component={Mensajeria_list} />
        <Route path="/app/mensajeria/detail/:id" exact={true} component={Mensajeria_detail} />
        <Route path="/app/mensajeria/create" exact={true} component={Mensajeria_form} />
        <Route path="/app/mensajeria/update/:id" exact={true} component={Mensajeria_form} />
        {/* endJSXmensajeria */}
        {/* router */}
        </IonRouterOutlet>
      </IonSplitPane>
    </React.Fragment>
  );
}