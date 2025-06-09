import Page from "@/components/Page";
import "./Metas_detail.css";
import { IonAlert, IonContent, IonFab, IonFabButton, IonFabList, IonIcon, IonItem, IonLabel, IonList } from "@ionic/react";
import { chevronDownCircle, create, trash } from "ionicons/icons";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "@/context/store";
import client from "@/api";
export default function Metas_detail() {
    const location = useLocation();
    const { id } = useParams();
    const history = useHistory();
    const store = useContext(StoreContext);
    const [metas, set_metas] = useState({});
    const populate = [
        //initJSunidad_academica
"unidad_academica",
//endJSunidad_academica
//foreigns
        "last_user",
    ];
    function deleteRegister() {
        store.setLoading(true);
        client.delete(`/metas/delete/${id}`).then(r => {
            history.push('/app/metas/list');
        });
    }
    useEffect(() => {
        if (id) {
            store.setLoading(true);
            client.post('/metas/read', {
                query: {
                    find: { _id: id },
                    populate,
                }
            }).then(r => {
                set_metas(r?.data);
            }).finally(() => store.setLoading(false))
        }
    }, [location.pathname]);
    return (
        <Page title="Ver Metas" backURL="/app/metas/list">
            <IonFab slot="fixed" vertical="top" horizontal="end" edge={true}>
                <IonFabButton>
                    <IonIcon icon={chevronDownCircle}></IonIcon>
                </IonFabButton>
                <IonFabList side="bottom">
                    <Link to={`/app/metas/update/${id}`}>
                        <IonFabButton>
                            <IonIcon color="primary" icon={create}></IonIcon>
                        </IonFabButton>
                    </Link>
                    <IonFabButton id="present-alert">
                        <IonIcon color="danger" icon={trash}></IonIcon>
                    </IonFabButton>
                </IonFabList>
            </IonFab>
            {/* CONFIRM DELETE */}
            <IonAlert
                header="Alerta!"
                message='Esta seguro que desea eliminar el registro?'
                trigger="present-alert"
                buttons={[
                    {
                        text: 'Cancelar',
                        role: 'cancel',
                        cssClass: 'alert-button-cancel',
                        handler: () => {
                            console.log('Alert canceled');
                        },
                    },
                    {
                        text: 'Confirmar',
                        role: 'confirm',
                        cssClass: 'alert-button-danger',
                        handler: () => {
                            console.log('Alert confirmed');
                            deleteRegister();
                        },
                    },
                ]}
                onDidDismiss={({ detail }) => console.log(`Dismissed with role: ${detail.role}`)}
            ></IonAlert>
            <IonContent>
                <IonList>
                    {/* initJSXunidad_academica */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Unidad Academica:</IonLabel>
            <p>{metas?.unidad_academica?.nombre_unidad_academica}</p>
        </IonItem>
{/* endJSXunidad_academica */}
{/* initJSXgestion */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Gestion:</IonLabel>
            <p>{metas?.gestion}</p>
        </IonItem>
{/* endJSXgestion */}
{/* initJSXmeta */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Meta cantidad de inscritos:</IonLabel>
            <p>{metas?.meta}</p>
        </IonItem>
{/* endJSXmeta */}
{/* initJSXmes_gestion */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Mes:</IonLabel>
            <p>{metas?.mes_gestion}</p>
        </IonItem>
{/* endJSXmes_gestion */}
{/* initJSXcantidad_atendidos_plataforma */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Cantidad de Atendidos en el mes:</IonLabel>
            <p>{metas?.cantidad_atendidos_plataforma}</p>
        </IonItem>
{/* endJSXcantidad_atendidos_plataforma */}
{/* initJSXcantidad_ganados_mes */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Cantidad de ganados mes:</IonLabel>
            <p>{metas?.cantidad_ganados_mes}</p>
        </IonItem>
{/* endJSXcantidad_ganados_mes */}
{/* initJSXcantidad_perdidos_mes */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Cantidad de perdidos mes:</IonLabel>
            <p>{metas?.cantidad_perdidos_mes}</p>
        </IonItem>
{/* endJSXcantidad_perdidos_mes */}
{/* initJSXindicador_atencion */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Indicador de atencion:</IonLabel>
            <p>{metas?.indicador_atencion}</p>
        </IonItem>
{/* endJSXindicador_atencion */}
{/* initJSXfecha_registro */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Fecha:</IonLabel>
            <p>{new Date(metas?.fecha_registro).toLocaleString("es-ES")}</p>
        </IonItem>
{/* endJSXfecha_registro */}
{/* fieldsDetail */}
                    <IonItem>
                        <IonLabel position="stacked" className="font-bold">Último Editor:</IonLabel>
                        <p>{metas?.last_user?.name}</p>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked" className="font-bold">Fecha de Creación:</IonLabel>
                        <p>{new Date(metas?.createdAt).toLocaleString("es-ES")}</p>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked" className="font-bold">Fecha de Actualización:</IonLabel>
                        <p>{new Date(metas?.updatedAt).toLocaleString("es-ES")}</p>
                    </IonItem>
                </IonList>
            </IonContent>
        </Page>
    )
}