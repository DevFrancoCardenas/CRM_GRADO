import Page from "@/components/Page";
import { IonFab, IonFabButton, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel, IonList, IonModal, IonSearchbar } from "@ionic/react";
import "./Metas_list.css";
import { chevronForward, print } from "ionicons/icons";
import React, { useContext, useEffect, useRef, useState } from "react";
import { StoreContext } from "@/context/store";
import client from "@/api";
import { useLocation } from "react-router";
import Metas_report from "./Metas_report";
const docForPage = 50;
export default function Metas_list() {
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
//foreigns
    ];
    function getList(query) {
        store.setLoading(true);
        client.post('/metas/list', {
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
            client.post('/metas/list', {
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
        temp.read = store.checkPermissions(["read_metas"]);
        temp.create = store.checkPermissions(["create_metas"]);
        temp.report = store.checkPermissions(["report_metas"]);
        temp.update = store.checkPermissions(["update_metas"]);
        temp.delete = store.checkPermissions(["delete_metas"]);
        set_permissions(temp);
        getList({
            page: page,
            limit: docForPage,
            count: true
        });
    }, [location.pathname])
    return (
        <Page title="Lista de Metas" createURL={permissions.create ? "/app/metas/create" : null} permissions="read_metas">
            <IonSearchbar animated={true} debounce={1000} placeholder="Buscar..." onIonInput={e => search(e.target.value)} />
            <IonList className="w-full">
                {list.map((metas, index) => (
                    <React.Fragment key={index}>
                        <IonItem routerLink={`/app/metas/detail/${metas._id}`} routerDirection="forward">
                            <label className="bg-primary px-2 py-1 rounded-full mr-1 text-xs">{index + 1}</label>
                            <IonLabel className="font-semibold">
                                {/* initJSXunidad_academica */}
{metas?.unidad_academica?.nombre_unidad_academica}
{/* endJSXunidad_academica */}
                            </IonLabel>
                            <IonIcon
                                icon={chevronForward}
                                className="cursor-pointer"
                            />
                        </IonItem>
                        <div className="p-4 border-t">
                            {/* initJSXgestion */}
<p><span className="font-semibold">Gestion:</span>{metas?.gestion}</p>
{/* endJSXgestion */}
{/* initJSXmeta */}
<p><span className="font-semibold">Meta cantidad de inscritos:</span>{metas?.meta}</p>
{/* endJSXmeta */}
{/* initJSXmes_gestion */}
<p><span className="font-semibold">Mes:</span>{metas?.mes_gestion}</p>
{/* endJSXmes_gestion */}
{/* initJSXcantidad_atendidos_plataforma */}
<p><span className="font-semibold">Cantidad de Atendidos en el mes:</span>{metas?.cantidad_atendidos_plataforma}</p>
{/* endJSXcantidad_atendidos_plataforma */}
{/* initJSXcantidad_ganados_mes */}
<p><span className="font-semibold">Cantidad de ganados mes:</span>{metas?.cantidad_ganados_mes}</p>
{/* endJSXcantidad_ganados_mes */}
{/* initJSXindicador_atencion */}
<p><span className="font-semibold">Indicador de atencion:</span>{metas?.indicador_atencion}</p>
{/* endJSXindicador_atencion */}
{/* initJSXfecha_registro */}
<p><span className="font-semibold">Fecha:</span>{new Date(metas?.fecha_registro).toLocaleString("es-ES")}</p>
{/* endJSXfecha_registro */}
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
                <Metas_report modal={modal} camposInit={[
                    //camposDefault
                ]} />
            </IonModal>
        </Page>
    )
}