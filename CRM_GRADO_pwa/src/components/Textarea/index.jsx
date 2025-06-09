import React, { useState } from 'react';
import { IonItem, IonTextarea } from '@ionic/react';
import './Input.css';

function Textarea({
    type = "text", label = "Input", labelPlacement = "floating",
    helperText = "", errorText = "", validateFunction = null,
    clearInput = true, value = null, setValue = () => { }, maxlength = null,
    required = false, name = null, setValidate = () => { }, className = "",
    min = null, max = null, placeholder = null, readOnly = false
}) {
    const [isTouched, setIsTouched] = useState(false);
    const [isValid, setIsValid] = useState();

    function handleInputChange(e) {
        if (name)
            setValue(prevState => ({
                ...prevState,
                [name]: e.target.value
            }));
        else
            setValue(e.target.value);
    }

    const validate = (ev) => {
        const valueIn = ev.target.value;

        var isValidT = false;

        if (valueIn === '')
            isValidT = true;
        else {
            var validateF = false;
            if (validateFunction) {
                validateF = validateFunction(valueIn);
            } else {
                if (type == "email") {
                    validateF = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(valueIn);
                } else if (type == "number") {
                    validateF = /^[0-9]+$/.test(valueIn);
                } else if (type == "url") {
                    validateF = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(valueIn);
                } else if (type == "username") {
                    validateF = /^[A-Za-z0-9_]{3,16}$/.test(valueIn);
                } else {
                    validateF = true;
                }
            }
            isValidT = validateF;
        }
        handleInputChange(ev);
        setIsValid(isValidT);
        setValidate(prevState => ({
            ...prevState,
            [label]: isValidT
        }));
    };

    const markTouched = () => {
        setIsTouched(true);
    };

    return (
        <IonItem>
            <IonTextarea 
                className={`${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'} ${className}`}
                type={type}
                fill="solid"
                label={label}
                labelPlacement={labelPlacement}
                helperText={helperText}
                errorText={errorText}
                clearInput={clearInput}
                required={required}
                counter={maxlength ? true : false}
                maxlength={maxlength}
                onIonInput={(event) => validate(event)}
                onIonBlur={() => markTouched()}
                min={min}
                max={max}
                placeholder={placeholder}
                readOnly={readOnly}
                value={value}
            />
        </IonItem>
    );
}
export default Textarea;