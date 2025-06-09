import Page from "@/components/Page";
import { IonFab, IonFabButton, IonFabList, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel, IonList, IonSearchbar } from "@ionic/react";
import "./Group_list.css";
import { chevronForward, chevronUpCircle, document, download, print } from "ionicons/icons";
import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "@/context/store";
import client from "@/api";
import BadgeBool from "@/components/BadgeBool";
import { useLocation } from "react-router";

const docForPage = 100;

export default function Group_list() {
    const location = useLocation();
    const store = useContext(StoreContext);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [sort, setSort] = useState(null);
    const [total, setTotal] = useState(0);
    const [list, setList] = useState([]);
    const [find, setFind] = useState({});
    const [permissions, set_permissions] = useState({});

    function getList(query) {
        store.setLoading(true);
        client.post('/group/list', {
            query
        }).then(r => {
            setList(r.data.list);
            if (r?.data?.count) {
                setTotal(r.data.count);
                setMaxPage(Math.ceil(r.data.count / docForPage));
            }
        }).finally(() => {
            store.setLoading(false);
        });
    }

    function nextPage(ev) {
        if (page < maxPage) {
            client.post('/group/list', {
                query: {
                    find: find,
                    page: page + 1,
                    limit: docForPage,
                    sort: sort,
                    count: false,
                    populate: ['permissions']
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
                { groupname: { $regex: value, $options: 'i' } },
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
            count: true,
            populate: ['permissions']
        });
    }

    useEffect(() => {
        var temp = {};
        temp.create = store.checkPermissions(["create_group"]);
        temp.read = store.checkPermissions(["read_group"]);
        temp.update = store.checkPermissions(["update_group"]);
        temp.delete = store.checkPermissions(["delete_group"]);
        set_permissions(temp);
        getList({
            page: page,
            limit: docForPage,
            count: true,
            populate: ['permissions']
        });
    }, [location.pathname])

    return (
        <Page title="Lista de Grupos" createURL={permissions.create ? "/app/group/create" : null} permissions="read_group">
            <IonSearchbar animated={true} debounce={1000} placeholder="Buscar..." onIonInput={e => search(e.target.value)} />
            <IonList className="w-full">
                {list.map((group, index) => (
                    <React.Fragment key={index}>
                        <IonItem routerLink={`/app/group/detail/${group._id}`} routerDirection="forward">
                            <label className="bg-primary p-1 rounded-full mr-1 text-xs">{index + 1}</label>
                            <IonLabel>{group.name}</IonLabel>
                            <IonIcon
                                icon={chevronForward}
                                className="cursor-pointer"
                            />
                        </IonItem>
                        <div className="p-4 border-t">
                            <p>
                                <span className="font-semibold">Permisos:</span> {group?.permissions?.map(permission => permission.name).join(", ")}
                            </p>
                        </div>
                    </React.Fragment>
                ))}
            </IonList>
            <IonInfiniteScroll onIonInfinite={(ev) => nextPage(ev)}>
                <IonInfiniteScrollContent loadingText="Cargando..." loadingSpinner="bubbles" />
            </IonInfiniteScroll>

            <IonFab slot="fixed" vertical="bottom" horizontal="end">
                <IonFabButton>
                    <IonIcon icon={chevronUpCircle}></IonIcon>
                </IonFabButton>
                <IonFabList side="top">
                    <IonFabButton>
                        <IonIcon icon={print}></IonIcon>
                    </IonFabButton>
                    <IonFabButton>
                        <IonIcon icon={download}></IonIcon>
                    </IonFabButton>
                    <IonFabButton>
                        <IonIcon icon={document}></IonIcon>
                    </IonFabButton>
                </IonFabList>
            </IonFab>
        </Page>
    )
}