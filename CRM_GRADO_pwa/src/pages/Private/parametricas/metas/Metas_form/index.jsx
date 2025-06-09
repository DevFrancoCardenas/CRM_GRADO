//initJSunidad_academica
import Select from "@/components/Select1";
//endJSunidad_academica
import Page from "@/components/Page";
import "./Metas_form.css";
import { IonFab, IonFabButton, IonIcon, IonList, useIonAlert } from "@ionic/react";
import { useHistory, useLocation, useParams } from "react-router";
import { StoreContext } from "@/context/store";
import { useContext, useEffect, useRef, useState } from "react";
import { save } from "ionicons/icons";
import client from "@/api";
import Input from "@/components/Input";
export default function Metas_form() {
    const location = useLocation();
    const { id } = useParams();
    const history = useHistory();
    const store = useContext(StoreContext);
    const submitRef = useRef(null);
    const [showErrors] = useIonAlert();
    const [validate, set_validate] = useState({});
    //fields
    const [metas, set_metas] = useState({
        //initJSunidad_academica
unidad_academica: "",
//endJSunidad_academica
//initJSgestion
gestion: "",
//endJSgestion
//initJSmeta
meta: "",
//endJSmeta
//initJSmes_gestion
mes_gestion: "",
//endJSmes_gestion
//initJScantidad_atendidos_plataforma
cantidad_atendidos_plataforma: "",
//endJScantidad_atendidos_plataforma
//initJScantidad_ganados_mes
cantidad_ganados_mes: "",
//endJScantidad_ganados_mes
//initJScantidad_perdidos_mes
cantidad_perdidos_mes: "",
//endJScantidad_perdidos_mes
//initJSindicador_atencion
indicador_atencion: "",
//endJSindicador_atencion
//initJSfecha_registro
fecha_registro: "",
//endJSfecha_registro
//fieldsModel
    });
//extraStates
    //initJSunidad_academica
const [unidades_academicas_list, set_unidades_academicas_list] = useState([]);
//endJSunidad_academica
//foreigns
    async function getForeigns() {
        store.setLoading(true);
        Promise.all([
            //initJSunidad_academica
client.post('/unidades_academicas/list').then(r => set_unidades_academicas_list(r?.data?.list || [])),
//endJSunidad_academica
//callForeigns
        ]).finally(() => {
            store.setLoading(false);
        });
    }
    function showE(message) {
        showErrors({
            header: 'Error!',
            message: message,
            buttons: [{
                text: 'Aceptar',
                cssClass: 'alert-button-danger',
            }],
        })
    }
    async function handleSubmit(e) {
        e.preventDefault();
        var errors = [];
        const isInvalid = Object.values(validate).some(val => val === false);
        if (isInvalid) errors.push("-Revisa los valores ingresados");
        //initJSunidad_academica
if (!metas?.unidad_academica) errors.push("El campo Unidad Academica es obligatorio");
//endJSunidad_academica
//initJSgestion
if (!metas?.gestion) errors.push("El campo Gestion es obligatorio");
//endJSgestion
//initJSmeta
if (!metas?.meta) errors.push("El campo Meta cantidad de inscritos es obligatorio");
//endJSmeta
//validaciones
        //Otros Validadores
        if (errors.length == 0) {
            store.setLoading(true);
//beforeSend
            if (id) {
                client.put(`/metas/update/${id}`, { metas }).then(r => {
                    history.goBack();
                }).catch(e => {
                    if (e?.response?.data?.message) showE(e?.response?.data?.message);
                }).finally(() => store.setLoading(false));
            } else {
                client.post(`/metas/create`, { metas }).then(r => {
                    history.push('/app/metas/list');
                }).catch(e => {
                    if (e?.response?.data?.message) showE(e?.response?.data?.message);
                }).finally(() => store.setLoading(false));
            }
        } else {
            const errorMessageText = errors.join('\n');
            showErrors({
                header: 'Error!',
                message: errorMessageText,
                buttons: [{
                    text: 'Aceptar',
                    cssClass: 'alert-button-danger',
                }],
            })
        }
    }
//extraEffect
    useEffect(() => {
        getForeigns();
        if (id) {
            store.setLoading(true);
            client
                .post("/metas/read", {
                    query: {
                        find: { _id: id },
                    },
                })
                .then((r) => {
                    const fetchedData = r?.data || {};
                    const update = Object.keys(metas).reduce((acc, key) => {
                        acc[key] = fetchedData.hasOwnProperty(key) && fetchedData[key] !== null ? fetchedData[key] : metas[key];
                        return acc;
                    }, {});
                    set_metas(update);
                })
                .finally(() => store.setLoading(false));
        }
    }, [location.pathname]);
    return (
        <Page title={id ? "Editar Metas" : "Crear Metas"} backURL={`/app/metas/list`}>
            <form onSubmit={handleSubmit}>
                <IonList>
                    {/* initJSXunidad_academica */}
                <Select label="Seleccionar Unidad Academica" options={unidades_academicas_list} field="nombre_unidad_academica" value={metas?.unidad_academica} setValue={e => set_metas({ ...metas, unidad_academica: e })} />
{/* endJSXunidad_academica */}
{/* initJSXgestion */}
        <Input type="text" label="Gestion" name="gestion" value={metas?.gestion} setValue={set_metas} errorText="Ingrese un Gestion válido" required={true} pattern="[0-9]+"  />
{/* endJSXgestion */}
{/* initJSXmeta */}
        <Input type="text" label="Meta cantidad de inscritos" name="meta" value={metas?.meta} setValue={set_metas} errorText="Ingrese un Meta cantidad de inscritos válido" required={true} pattern="[0-9]+"  />
{/* endJSXmeta */}
{/* initJSXmes_gestion */}
                <Select label="Seleccionar Mes" name="mes_gestion" options={["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"]} value={metas?.mes_gestion} setValue={set_metas} />
{/* endJSXmes_gestion */}
{/* initJSXcantidad_atendidos_plataforma */}
            <Input type="number" label="Cantidad de Atendidos en el mes" name="cantidad_atendidos_plataforma" value={metas?.cantidad_atendidos_plataforma} setValue={set_metas} errorText="Ingrese un Cantidad de Atendidos en el mes válido" required={false}  />
{/* endJSXcantidad_atendidos_plataforma */}
{/* initJSXcantidad_ganados_mes */}
            <Input type="number" label="Cantidad de ganados mes" name="cantidad_ganados_mes" value={metas?.cantidad_ganados_mes} setValue={set_metas} errorText="Ingrese un Cantidad de ganados mes válido" required={false}  />
{/* endJSXcantidad_ganados_mes */}
{/* initJSXcantidad_perdidos_mes */}
            <Input type="number" label="Cantidad de perdidos mes" name="cantidad_perdidos_mes" value={metas?.cantidad_perdidos_mes} setValue={set_metas} errorText="Ingrese un Cantidad de perdidos mes válido" required={false}  />
{/* endJSXcantidad_perdidos_mes */}
{/* initJSXindicador_atencion */}
            <Input type="number" label="Indicador de atencion" name="indicador_atencion" value={metas?.indicador_atencion} setValue={set_metas} errorText="Ingrese un Indicador de atencion válido" required={false}  />
{/* endJSXindicador_atencion */}
{/* initJSXfecha_registro */}
            <Input type="datetime-local" label="Fecha" name="fecha_registro" value={metas?.fecha_registro} setValue={set_metas} errorText="Ingrese un Fecha válido" required={false}  />
{/* endJSXfecha_registro */}
{/* inputFields */}
                </IonList>
                <button type="submit" style={{ display: 'none' }} ref={submitRef}>Submit</button>
            </form>
            <IonFab slot="fixed" vertical="top" horizontal="end" edge={true}>
                <IonFabButton color="success" onClick={() => submitRef.current && submitRef.current.click()}>
                    <IonIcon icon={save} />
                </IonFabButton>
            </IonFab>
        </Page>
    )
}