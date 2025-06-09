import React from 'react';
import { IonCheckbox, IonItem, IonLabel, IonList } from "@ionic/react";
import './MultiCheckbox.css';

export default function MultiCheckbox({ label, options = [], field = "name", value, setValue, className, name = null }) {
    // Maneja el cambio en los checkbox
    const handleChange = (val, isChecked) => {
        var newArray = [];
        if (isChecked)
            newArray = [...value, val];
        else
            newArray = value.filter(v => v !== val);
        if (name)
            setValue(prevState => ({
                ...prevState,
                [name]: newArray
            }));
        else
            setValue(newArray);
    };

    return (
        <>
            {label && (
                <IonItem>
                    <IonLabel className="multi-checkbox-label">{label}:</IonLabel>
                </IonItem>
            )}
            <IonItem>
                <IonList className={"w-full " + className}>

                    {options.map((option, index) => {
                        const val = option instanceof Object ? option._id : option;
                        const text = option instanceof Object ? option[field] : option;

                        return (
                            <IonItem key={index}>
                                <IonCheckbox
                                    justify="space-between"
                                    checked={value.includes(val)}
                                    onIonChange={e => handleChange(val, e.detail.checked)}
                                >
                                    {text}
                                </IonCheckbox>
                            </IonItem>
                        );
                    })}
                </IonList>
            </IonItem>
        </>
    );
}
