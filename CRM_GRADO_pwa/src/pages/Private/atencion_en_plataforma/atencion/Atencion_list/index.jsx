import Page from "@/components/Page";
import { IonFab, IonFabButton, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel, IonList, IonModal, IonSearchbar } from "@ionic/react";
import "./Atencion_list.css";
import { chevronForward, print } from "ionicons/icons";
import React, { useContext, useEffect, useRef, useState } from "react";
import { StoreContext } from "@/context/store";
import client from "@/api";
import { useLocation } from "react-router";
import Atencion_report from "./Atencion_report";
const docForPage = 50;
export default function Atencion_list() {
    const location = useLocation();
    const store = useContext(StoreContext);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [sort, setSort] = useState(null);
    const [total, setTotal] = useState(0);
    const [list, setList] = useState([]);
    const [find, setFind] = useState({});
    const modal = useRef(null);
    const [permissions, set_permissions] = useState({});
    const select = [];
    const populate = [
        "last_user",
        //initJSunidad_academica
"unidad_academica",
//endJSunidad_academica
//initJSasesor
"asesor",
//endJSasesor
//initJScarreras
"carreras",
//endJScarreras
//foreigns
    ];
    function getList(query) {
        store.setLoading(true);
        client.post('/atencion/list', {
            query: {
                ...query,
                populate,
                //select
            }
        }).then(r => {
            setList(r.data.list);
            setTotal(r.data.count);
            setMaxPage(Math.ceil(r.data.count / docForPage));
        }).finally(() => {
            store.setLoading(false);
        });
    }
    function nextPage(ev) {
        if (page < maxPage) {
            client.post('/atencion/list', {
                query: {
                    search: find,
                    page: page + 1,
                    limit: docForPage,
                    sort: sort,
                    count: false
                }
            }).then(r => {
                setList([list, ...r.data.list]);
            }).finally(() => {
                ev.target.complete();
            });
            setPage(page + 1);
        }
    }
    function search(value) {
        value = value.trim();
        var obj = { all: value };
        setFind(obj);
        setPage(1);
        getList({
            page: 1,
            limit: docForPage,
            search: obj,
            count: true
        });
    }
    useEffect(() => {
        var temp = {};
        temp.read = store.checkPermissions(["read_atencion"]);
        temp.create = store.checkPermissions(["create_atencion"]);
        temp.report = store.checkPermissions(["report_atencion"]);
        temp.update = store.checkPermissions(["update_atencion"]);
        temp.delete = store.checkPermissions(["delete_atencion"]);
        set_permissions(temp);
        getList({
            page: page,
            limit: docForPage,
            count: true
        });
    }, [location.pathname])
    return (
        <Page title="Lista de Atencion" createURL={permissions.create ? "/app/atencion/create" : null} permissions="read_atencion">
            <IonSearchbar animated={true} debounce={1000} placeholder="Buscar..." onIonInput={e => search(e.target.value)} />
            <IonList className="w-full">
                {list.map((atencion, index) => (
                    <React.Fragment key={index}>
                        <IonItem routerLink={`/app/atencion/detail/${atencion._id}`} routerDirection="forward">
                            <label className="bg-primary px-2 py-1 rounded-full mr-1 text-xs">{index + 1}</label>
                            <IonLabel className="font-semibold">
                                {/* initJSXfecha_atencion */}
{new Date(atencion?.fecha_atencion).toLocaleString("es-ES")}
{/* endJSXfecha_atencion */}
                            </IonLabel>
                            <IonIcon
                                icon={chevronForward}
                                className="cursor-pointer"
                            />
                        </IonItem>
                        <div className="p-4 border-t">
                            {/* initJSXnombres */}
<p><span className="font-semibold">Nombres:</span>{atencion?.nombres}</p>
{/* endJSXnombres */}
{/* initJSXapellido_paterno */}
<p><span className="font-semibold">Apellido Paterno:</span>{atencion?.apellido_paterno}</p>
{/* endJSXapellido_paterno */}
{/* initJSXapellido_materno */}
<p><span className="font-semibold">Apellido Materno:</span>{atencion?.apellido_materno}</p>
{/* endJSXapellido_materno */}
{/* initJSXcarnet_identidad */}
<p><span className="font-semibold">Carnet de Identidad:</span>{atencion?.carnet_identidad}</p>
{/* endJSXcarnet_identidad */}
{/* initJSXnumero_celular */}
<p><span className="font-semibold">Numero de celular:</span>{atencion?.numero_celular}</p>
{/* endJSXnumero_celular */}
{/* initJSXnombre_tutor */}
<p><span className="font-semibold">Nombres Tutor:</span>{atencion?.nombre_tutor}</p>
{/* endJSXnombre_tutor */}
{/* initJSXunidad_academica */}
<p><span className="font-semibold">Unidad Academica:</span>{atencion?.unidad_academica?.nombre_unidad_academica}</p>
{/* endJSXunidad_academica */}
{/* initJSXotras_carreras */}
<p><span className="font-semibold">Otras Carreras:</span>{atencion?.otras_carreras}</p>
{/* endJSXotras_carreras */}
{/* initJSXgestion_bachiller */}
<p><span className="font-semibold">Gestion Bachiller:</span>{atencion?.gestion_bachiller}</p>
{/* endJSXgestion_bachiller */}
{/* initJSXcolegio */}
<p><span className="font-semibold">Colegio:</span>{atencion?.colegio}</p>
{/* endJSXcolegio */}
{/* initJSXtipo_colegio */}
<p><span className="font-semibold">Tipo Colegio:</span>{atencion?.tipo_colegio}</p>
{/* endJSXtipo_colegio */}
{/* initJSXprovincia */}
<p><span className="font-semibold">Provincia:</span>{atencion?.provincia}</p>
{/* endJSXprovincia */}
{/* initJSXcomo_te_enteraste_emi */}
<p><span className="font-semibold">¿Como te Enteraste de Nosotros?:</span>{atencion?.como_te_enteraste_emi}</p>
{/* endJSXcomo_te_enteraste_emi */}
{/* initJSXotro_metodo_capatacion */}
<p><span className="font-semibold">¿Otro medio de captacion?:</span>{atencion?.otro_metodo_capatacion}</p>
{/* endJSXotro_metodo_capatacion */}
{/* initJSXhora_clase */}
<p><span className="font-semibold">Hr. de Clases:</span>{atencion?.hora_clase}</p>
{/* endJSXhora_clase */}
{/* initJSXestado */}
<p><span className="font-semibold">Estado:</span>{atencion?.estado}</p>
{/* endJSXestado */}
{/* initJSXasesor */}
<p><span className="font-semibold">Asesor:</span>{atencion?.asesor?.name}</p>
{/* endJSXasesor */}
{/* initJSXdepartamento */}
<p><span className="font-semibold">Departamento:</span>{atencion?.departamento}</p>
{/* endJSXdepartamento */}
{/* initJSXcarreras */}
<p><span className="font-semibold">Carrera:</span>{atencion?.carreras?.nombre_carrera}</p>
{/* endJSXcarreras */}
{/* initJSXnombre_completo */}
<p><span className="font-semibold">Nombre Completo:</span>{atencion?.nombre_completo}</p>
{/* endJSXnombre_completo */}
{/* fields */}
                        </div>
                    </React.Fragment>
                ))}
            </IonList>
            <IonInfiniteScroll onIonInfinite={(ev) => nextPage(ev)}>
                <IonInfiniteScrollContent loadingText="Cargando..." loadingSpinner="bubbles" />
            </IonInfiniteScroll>
            <IonFab slot="fixed" vertical="bottom" horizontal="end">
                <IonFabButton id="open-report">
                    <IonIcon icon={print}></IonIcon>
                </IonFabButton>
            </IonFab>
            <IonModal ref={modal} trigger="open-report">
                <Atencion_report modal={modal} camposInit={[
                    //camposDefault
                ]} />
            </IonModal>
        </Page>
    )
}