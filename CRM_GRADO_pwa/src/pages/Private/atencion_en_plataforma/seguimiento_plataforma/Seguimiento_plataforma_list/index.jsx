import Page from "@/components/Page";
import { IonFab, IonFabButton, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel, IonList, IonModal, IonSearchbar } from "@ionic/react";
import "./Seguimiento_plataforma_list.css";
import { chevronForward, print } from "ionicons/icons";
import React, { useContext, useEffect, useRef, useState } from "react";
import { StoreContext } from "@/context/store";
import client from "@/api";
import { useLocation } from "react-router";
import Seguimiento_plataforma_report from "./Seguimiento_plataforma_report";
const docForPage = 50;
export default function Seguimiento_plataforma_list() {
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
        //initJStipo_seguimiento
"tipo_seguimiento",
//endJStipo_seguimiento
//initJSnombre_atencion
"nombre_atencion",
//endJSnombre_atencion
//foreigns
    ];
    function getList(query) {
        store.setLoading(true);
        client.post('/seguimiento_plataforma/list', {
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
            client.post('/seguimiento_plataforma/list', {
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
        temp.read = store.checkPermissions(["read_seguimiento_plataforma"]);
        temp.create = store.checkPermissions(["create_seguimiento_plataforma"]);
        temp.report = store.checkPermissions(["report_seguimiento_plataforma"]);
        temp.update = store.checkPermissions(["update_seguimiento_plataforma"]);
        temp.delete = store.checkPermissions(["delete_seguimiento_plataforma"]);
        set_permissions(temp);
        getList({
            page: page,
            limit: docForPage,
            count: true
        });
    }, [location.pathname])
    return (
        <Page title="Lista de Seguimiento_plataforma" createURL={permissions.create ? "/app/seguimiento_plataforma/create" : null} permissions="read_seguimiento_plataforma">
            <IonSearchbar animated={true} debounce={1000} placeholder="Buscar..." onIonInput={e => search(e.target.value)} />
            <IonList className="w-full">
                {list.map((seguimiento_plataforma, index) => (
                    <React.Fragment key={index}>
                        <IonItem routerLink={`/app/seguimiento_plataforma/detail/${seguimiento_plataforma._id}`} routerDirection="forward">
                            <label className="bg-primary px-2 py-1 rounded-full mr-1 text-xs">{index + 1}</label>
                            <IonLabel className="font-semibold">
                                {/* initJSXfecha_seguimiento */}
{new Date(seguimiento_plataforma?.fecha_seguimiento).toLocaleString("es-ES")}
{/* endJSXfecha_seguimiento */}
                            </IonLabel>
                            <IonIcon
                                icon={chevronForward}
                                className="cursor-pointer"
                            />
                        </IonItem>
                        <div className="p-4 border-t">
                            {/* initJSXtipo_seguimiento */}
<p><span className="font-semibold">Tipo de Seguimiento:</span>{seguimiento_plataforma?.tipo_seguimiento?.tipo_de_seguimiento}</p>
{/* endJSXtipo_seguimiento */}
{/* initJSXestado_seguimiento */}
<p><span className="font-semibold">Estado:</span>{seguimiento_plataforma?.estado_seguimiento}</p>
{/* endJSXestado_seguimiento */}
{/* initJSXobservacion_seguimiento_plataforma */}
<p style={{ whiteSpace: "pre-wrap" }}><span className="font-semibold">Observacion:</span>{seguimiento_plataforma?.observacion_seguimiento_plataforma}</p>
{/* endJSXobservacion_seguimiento_plataforma */}
{/* initJSXnombre_atencion */}
<p><span className="font-semibold">Nombre Completo:</span>{seguimiento_plataforma?.nombre_atencion?.nombre_completo}</p>
{/* endJSXnombre_atencion */}
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
                <Seguimiento_plataforma_report modal={modal} camposInit={[
                    //camposDefault
                ]} />
            </IonModal>
        </Page>
    )
}