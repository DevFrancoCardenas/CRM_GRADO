import { IonContent, IonHeader, IonImg, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import { IonItem, IonInput, IonButton, IonAlert } from '@ionic/react';
import logo from '@/assets/logo.png';
import { StoreContext } from '@/context/store';
import { Redirect, useHistory } from 'react-router'; // Importa useHistory
import client from '@/api';

function Login() {
  const store = useContext(StoreContext);
  const history = useHistory(); // Usa useHistory para redirección
  const [username, set_username] = useState();
  const [password, set_password] = useState();
  const [iserror, setIserror] = useState(false);
  const [message, setMessage] = useState("");
  const [loginSuccess, set_loginSuccess] = useState(false);

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      handleLogin();
    }
  }

  const handleLogin = () => {
    if (!username && username !== "") {
      setMessage("Porfavor ingrese su nombre de Usuario");
      setIserror(true);
      return;
    }
    if (!password && password !== "") {
      setMessage("Porfavor ingrese la contraseña");
      setIserror(true);
      return;
    }
    store.setLoading(true);
    client.post("/user/login", {
      username, password
    }).then(r => {
      store.login(r.data);
    }).catch((e) => {
      store.setLoading(false);
      setMessage(e.response.data.message);
      setIserror(true);
    });
  };

  useEffect(() => {
    if (store.user) {
      store.setLoading(false);
      set_loginSuccess(true);
    }
  }, [store.user]);

  if (loginSuccess) {
    return <Redirect to="/app/home" />;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-text-center">INICIAR SESIÓN</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding ion-text-center">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonAlert
                isOpen={iserror}
                onDidDismiss={() => setIserror(false)}
                header={"Error!"}
                message={message}
                buttons={["Aceptar"]}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonImg src={logo} style={{ height: '40vh' }} className="my-4" alt="logo" />
            </IonCol>
          </IonRow>
          <IonInput
            label="Nombre de Usuario"
            labelPlacement="floating"
            type="text"
            fill="outline"
            className="text-left"
            value={username}
            onKeyDown={(e) => handleKeyPress(e)}
            onIonInput={(e) => set_username(e.target.value)}
          />
          <br />

          <IonInput
            label="Contraseña"
            labelPlacement="floating"
            type="password"
            fill="outline"
            className="text-left"
            value={password}
            onKeyDown={(e) => handleKeyPress(e)}
            onIonInput={(e) => set_password(e.target.value)}

          >

          </IonInput>
          <IonRow>
            <IonCol>
              <IonButton color="success" expand="block" onClick={() => handleLogin()}>INGRESAR</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}

export default Login;
