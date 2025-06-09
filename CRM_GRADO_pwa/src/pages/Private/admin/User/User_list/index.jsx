import Page from "@/components/Page";
import { IonFab, IonFabButton, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel, IonList, IonModal, IonSearchbar } from "@ionic/react";
import "./User_list.css";
import { chevronForward, print } from "ionicons/icons";
import React, { useContext, useEffect, useRef, useState } from "react";
import { StoreContext } from "@/context/store";
import client from "@/api";
import BadgeBool from "@/components/BadgeBool";
import { useLocation } from "react-router";
import User_report from "./User_report";

const docForPage = 100;

export default function User_list() {
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

    function getList(query) {
        store.setLoading(true);
        client.post('/user/list', {
            query
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
            client.post('/user/list', {
                query: {
                    find: find,
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
        var obj = {
            $or: [
                { name: { $regex: value, $options: 'i' } },
                { username: { $regex: value, $options: 'i' } },
                { email: { $regex: value, $options: 'i' } },
                { createdAt: { $gte: new Date(value) } },
                { updatedAt: { $lte: new Date(value) } },
            ]
        }
        setFind(obj);
        setPage(1);
        getList({
            page: 1,
            limit: docForPage,
            find: obj,
            count: true
        });
    }

    useEffect(() => {
        var temp = {};
        temp.create = store.checkPermissions(["create_user"]);
        temp.read = store.checkPermissions(["read_user"]);
        temp.update = store.checkPermissions(["update_user"]);
        temp.delete = store.checkPermissions(["delete_user"]);
        set_permissions(temp);
        getList({
            page: page,
            limit: docForPage,
            count: true
        });
    }, [location.pathname])

    return (
        <Page title="Lista de Usuarios" createURL={permissions.create ? "/app/user/create" : null} permissions="read_user">
            <IonSearchbar animated={true} debounce={1000} placeholder="Buscar..." onIonInput={e => search(e.target.value)} />
            <IonList className="w-full">
                {list.map((user, index) => (
                    <React.Fragment key={index}>
                        <IonItem routerLink={`/app/user/detail/${user._id}`} routerDirection="forward">
                            <label className="bg-primary px-2 py-1 rounded-full mr-1 text-xs">{index + 1}</label>
                            <IonLabel className="font-semibold">{user.name}</IonLabel>
                            <IonIcon
                                icon={chevronForward}
                                className="cursor-pointer"
                            />
                        </IonItem>
                        <div className="p-4 border-t">
                            <p>
                                <span className="font-semibold">Email:</span> {user.email}
                            </p>
                            <p>
                                <span className="font-semibold">Estado:</span> <BadgeBool value={user.is_active} si="Activo" no="Desactivado" />
                            </p>
                            <p>
                                <span className="font-semibold">Administrador:</span> <BadgeBool value={user.is_admin} />
                            </p>
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
                <User_report modal={modal} camposInit={["name", "username", "createdAt"]} />
            </IonModal>
        </Page>
    )
}