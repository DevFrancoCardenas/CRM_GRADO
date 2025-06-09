import {
  IonAvatar,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from "@ionic/react";
import { useLocation } from "react-router-dom";
import {
  home,
  logOut,
  people,
  person,
  settings,
  arrowForward,
  chatbubbleEllipses,
  //icons
} from "ionicons/icons";
import "./Menu.css";
import { StoreContext } from "@/context/store";
import React, { useContext } from "react";
const navigation = [
  {
    name: "Home",
    href: "/app/home",
    icon: home,
    permissions: [],
  },
  {
    name: "Atencion en plataforma",
    icon: arrowForward,
    permissions: [],
    children: [
      {
        name: "Atencion",
        href: "/app/atencion/list",
        icon: arrowForward,
        permissions: ["read_atencion"],
      },
      {
        name: "Seguimiento plataforma",
        href: "/app/seguimiento_plataforma/list",
        icon: arrowForward,
        permissions: ["read_seguimiento_plataforma"],
      },
      //childrenAtencion en plataforma
    ],
  },
  {
    name: "Datos externos",
    icon: arrowForward,
    permissions: [],
    children: [
      {
        name: "Importacion de datos",
        href: "/app/importacion_de_datos/list",
        icon: arrowForward,
        permissions: ["read_importacion_de_datos"],
      },
      //childrenDatos externos
    ],
  },
  {
    name: "Parametricas",
    icon: arrowForward,
    permissions: [],
    children: [
      {
        name: "Unidades academicas",
        href: "/app/unidades_academicas/list",
        icon: arrowForward,
        permissions: ["read_unidades_academicas"],
      },
      {
        name: "Carreras",
        href: "/app/carreras/list",
        icon: arrowForward,
        permissions: ["read_carreras"],
      },
      {
        name: "Tipo de seguimiento",
        href: "/app/tipo_de_seguimiento/list",
        icon: arrowForward,
        permissions: ["read_tipo_de_seguimiento"],
      },
      {
        name: "Metas",
        href: "/app/metas/list",
        icon: trophy,
        permissions: ["read_metas"],
      },
      //childrenParametricas
    ],
  },
  {
    name: "Mensajeria",
    icon: chatbubbleEllipses,
    permissions: [],
    children: [
      {
        name: "Mensajeria",
        href: "/app/mensajeria/list",
        icon: chatbubbleEllipses,
        permissions: ["read_mensajeria"],
      },
      //childrenMensajeria
    ],
  },
  //sectionMenu
];
const adminNavigation = [
  {
    name: "Administrador",
    icon: settings,
    permissions: [],
    children: [
      {
        name: "Usuarios",
        href: "/app/user/list",
        icon: person,
        permissions: ["read_user"],
      },
      {
        name: "Grupos/Permisos",
        href: "/app/group/list",
        icon: people,
        permissions: ["read_group"],
      },
    ],
  },
];
navigation.forEach((element) => {
  if (element.children) {
    var permissions = [];
    element.children.forEach((element2) => {
      permissions.push(element2.permissions);
    });
    element.permissions = permissions;
  }
});
adminNavigation.forEach((element) => {
  if (element.children) {
    var permissions = [];
    element.children.forEach((element2) => {
      permissions.push(element2.permissions);
    });
    element.permissions = permissions;
  }
});
export default function Menu() {
  const location = useLocation();
  const store = useContext(StoreContext);
  function simpleOption(item) {
    return (
      <IonMenuToggle autoHide={false}>
        <IonItem
          className={location.pathname === item.href ? "selected" : ""}
          routerLink={item.href}
          routerDirection="none"
          lines="none"
          detail={false}
        >
          <IonIcon aria-hidden="true" slot="start" icon={item.icon} />
          <IonLabel>{item.name}</IonLabel>
        </IonItem>
      </IonMenuToggle>
    );
  }
  function childrenOption(item) {
    return (
      <React.Fragment>
        <IonItem>
          <IonIcon icon={item.icon} slot="start" color="primary" />
          <IonLabel>{item.name}</IonLabel>
        </IonItem>
        {item.children.map(
          (subItem, index) =>
            store.checkPermissions(subItem?.permissions) && (
              <IonMenuToggle autoHide={false} key={index}>
                <IonItem
                  className={
                    (location.pathname === subItem.href ? "selected" : "") +
                    " ml-2"
                  }
                  routerLink={subItem.href}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    aria-hidden="true"
                    slot="start"
                    icon={subItem.icon}
                  />
                  <IonLabel>{subItem.name}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            )
        )}
      </React.Fragment>
    );
  }
  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonAvatar>
            <img src="/logo.png"></img>
          </IonAvatar>
          <IonListHeader>Jardal</IonListHeader>
          <IonNote>{store?.user?.name}</IonNote>
        </IonList>
        <IonList id="inbox-list">
          {navigation.map((item, index) => (
            <React.Fragment key={index}>
              {!item.children && store.checkPermissions(item?.permissions)
                ? store.checkPermissions(item?.permissions) &&
                  simpleOption(item)
                : store.checkPermissionsMenu(item?.permissions) &&
                  childrenOption(item)}
            </React.Fragment>
          ))}
        </IonList>
        {store.user.is_admin && (
          <IonList id="inbox-list">
            {adminNavigation.map((item, index) => (
              <React.Fragment key={index}>
                {!item.children && store.checkPermissions(item?.permissions)
                  ? store.checkPermissions(item?.permissions) &&
                    simpleOption(item)
                  : store.checkPermissionsMenu(item?.permissions) &&
                    childrenOption(item)}
              </React.Fragment>
            ))}
          </IonList>
        )}
        <IonList id="inbox-list">
          <IonMenuToggle autoHide={false}>
            <IonItem
              onClick={() => {
                store.logout();
                setTimeout(() => {
                  window.location.reload();
                }, 200);
              }}
              routerDirection="none"
              detail={false}
              lines="none"
            >
              <IonIcon aria-hidden="true" slot="start" icon={logOut} />
              <IonLabel>Cerrar Sesión</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
}
