import React, { useState, useRef, useEffect } from 'react';
import {
    IonButtons,
    IonButton,
    IonModal,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonPage,
    useIonActionSheet,
} from '@ionic/react';

export default function Confirm({ page }) {
    const modal = useRef(null);

    const [presentingElement, setPresentingElement] = useState(null);
    const [present] = useIonActionSheet();

    useEffect(() => {
        setPresentingElement(page?.current);
    }, []);

    function dismiss() {
        modal.current?.dismiss();
    }

    function canDismiss() {
        return new Promise ((resolve, reject) => {
            present({
                header: 'Are you sure?',
                buttons: [
                    {
                        text: 'Yes',
                        role: 'confirm',
                    },
                    {
                        text: 'No',
                        role: 'cancel',
                    },
                ],
                onWillDismiss: (ev) => {
                    if (ev.detail.role === 'confirm') {
                        resolve(true);
                    } else {
                        reject();
                    }
                },
            });
        });
    }

    return (
        <IonContent className="ion-padding">
            <IonButton id="open-modal" expand="block">
                Open
            </IonButton>
            <IonModal ref={modal} trigger="open-modal" canDismiss={canDismiss} presentingElement={presentingElement}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Modal</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={() => dismiss()}>Close</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <p>You will be prompted when closing this modal.</p>
                </IonContent>
            </IonModal>
        </IonContent>
    );
}