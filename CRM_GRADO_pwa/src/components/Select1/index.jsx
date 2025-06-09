import React from 'react';
import { IonItem, IonSelect, IonSelectOption } from '@ionic/react';

function Select({ label, options = [], field = "name", value, setValue, className, name = null,
    labelPlacement = "floating"
}) {

    const handleChange = (val) => {
        if (name)
            setValue(prevState => ({
                ...prevState,
                [name]: val
            }));
        else
            setValue(val);
    };

    return (
        <IonItem className={"w-full " + className}>
            <IonSelect label={label} labelPlacement={labelPlacement} value={value} onIonChange={e => handleChange(e.detail.value)}>
                {options.map((option, index) => {
                    const val = option instanceof Object ? option._id : option;
                    const text = option instanceof Object ? option[field] : option;

                    return (
                        <IonSelectOption
                            key={index}
                            value={val}
                        >
                            {text}
                        </IonSelectOption>
                    );
                })}
            </IonSelect>
        </IonItem>
    );
}
export default Select;