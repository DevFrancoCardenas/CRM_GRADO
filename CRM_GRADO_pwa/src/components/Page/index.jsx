import React from 'react';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonMenuButton, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import "./Page.css";
import { addCircleOutline, addCircleSharp } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import PermissionCheck from '../PermissionCheck';

export default function Page({ title, backURL, createURL, children, permissions = [] }) {
    return (
        <PermissionCheck permissions={permissions}>
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            {backURL ?
                                <IonBackButton defaultHref={backURL} />
                                : <IonMenuButton />}
                        </IonButtons>
                        <IonTitle>{title}</IonTitle>
                        {createURL &&
                            <IonButtons slot="end">
                                <Link to={createURL}>
                                    <IonButton color="success" size="large" shape="round">
                                        <IonIcon ios={addCircleOutline} md={addCircleSharp} />
                                    </IonButton>
                                </Link>
                            </IonButtons>
                        }
                    </IonToolbar>
                </IonHeader>

                <IonContent fullscreen>
                    <IonHeader collapse="condense">
                        <IonToolbar>
                            <IonTitle size="large">{title}</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    {/* Aquí renderiza el contenido adicional pasado como prop */}
                    {children}
                </IonContent>
            </IonPage>
        </PermissionCheck>
    );
};
