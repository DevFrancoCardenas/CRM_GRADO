import Page from "@/components/Page";
import "./Atencion_detail.css";
import { IonAlert, IonContent, IonFab, IonFabButton, IonFabList, IonIcon, IonItem, IonLabel, IonList } from "@ionic/react";
import { chevronDownCircle, create, trash } from "ionicons/icons";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "@/context/store";
import client from "@/api";
export default function Atencion_detail() {
    const location = useLocation();
    const { id } = useParams();
    const history = useHistory();
    const store = useContext(StoreContext);
    const [atencion, set_atencion] = useState({});
    const populate = [
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
        "last_user",
    ];
    function deleteRegister() {
        store.setLoading(true);
        client.delete(`/atencion/delete/${id}`).then(r => {
            history.push('/app/atencion/list');
        });
    }
    useEffect(() => {
        if (id) {
            store.setLoading(true);
            client.post('/atencion/read', {
                query: {
                    find: { _id: id },
                    populate,
                }
            }).then(r => {
                set_atencion(r?.data);
            }).finally(() => store.setLoading(false))
        }
    }, [location.pathname]);
    return (
        <Page title="Ver Atencion" backURL="/app/atencion/list">
            <IonFab slot="fixed" vertical="top" horizontal="end" edge={true}>
                <IonFabButton>
                    <IonIcon icon={chevronDownCircle}></IonIcon>
                </IonFabButton>
                <IonFabList side="bottom">
                    <Link to={`/app/atencion/update/${id}`}>
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
            <p>{atencion?.unidad_academica?.nombre_unidad_academica}</p>
        </IonItem>
{/* endJSXunidad_academica */}
{/* initJSXnombres */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Nombres:</IonLabel>
            <p>{atencion?.nombres}</p>
        </IonItem>
{/* endJSXnombres */}
{/* initJSXapellido_paterno */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Apellido Paterno:</IonLabel>
            <p>{atencion?.apellido_paterno}</p>
        </IonItem>
{/* endJSXapellido_paterno */}
{/* initJSXapellido_materno */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Apellido Materno:</IonLabel>
            <p>{atencion?.apellido_materno}</p>
        </IonItem>
{/* endJSXapellido_materno */}
{/* initJSXcarnet_identidad */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Carnet de Identidad:</IonLabel>
            <p>{atencion?.carnet_identidad}</p>
        </IonItem>
{/* endJSXcarnet_identidad */}
{/* initJSXnumero_celular */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Numero de celular:</IonLabel>
            <p>{atencion?.numero_celular}</p>
        </IonItem>
{/* endJSXnumero_celular */}
{/* initJSXnombre_tutor */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Nombres Tutor:</IonLabel>
            <p>{atencion?.nombre_tutor}</p>
        </IonItem>
{/* endJSXnombre_tutor */}
{/* initJSXapellido_materno_tutor */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Apellido Materno Tutor:</IonLabel>
            <p>{atencion?.apellido_materno_tutor}</p>
        </IonItem>
{/* endJSXapellido_materno_tutor */}
{/* initJSXapellido_paterno_tutor */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Apellido Paterno Tutor:</IonLabel>
            <p>{atencion?.apellido_paterno_tutor}</p>
        </IonItem>
{/* endJSXapellido_paterno_tutor */}
{/* initJSXnumero_celular_tutor */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Numero de celular Tutor:</IonLabel>
            <p>{atencion?.numero_celular_tutor}</p>
        </IonItem>
{/* endJSXnumero_celular_tutor */}
{/* initJSXfecha_atencion */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Fecha de Atencion:</IonLabel>
            <p>{new Date(atencion?.fecha_atencion).toLocaleString("es-ES")}</p>
        </IonItem>
{/* endJSXfecha_atencion */}
{/* initJSXotras_carreras */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Otras Carreras:</IonLabel>
            <p>{atencion?.otras_carreras}</p>
        </IonItem>
{/* endJSXotras_carreras */}
{/* initJSXgestion_bachiller */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Gestion Bachiller:</IonLabel>
            <p>{atencion?.gestion_bachiller}</p>
        </IonItem>
{/* endJSXgestion_bachiller */}
{/* initJSXcolegio */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Colegio:</IonLabel>
            <p>{atencion?.colegio}</p>
        </IonItem>
{/* endJSXcolegio */}
{/* initJSXtipo_colegio */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Tipo Colegio:</IonLabel>
            <p>{atencion?.tipo_colegio}</p>
        </IonItem>
{/* endJSXtipo_colegio */}
{/* initJSXprovincia */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Provincia:</IonLabel>
            <p>{atencion?.provincia}</p>
        </IonItem>
{/* endJSXprovincia */}
{/* initJSXcomo_te_enteraste_emi */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">¿Como te Enteraste de Nosotros?:</IonLabel>
            <p>{atencion?.como_te_enteraste_emi}</p>
        </IonItem>
{/* endJSXcomo_te_enteraste_emi */}
{/* initJSXotro_metodo_capatacion */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">¿Otro medio de captacion?:</IonLabel>
            <p>{atencion?.otro_metodo_capatacion}</p>
        </IonItem>
{/* endJSXotro_metodo_capatacion */}
{/* initJSXhora_clase */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Hr. de Clases:</IonLabel>
            <p>{atencion?.hora_clase}</p>
        </IonItem>
{/* endJSXhora_clase */}
{/* initJSXobservacion */}
            <IonItem>
                <IonLabel position="stacked" className="font-bold">Observacion:</IonLabel>
                <p style={{ whiteSpace: 'pre-wrap' }}>{atencion?.observacion}</p>
            </IonItem>
{/* endJSXobservacion */}
{/* initJSXestado */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Estado:</IonLabel>
            <p>{atencion?.estado}</p>
        </IonItem>
{/* endJSXestado */}
{/* initJSXasesor */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Asesor:</IonLabel>
            <p>{atencion?.asesor?.name}</p>
        </IonItem>
{/* endJSXasesor */}
{/* initJSXdepartamento */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Departamento:</IonLabel>
            <p>{atencion?.departamento}</p>
        </IonItem>
{/* endJSXdepartamento */}
{/* initJSXcarreras */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Carrera:</IonLabel>
            <p>{atencion?.carreras?.nombre_carrera}</p>
        </IonItem>
{/* endJSXcarreras */}
{/* initJSXnombre_completo */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Nombre Completo:</IonLabel>
            <p>{atencion?.nombre_completo}</p>
        </IonItem>
{/* endJSXnombre_completo */}
{/* fieldsDetail */}
                    <IonItem>
                        <IonLabel position="stacked" className="font-bold">Último Editor:</IonLabel>
                        <p>{atencion?.last_user?.name}</p>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked" className="font-bold">Fecha de Creación:</IonLabel>
                        <p>{new Date(atencion?.createdAt).toLocaleString("es-ES")}</p>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked" className="font-bold">Fecha de Actualización:</IonLabel>
                        <p>{new Date(atencion?.updatedAt).toLocaleString("es-ES")}</p>
                    </IonItem>
                </IonList>
            </IonContent>
        </Page>
    )
}