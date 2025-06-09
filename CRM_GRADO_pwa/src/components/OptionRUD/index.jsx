import { IonIcon } from "@ionic/react";
import { eye, pencil, trash } from "ionicons/icons";
import { Link } from "react-router-dom";

export default function OptionRUD({ id, model, permissions, confirmDelete = { function() { } } }) {
    return (
        <>
            <div className="flex justify-between border-y border-gray-500">
                {permissions?.read &&
                    <Link to={`/app/${model}/detail/${id}`}>
                        <IonIcon color="success" size="large" icon={eye} />
                    </Link>
                }
                {permissions?.update &&
                    <Link to={`/app/${model}/update/${id}`}>
                        <IonIcon color="primary" size="large" icon={pencil} />
                    </Link>
                }
                {permissions?.delete &&
                    <button onClick={() => confirmDelete()}>
                        <IonIcon color="danger" size="large" icon={trash} />
                    </button>
                }
            </div>
        </>
    )
}