import { StoreContext } from "@/context/store";
import { useContext } from 'react';
import Error from '../Error';

function PermissionCheck ({permissions,children}) {
    const store=useContext(StoreContext);
    if (store.checkPermissions(permissions)) return children;
    return <Error title="Error de Acceso" errors={["No tiene los permisos para acceder a esta sección"]} />
}

export default PermissionCheck