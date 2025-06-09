import Page from "@/components/Page";
import "./Seguimiento_plataforma_detail.css";
import { IonAlert, IonContent, IonFab, IonFabButton, IonFabList, IonIcon, IonItem, IonLabel, IonList } from "@ionic/react";
import { chevronDownCircle, create, trash } from "ionicons/icons";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "@/context/store";
import client from "@/api";
export default function Seguimiento_plataforma_detail() {
    const location = useLocation();
    const { id } = useParams();
    const history = useHistory();
    const store = useContext(StoreContext);
    const [seguimiento_plataforma, set_seguimiento_plataforma] = useState({});
    const populate = [
        //initJStipo_seguimiento
"tipo_seguimiento",
//endJStipo_seguimiento
//initJSnombre_atencion
"nombre_atencion",
//endJSnombre_atencion
//foreigns
        "last_user",
    ];
    function deleteRegister() {
        store.setLoading(true);
        client.delete(`/seguimiento_plataforma/delete/${id}`).then(r => {
            history.push('/app/seguimiento_plataforma/list');
        });
    }
    useEffect(() => {
        if (id) {
            store.setLoading(true);
            client.post('/seguimiento_plataforma/read', {
                query: {
                    find: { _id: id },
                    populate,
                }
            }).then(r => {
                set_seguimiento_plataforma(r?.data);
            }).finally(() => store.setLoading(false))
        }
    }, [location.pathname]);
    return (
        <Page title="Ver Seguimiento_plataforma" backURL="/app/seguimiento_plataforma/list">
            <IonFab slot="fixed" vertical="top" horizontal="end" edge={true}>
                <IonFabButton>
                    <IonIcon icon={chevronDownCircle}></IonIcon>
                </IonFabButton>
                <IonFabList side="bottom">
                    <Link to={`/app/seguimiento_plataforma/update/${id}`}>
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
                    {/* initJSXfecha_seguimiento */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Fecha Seguimiento:</IonLabel>
            <p>{new Date(seguimiento_plataforma?.fecha_seguimiento).toLocaleString("es-ES")}</p>
        </IonItem>
{/* endJSXfecha_seguimiento */}
{/* initJSXtipo_seguimiento */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Tipo de Seguimiento:</IonLabel>
            <p>{seguimiento_plataforma?.tipo_seguimiento?.tipo_de_seguimiento}</p>
        </IonItem>
{/* endJSXtipo_seguimiento */}
{/* initJSXestado_seguimiento */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Estado:</IonLabel>
            <p>{seguimiento_plataforma?.estado_seguimiento}</p>
        </IonItem>
{/* endJSXestado_seguimiento */}
{/* initJSXobservacion_seguimiento_plataforma */}
            <IonItem>
                <IonLabel position="stacked" className="font-bold">Observacion:</IonLabel>
                <p style={{ whiteSpace: 'pre-wrap' }}>{seguimiento_plataforma?.observacion_seguimiento_plataforma}</p>
            </IonItem>
{/* endJSXobservacion_seguimiento_plataforma */}
{/* initJSXnombre_atencion */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Nombre Completo:</IonLabel>
            <p>{seguimiento_plataforma?.nombre_atencion?.nombre_completo}</p>
        </IonItem>
{/* endJSXnombre_atencion */}
{/* fieldsDetail */}
                    <IonItem>
                        <IonLabel position="stacked" className="font-bold">Último Editor:</IonLabel>
                        <p>{seguimiento_plataforma?.last_user?.name}</p>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked" className="font-bold">Fecha de Creación:</IonLabel>
                        <p>{new Date(seguimiento_plataforma?.createdAt).toLocaleString("es-ES")}</p>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked" className="font-bold">Fecha de Actualización:</IonLabel>
                        <p>{new Date(seguimiento_plataforma?.updatedAt).toLocaleString("es-ES")}</p>
                    </IonItem>
                </IonList>
            </IonContent>
        </Page>
    )
}