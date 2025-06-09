import Page from "@/components/Page";
import "./Importacion_de_datos_detail.css";
import { IonAlert, IonContent, IonFab, IonFabButton, IonFabList, IonIcon, IonItem, IonLabel, IonList } from "@ionic/react";
import { chevronDownCircle, create, trash } from "ionicons/icons";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "@/context/store";
import client from "@/api";
export default function Importacion_de_datos_detail() {
    const location = useLocation();
    const { id } = useParams();
    const history = useHistory();
    const store = useContext(StoreContext);
    const [importacion_de_datos, set_importacion_de_datos] = useState({});
    const populate = [
        //initJSunidad_academica_importacion
"unidad_academica_importacion",
//endJSunidad_academica_importacion
//foreigns
        "last_user",
    ];
    function deleteRegister() {
        store.setLoading(true);
        client.delete(`/importacion_de_datos/delete/${id}`).then(r => {
            history.push('/app/importacion_de_datos/list');
        });
    }
    useEffect(() => {
        if (id) {
            store.setLoading(true);
            client.post('/importacion_de_datos/read', {
                query: {
                    find: { _id: id },
                    populate,
                }
            }).then(r => {
                set_importacion_de_datos(r?.data);
            }).finally(() => store.setLoading(false))
        }
    }, [location.pathname]);
    return (
        <Page title="Ver Importacion_de_datos" backURL="/app/importacion_de_datos/list">
            <IonFab slot="fixed" vertical="top" horizontal="end" edge={true}>
                <IonFabButton>
                    <IonIcon icon={chevronDownCircle}></IonIcon>
                </IonFabButton>
                <IonFabList side="bottom">
                    <Link to={`/app/importacion_de_datos/update/${id}`}>
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
                    {/* initJSXunidad_academica_importacion */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Unidad Academica:</IonLabel>
            <p>{importacion_de_datos?.unidad_academica_importacion?.nombre_unidad_academica}</p>
        </IonItem>
{/* endJSXunidad_academica_importacion */}
{/* initJSXfecha_importacion */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Fecha de Importacion:</IonLabel>
            <p>{new Date(importacion_de_datos?.fecha_importacion).toLocaleString("es-ES")}</p>
        </IonItem>
{/* endJSXfecha_importacion */}
{/* initJSXnombre_importado */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Nombres:</IonLabel>
            <p>{importacion_de_datos?.nombre_importado}</p>
        </IonItem>
{/* endJSXnombre_importado */}
{/* initJSXapellido_paterno_importado */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Apellido Paterno:</IonLabel>
            <p>{importacion_de_datos?.apellido_paterno_importado}</p>
        </IonItem>
{/* endJSXapellido_paterno_importado */}
{/* initJSXapellido_materno_importado */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Apellido Materno:</IonLabel>
            <p>{importacion_de_datos?.apellido_materno_importado}</p>
        </IonItem>
{/* endJSXapellido_materno_importado */}
{/* initJSXcarnet_identidad_importacion */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Carnet de Identidad:</IonLabel>
            <p>{importacion_de_datos?.carnet_identidad_importacion}</p>
        </IonItem>
{/* endJSXcarnet_identidad_importacion */}
{/* initJSXnumero_celular_importacion */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Numero de celular:</IonLabel>
            <p>{importacion_de_datos?.numero_celular_importacion}</p>
        </IonItem>
{/* endJSXnumero_celular_importacion */}
{/* initJSXnombre_tutor_impotado */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Nombre de tutor:</IonLabel>
            <p>{importacion_de_datos?.nombre_tutor_impotado}</p>
        </IonItem>
{/* endJSXnombre_tutor_impotado */}
{/* initJSXapellido_paterno_tutor_importado */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Apellido Paterno Tutor:</IonLabel>
            <p>{importacion_de_datos?.apellido_paterno_tutor_importado}</p>
        </IonItem>
{/* endJSXapellido_paterno_tutor_importado */}
{/* initJSXapellido_materno_tutor_importado */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Apellido Materno Tutor:</IonLabel>
            <p>{importacion_de_datos?.apellido_materno_tutor_importado}</p>
        </IonItem>
{/* endJSXapellido_materno_tutor_importado */}
{/* initJSXcelular_tutor_importado */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Celular tutor:</IonLabel>
            <p>{importacion_de_datos?.celular_tutor_importado}</p>
        </IonItem>
{/* endJSXcelular_tutor_importado */}
{/* initJSXcarrera_interes */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Carrera de Interes:</IonLabel>
            <p>{importacion_de_datos?.carrera_interes}</p>
        </IonItem>
{/* endJSXcarrera_interes */}
{/* initJSXgestion_bachiller_importado */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Gestion Bachiller:</IonLabel>
            <p>{importacion_de_datos?.gestion_bachiller_importado}</p>
        </IonItem>
{/* endJSXgestion_bachiller_importado */}
{/* initJSXcolegio_importado */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Colegio:</IonLabel>
            <p>{importacion_de_datos?.colegio_importado}</p>
        </IonItem>
{/* endJSXcolegio_importado */}
{/* initJSXtipo_colegio_importado */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Tipo Colegio:</IonLabel>
            <p>{importacion_de_datos?.tipo_colegio_importado}</p>
        </IonItem>
{/* endJSXtipo_colegio_importado */}
{/* initJSXdepartamento_importado */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Departamento:</IonLabel>
            <p>{importacion_de_datos?.departamento_importado}</p>
        </IonItem>
{/* endJSXdepartamento_importado */}
{/* initJSXprovincia_importado */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Provincia:</IonLabel>
            <p>{importacion_de_datos?.provincia_importado}</p>
        </IonItem>
{/* endJSXprovincia_importado */}
{/* initJSXhorario_clases_importado */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Hr. de Clases:</IonLabel>
            <p>{importacion_de_datos?.horario_clases_importado}</p>
        </IonItem>
{/* endJSXhorario_clases_importado */}
{/* initJSXtipo_visita_importada */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">tipo visita:</IonLabel>
            <p>{importacion_de_datos?.tipo_visita_importada}</p>
        </IonItem>
{/* endJSXtipo_visita_importada */}
{/* fieldsDetail */}
                    <IonItem>
                        <IonLabel position="stacked" className="font-bold">Último Editor:</IonLabel>
                        <p>{importacion_de_datos?.last_user?.name}</p>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked" className="font-bold">Fecha de Creación:</IonLabel>
                        <p>{new Date(importacion_de_datos?.createdAt).toLocaleString("es-ES")}</p>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked" className="font-bold">Fecha de Actualización:</IonLabel>
                        <p>{new Date(importacion_de_datos?.updatedAt).toLocaleString("es-ES")}</p>
                    </IonItem>
                </IonList>
            </IonContent>
        </Page>
    )
}