import { useState, useRef, useEffect } from 'react';
import { IonItem, IonLabel, IonList, IonListHeader, IonInput, IonButton, IonIcon } from '@ionic/react';
import { chevronDownOutline } from 'ionicons/icons';

export default function Autocomplete({ label, options = [], field = "name", value, setValue }) {
  const [query, setQuery] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const inputRef = useRef(null); // Referencia al elemento del input

  const filteredOptions = query
    ? options.filter((option) => {
      const optionValue = option?.[field] ? option[field] : option;
      const valueString = typeof optionValue === 'string' ? optionValue.toLowerCase() : String(optionValue).toLowerCase();
      return valueString.includes(query.toLowerCase());
    })
    : options;

  const handleOptionSelect = (option) => {
    setValue(option?._id ? option._id : option);
    setQuery(option?.[field] ? option[field] : option);
    setShowOptions(false);
  };

  // Manejar clics fuera del componente para cerrar el desplegable
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [inputRef]);

  return (
    <div ref={inputRef}>
      <IonItem>
        <IonLabel position="floating">{label}</IonLabel>
        <IonInput 
          value={query} 
          onIonInput={(e) => {
            setQuery(e.detail.value);
            setShowOptions(true);
          }} 
          placeholder="Escribe para filtrar..."
          onFocus={() => setShowOptions(true)}
          onBlur={() => {
            // Temporizador para permitir la selección de un elemento antes de cerrar
            setTimeout(() => {
              setShowOptions(false);
            }, 100);
          }}
        />
        <IonButton fill="clear" slot="end" onClick={() => setShowOptions(!showOptions)}>
          <IonIcon icon={chevronDownOutline} />
        </IonButton>
      </IonItem>
      {showOptions && (
        <IonList>
          <IonListHeader>Líneas Filtradas</IonListHeader>
          {filteredOptions.length > 0 ? filteredOptions.map((option, index) => (
            <IonItem key={index} button onClick={() => handleOptionSelect(option)}>
              {option?.[field] ? option[field] : option}
            </IonItem>
          )) : (
            <IonItem>--No existen opciones--</IonItem>
          )}
        </IonList>
      )}
    </div>
  );
}
