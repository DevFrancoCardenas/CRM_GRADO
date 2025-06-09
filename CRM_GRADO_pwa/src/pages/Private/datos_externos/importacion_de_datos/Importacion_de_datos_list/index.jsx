import Page from "@/components/Page";
import { IonFab, IonFabButton, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel, IonList, IonModal, IonSearchbar } from "@ionic/react";
import "./Importacion_de_datos_list.css";
import { chevronForward, print } from "ionicons/icons";
import React, { useContext, useEffect, useRef, useState } from "react";
import { StoreContext } from "@/context/store";
import client from "@/api";
import { useLocation } from "react-router";
import Importacion_de_datos_report from "./Importacion_de_datos_report";
const docForPage = 50;
export default function Importacion_de_datos_list() {
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
        //initJSunidad_academica_importacion
"unidad_academica_importacion",
//endJSunidad_academica_importacion
//foreigns
    ];
    function getList(query) {
        store.setLoading(true);
        client.post('/importacion_de_datos/list', {
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
            client.post('/importacion_de_datos/list', {
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
        temp.read = store.checkPermissions(["read_importacion_de_datos"]);
        temp.create = store.checkPermissions(["create_importacion_de_datos"]);
        temp.report = store.checkPermissions(["report_importacion_de_datos"]);
        temp.update = store.checkPermissions(["update_importacion_de_datos"]);
        temp.delete = store.checkPermissions(["delete_importacion_de_datos"]);
        set_permissions(temp);
        getList({
            page: page,
            limit: docForPage,
            count: true
        });
    }, [location.pathname])
    return (
        <Page title="Lista de Importacion_de_datos" createURL={permissions.create ? "/app/importacion_de_datos/create" : null} permissions="read_importacion_de_datos">
            <IonSearchbar animated={true} debounce={1000} placeholder="Buscar..." onIonInput={e => search(e.target.value)} />
            <IonList className="w-full">
                {list.map((importacion_de_datos, index) => (
                    <React.Fragment key={index}>
                        <IonItem routerLink={`/app/importacion_de_datos/detail/${importacion_de_datos._id}`} routerDirection="forward">
                            <label className="bg-primary px-2 py-1 rounded-full mr-1 text-xs">{index + 1}</label>
                            <IonLabel className="font-semibold">
                                {/* initJSXunidad_academica_importacion */}
{importacion_de_datos?.unidad_academica_importacion?.nombre_unidad_academica}
{/* endJSXunidad_academica_importacion */}
                            </IonLabel>
                            <IonIcon
                                icon={chevronForward}
                                className="cursor-pointer"
                            />
                        </IonItem>
                        <div className="p-4 border-t">
                            {/* initJSXfecha_importacion */}
<p><span className="font-semibold">Fecha de Importacion:</span>{new Date(importacion_de_datos?.fecha_importacion).toLocaleString("es-ES")}</p>
{/* endJSXfecha_importacion */}
{/* initJSXnombre_importado */}
<p><span className="font-semibold">Nombres:</span>{importacion_de_datos?.nombre_importado}</p>
{/* endJSXnombre_importado */}
{/* initJSXapellido_paterno_importado */}
<p><span className="font-semibold">Apellido Paterno:</span>{importacion_de_datos?.apellido_paterno_importado}</p>
{/* endJSXapellido_paterno_importado */}
{/* initJSXapellido_materno_importado */}
<p><span className="font-semibold">Apellido Materno:</span>{importacion_de_datos?.apellido_materno_importado}</p>
{/* endJSXapellido_materno_importado */}
{/* initJSXcarnet_identidad_importacion */}
<p><span className="font-semibold">Carnet de Identidad:</span>{importacion_de_datos?.carnet_identidad_importacion}</p>
{/* endJSXcarnet_identidad_importacion */}
{/* initJSXnumero_celular_importacion */}
<p><span className="font-semibold">Numero de celular:</span>{importacion_de_datos?.numero_celular_importacion}</p>
{/* endJSXnumero_celular_importacion */}
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
                <Importacion_de_datos_report modal={modal} camposInit={[
                    //camposDefault
                ]} />
            </IonModal>
        </Page>
    )
}