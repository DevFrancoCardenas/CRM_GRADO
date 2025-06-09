import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import App from "../App";
import Public from '../pages/Public';
import Private from '../pages/Private';
import Login from '../pages/Public/Login1';
import Loading from '../components/Loading';
import PermissionCheck from '../components/PermissionCheck';
import User_list from "@/pages/Private/admin/user/User_list";
import User_report from "@/pages/Private/admin/user/User_report";
import User_form from "@/pages/Private/admin/user/User_form";
import User_detail from "@/pages/Private/admin/user/User_detail";
import User_profile from "@/pages/Private/admin/user/User_profile";
import User_delete from "@/pages/Private/admin/user/User_delete";
import Group_list from "@/pages/Private/admin/group/Group_list";
import Group_report from "@/pages/Private/admin/group/Group_report";
import Group_form from "@/pages/Private/admin/group/Group_form";
import Group_detail from "@/pages/Private/admin/group/Group_detail";
import Group_delete from "@/pages/Private/admin/group/Group_delete";
        import Unidades_academicas_list from "@/pages/Private/parametricas/unidades_academicas/Unidades_academicas_list";
        import Unidades_academicas_report from "@/pages/Private/parametricas/unidades_academicas/Unidades_academicas_report";
        import Unidades_academicas_form from "@/pages/Private/parametricas/unidades_academicas/Unidades_academicas_form";
        import Unidades_academicas_detail from "@/pages/Private/parametricas/unidades_academicas/Unidades_academicas_detail";
        import Unidades_academicas_delete from "@/pages/Private/parametricas/unidades_academicas/Unidades_academicas_delete";
        import Carreras_list from "@/pages/Private/parametricas/carreras/Carreras_list";
        import Carreras_report from "@/pages/Private/parametricas/carreras/Carreras_report";
        import Carreras_form from "@/pages/Private/parametricas/carreras/Carreras_form";
        import Carreras_detail from "@/pages/Private/parametricas/carreras/Carreras_detail";
        import Carreras_delete from "@/pages/Private/parametricas/carreras/Carreras_delete";
        import Tipo_de_seguimiento_list from "@/pages/Private/parametricas/tipo_de_seguimiento/Tipo_de_seguimiento_list";
        import Tipo_de_seguimiento_report from "@/pages/Private/parametricas/tipo_de_seguimiento/Tipo_de_seguimiento_report";
        import Tipo_de_seguimiento_form from "@/pages/Private/parametricas/tipo_de_seguimiento/Tipo_de_seguimiento_form";
        import Tipo_de_seguimiento_detail from "@/pages/Private/parametricas/tipo_de_seguimiento/Tipo_de_seguimiento_detail";
        import Tipo_de_seguimiento_delete from "@/pages/Private/parametricas/tipo_de_seguimiento/Tipo_de_seguimiento_delete";
        import Metas_list from "@/pages/Private/parametricas/metas/Metas_list";
        import Metas_report from "@/pages/Private/parametricas/metas/Metas_report";
        import Metas_form from "@/pages/Private/parametricas/metas/Metas_form";
        import Metas_detail from "@/pages/Private/parametricas/metas/Metas_detail";
        import Metas_delete from "@/pages/Private/parametricas/metas/Metas_delete";
        import Atencion_list from "@/pages/Private/atencion_en_plataforma/atencion/Atencion_list";
        import Atencion_report from "@/pages/Private/atencion_en_plataforma/atencion/Atencion_report";
        import Atencion_form from "@/pages/Private/atencion_en_plataforma/atencion/Atencion_form";
        import Atencion_detail from "@/pages/Private/atencion_en_plataforma/atencion/Atencion_detail";
        import Atencion_delete from "@/pages/Private/atencion_en_plataforma/atencion/Atencion_delete";
        import Seguimiento_plataforma_list from "@/pages/Private/atencion_en_plataforma/seguimiento_plataforma/Seguimiento_plataforma_list";
        import Seguimiento_plataforma_report from "@/pages/Private/atencion_en_plataforma/seguimiento_plataforma/Seguimiento_plataforma_report";
        import Seguimiento_plataforma_form from "@/pages/Private/atencion_en_plataforma/seguimiento_plataforma/Seguimiento_plataforma_form";
        import Seguimiento_plataforma_detail from "@/pages/Private/atencion_en_plataforma/seguimiento_plataforma/Seguimiento_plataforma_detail";
        import Seguimiento_plataforma_delete from "@/pages/Private/atencion_en_plataforma/seguimiento_plataforma/Seguimiento_plataforma_delete";
        import Importacion_de_datos_list from "@/pages/Private/datos_externos/importacion_de_datos/Importacion_de_datos_list";
        import Importacion_de_datos_report from "@/pages/Private/datos_externos/importacion_de_datos/Importacion_de_datos_report";
        import Importacion_de_datos_form from "@/pages/Private/datos_externos/importacion_de_datos/Importacion_de_datos_form";
        import Importacion_de_datos_detail from "@/pages/Private/datos_externos/importacion_de_datos/Importacion_de_datos_detail";
        import Importacion_de_datos_delete from "@/pages/Private/datos_externos/importacion_de_datos/Importacion_de_datos_delete";
        import Mensajeria_list from "@/pages/Private/mensajeria/mensajeria/Mensajeria_list";
        import Mensajeria_report from "@/pages/Private/mensajeria/mensajeria/Mensajeria_report";
        import Mensajeria_form from "@/pages/Private/mensajeria/mensajeria/Mensajeria_form";
        import Mensajeria_detail from "@/pages/Private/mensajeria/mensajeria/Mensajeria_detail";
        import Mensajeria_delete from "@/pages/Private/mensajeria/mensajeria/Mensajeria_delete";
        //importsVistas
const Dashboard = lazy(() => import('@/components/Dashboard3'));
const NotFound = lazy(() => import('@/pages/Public/Errors/404'));
//Renderizacion ligera de paginas
//Crear otra funcion para publico si utilizara
function Page({ Component, permissions }) {
    //const path=`../pages/Private/${component}`;
    //const Component=lazy(() => import(/* @vite-ignore */ path));
    if (permissions && permissions.length)
        return (
            <PermissionCheck permissions={permissions}>
                <Suspense fallback={<Loading />}>
                    <Component />
                </Suspense>
            </PermissionCheck>
        );
    else
        return (
            <Suspense fallback={<Loading />}>
                <Component />
            </Suspense>
        );
}
const publicRoutes = [
    {
        path: "/",
        element: <Public />,
    },
    {
        path: "/login",
        element: <Login />,
    }
];
//required Authentication
const privateRoutes = [
    {
        element: <Private />,
        children: [
            {
                path: '/dashboard',
                element: <Suspense fallback={<Loading />}><Dashboard /></Suspense>,
                children: [
                    { path: 'user/list', element: <Page Component={User_list} permissions={['read_user']} /> },
                    { path: 'user/report', element: <Page Component={User_report} permissions={['report_user']} /> },
                    { path: 'user/create', element: <Page Component={User_form} permissions={['create_user']} /> },
                    { path: 'user/detail/:id', element: <Page Component={User_detail} permissions={['read_user']} /> },
                    { path: 'user/update/:id', element: <Page Component={User_form} permissions={['update_user']} /> },
                    { path: 'user/profile', element: <Page Component={User_profile} permissions={[]} /> },
                    { path: 'user/delete/:id', element: <Page Component={User_delete} permissions={['delete_user']} /> },
                    { path: 'group/list', element: <Page Component={Group_list} permissions={['read_group']} /> },
                    { path: 'group/report', element: <Page Component={Group_report} permissions={['report_group']} /> },
                    { path: 'group/create', element: <Page Component={Group_form} permissions={['create_group']} /> },
                    { path: 'group/detail/:id', element: <Page Component={Group_detail} permissions={['read_group']} /> },
                    { path: 'group/update/:id', element: <Page Component={Group_form} permissions={['update_group']} /> },
                    { path: 'group/delete/:id', element: <Page Component={Group_delete} permissions={['delete_group']} /> },
        { path: 'unidades_academicas/list', element: <Page Component={Unidades_academicas_list} permissions={['read_unidades_academicas']} /> },
        { path: 'unidades_academicas/report', element: <Page Component={Unidades_academicas_report} permissions={['report_unidades_academicas']} /> },
        { path: 'unidades_academicas/create', element: <Page Component={Unidades_academicas_form} permissions={['create_unidades_academicas']} /> },
        { path: 'unidades_academicas/detail/:id', element: <Page Component={Unidades_academicas_detail} permissions={['read_unidades_academicas']} /> },
        { path: 'unidades_academicas/update/:id', element: <Page Component={Unidades_academicas_form} permissions={['update_unidades_academicas']} /> },
        { path: 'unidades_academicas/delete/:id', element: <Page Component={Unidades_academicas_delete} permissions={['delete_unidades_academicas']} /> },
        { path: 'carreras/list', element: <Page Component={Carreras_list} permissions={['read_carreras']} /> },
        { path: 'carreras/report', element: <Page Component={Carreras_report} permissions={['report_carreras']} /> },
        { path: 'carreras/create', element: <Page Component={Carreras_form} permissions={['create_carreras']} /> },
        { path: 'carreras/detail/:id', element: <Page Component={Carreras_detail} permissions={['read_carreras']} /> },
        { path: 'carreras/update/:id', element: <Page Component={Carreras_form} permissions={['update_carreras']} /> },
        { path: 'carreras/delete/:id', element: <Page Component={Carreras_delete} permissions={['delete_carreras']} /> },
        { path: 'tipo_de_seguimiento/list', element: <Page Component={Tipo_de_seguimiento_list} permissions={['read_tipo_de_seguimiento']} /> },
        { path: 'tipo_de_seguimiento/report', element: <Page Component={Tipo_de_seguimiento_report} permissions={['report_tipo_de_seguimiento']} /> },
        { path: 'tipo_de_seguimiento/create', element: <Page Component={Tipo_de_seguimiento_form} permissions={['create_tipo_de_seguimiento']} /> },
        { path: 'tipo_de_seguimiento/detail/:id', element: <Page Component={Tipo_de_seguimiento_detail} permissions={['read_tipo_de_seguimiento']} /> },
        { path: 'tipo_de_seguimiento/update/:id', element: <Page Component={Tipo_de_seguimiento_form} permissions={['update_tipo_de_seguimiento']} /> },
        { path: 'tipo_de_seguimiento/delete/:id', element: <Page Component={Tipo_de_seguimiento_delete} permissions={['delete_tipo_de_seguimiento']} /> },
        { path: 'metas/list', element: <Page Component={Metas_list} permissions={['read_metas']} /> },
        { path: 'metas/report', element: <Page Component={Metas_report} permissions={['report_metas']} /> },
        { path: 'metas/create', element: <Page Component={Metas_form} permissions={['create_metas']} /> },
        { path: 'metas/detail/:id', element: <Page Component={Metas_detail} permissions={['read_metas']} /> },
        { path: 'metas/update/:id', element: <Page Component={Metas_form} permissions={['update_metas']} /> },
        { path: 'metas/delete/:id', element: <Page Component={Metas_delete} permissions={['delete_metas']} /> },
        { path: 'atencion/list', element: <Page Component={Atencion_list} permissions={['read_atencion']} /> },
        { path: 'atencion/report', element: <Page Component={Atencion_report} permissions={['report_atencion']} /> },
        { path: 'atencion/create', element: <Page Component={Atencion_form} permissions={['create_atencion']} /> },
        { path: 'atencion/detail/:id', element: <Page Component={Atencion_detail} permissions={['read_atencion']} /> },
        { path: 'atencion/update/:id', element: <Page Component={Atencion_form} permissions={['update_atencion']} /> },
        { path: 'atencion/delete/:id', element: <Page Component={Atencion_delete} permissions={['delete_atencion']} /> },
        { path: 'seguimiento_plataforma/list', element: <Page Component={Seguimiento_plataforma_list} permissions={['read_seguimiento_plataforma']} /> },
        { path: 'seguimiento_plataforma/report', element: <Page Component={Seguimiento_plataforma_report} permissions={['report_seguimiento_plataforma']} /> },
        { path: 'seguimiento_plataforma/create', element: <Page Component={Seguimiento_plataforma_form} permissions={['create_seguimiento_plataforma']} /> },
        { path: 'seguimiento_plataforma/detail/:id', element: <Page Component={Seguimiento_plataforma_detail} permissions={['read_seguimiento_plataforma']} /> },
        { path: 'seguimiento_plataforma/update/:id', element: <Page Component={Seguimiento_plataforma_form} permissions={['update_seguimiento_plataforma']} /> },
        { path: 'seguimiento_plataforma/delete/:id', element: <Page Component={Seguimiento_plataforma_delete} permissions={['delete_seguimiento_plataforma']} /> },
        { path: 'importacion_de_datos/list', element: <Page Component={Importacion_de_datos_list} permissions={['read_importacion_de_datos']} /> },
        { path: 'importacion_de_datos/report', element: <Page Component={Importacion_de_datos_report} permissions={['report_importacion_de_datos']} /> },
        { path: 'importacion_de_datos/create', element: <Page Component={Importacion_de_datos_form} permissions={['create_importacion_de_datos']} /> },
        { path: 'importacion_de_datos/detail/:id', element: <Page Component={Importacion_de_datos_detail} permissions={['read_importacion_de_datos']} /> },
        { path: 'importacion_de_datos/update/:id', element: <Page Component={Importacion_de_datos_form} permissions={['update_importacion_de_datos']} /> },
        { path: 'importacion_de_datos/delete/:id', element: <Page Component={Importacion_de_datos_delete} permissions={['delete_importacion_de_datos']} /> },
        { path: 'mensajeria/list', element: <Page Component={Mensajeria_list} permissions={['read_mensajeria']} /> },
        { path: 'mensajeria/report', element: <Page Component={Mensajeria_report} permissions={['report_mensajeria']} /> },
        { path: 'mensajeria/create', element: <Page Component={Mensajeria_form} permissions={['create_mensajeria']} /> },
        { path: 'mensajeria/detail/:id', element: <Page Component={Mensajeria_detail} permissions={['read_mensajeria']} /> },
        { path: 'mensajeria/update/:id', element: <Page Component={Mensajeria_form} permissions={['update_mensajeria']} /> },
        { path: 'mensajeria/delete/:id', element: <Page Component={Mensajeria_delete} permissions={['delete_mensajeria']} /> },
        //router
                ]
            },
        ]
    }
]
const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            ...publicRoutes,
            ...privateRoutes,
            { path: "*", element: <Suspense fallback={<Loading />}><NotFound /></Suspense> }
        ],
    },
]);
export default router;