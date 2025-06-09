//initJScarreras
import Carreras from '../carreras/model.js';
//endJScarreras
//initJSunidad_academica
import Unidades_academicas from '../unidades_academicas/model.js';
//endJSunidad_academica
//initJSnumero_celular
import { getQueryNumber } from "../../utils/database.js";
//endJSnumero_celular
import express from 'express';
import { auth_required, getAll, getDocument } from '../../utils/index.js';
import { convertToOr, getQueryDate } from '../../utils/database.js';
import User from '../user/model.js';
import Atencion from './model.js';
//imports
const routes = express.Router();
async function searchAtencion(searchParams) {
  let query = {};
  if (searchParams?.all) searchParams = {
    all: searchParams?.all,
    //initJSfecha_atencion
fecha_atencion: searchParams?.all,
//endJSfecha_atencion
//initJSnombres
nombres: searchParams?.all,
//endJSnombres
//initJSapellido_paterno
apellido_paterno: searchParams?.all,
//endJSapellido_paterno
//initJSapellido_materno
apellido_materno: searchParams?.all,
//endJSapellido_materno
//initJScarnet_identidad
carnet_identidad: searchParams?.all,
//endJScarnet_identidad
//initJSnumero_celular
numero_celular: searchParams?.all,
//endJSnumero_celular
//initJSnombre_tutor
nombre_tutor: searchParams?.all,
//endJSnombre_tutor
//initJSapellido_materno_tutor
apellido_materno_tutor: searchParams?.all,
//endJSapellido_materno_tutor
//initJSapellido_paterno_tutor
apellido_paterno_tutor: searchParams?.all,
//endJSapellido_paterno_tutor
//initJSnumero_celular_tutor
numero_celular_tutor: searchParams?.all,
//endJSnumero_celular_tutor
//initJSunidad_academica
unidad_academica: searchParams?.all,
//endJSunidad_academica
//initJSotras_carreras
otras_carreras: searchParams?.all,
//endJSotras_carreras
//initJSgestion_bachiller
gestion_bachiller: searchParams?.all,
//endJSgestion_bachiller
//initJScolegio
colegio: searchParams?.all,
//endJScolegio
//initJStipo_colegio
tipo_colegio: searchParams?.all,
//endJStipo_colegio
//initJSprovincia
provincia: searchParams?.all,
//endJSprovincia
//initJScomo_te_enteraste_emi
como_te_enteraste_emi: searchParams?.all,
//endJScomo_te_enteraste_emi
//initJSotro_metodo_capatacion
otro_metodo_capatacion: searchParams?.all,
//endJSotro_metodo_capatacion
//initJShora_clase
hora_clase: searchParams?.all,
//endJShora_clase
//initJSobservacion
observacion: searchParams?.all,
//endJSobservacion
//initJSestado
estado: searchParams?.all,
//endJSestado
//initJSasesor
asesor: searchParams?.all,
//endJSasesor
//initJSdepartamento
departamento: searchParams?.all,
//endJSdepartamento
//initJScarreras
carreras: searchParams?.all,
//endJScarreras
//initJSnombre_completo
nombre_completo: searchParams?.all,
//endJSnombre_completo
//fieldsSearch
    createdAt: searchParams?.all,
    updatedAt: searchParams?.all,
  }
  //initJSfecha_atencion
        if (searchParams?.fecha_atencion) {
            const date = getQueryDate(searchParams.fecha_atencion);
            if (date) query.fecha_atencion = date;
        }
//endJSfecha_atencion
//initJSnombres
if (searchParams?.nombres) query.nombres = { $regex: searchParams.nombres, $options: 'i' };
//endJSnombres
//initJSapellido_paterno
if (searchParams?.apellido_paterno) query.apellido_paterno = { $regex: searchParams.apellido_paterno, $options: 'i' };
//endJSapellido_paterno
//initJSapellido_materno
if (searchParams?.apellido_materno) query.apellido_materno = { $regex: searchParams.apellido_materno, $options: 'i' };
//endJSapellido_materno
//initJScarnet_identidad
if (searchParams?.carnet_identidad) query.carnet_identidad = { $regex: searchParams.carnet_identidad, $options: 'i' };
//endJScarnet_identidad
//initJSnumero_celular
        if (searchParams?.numero_celular) {
            const numberQuery = getQueryNumber(searchParams.numero_celular);
            if (numberQuery) query.numero_celular = numberQuery;
        }
//endJSnumero_celular
//initJSnombre_tutor
if (searchParams?.nombre_tutor) query.nombre_tutor = { $regex: searchParams.nombre_tutor, $options: 'i' };
//endJSnombre_tutor
//initJSapellido_materno_tutor
if (searchParams?.apellido_materno_tutor) query.apellido_materno_tutor = { $regex: searchParams.apellido_materno_tutor, $options: 'i' };
//endJSapellido_materno_tutor
//initJSapellido_paterno_tutor
if (searchParams?.apellido_paterno_tutor) query.apellido_paterno_tutor = { $regex: searchParams.apellido_paterno_tutor, $options: 'i' };
//endJSapellido_paterno_tutor
//initJSnumero_celular_tutor
        if (searchParams?.numero_celular_tutor) {
            const numberQuery = getQueryNumber(searchParams.numero_celular_tutor);
            if (numberQuery) query.numero_celular_tutor = numberQuery;
        }
//endJSnumero_celular_tutor
//initJSunidad_academica
            if (searchParams?.unidad_academica) {
                let list = await Unidades_academicas.find({ nombre_unidad_academica: { $regex: searchParams.unidad_academica, $options: 'i' }}).exec();
                list = list.map(l => l._id);
                if (list.length > 0) query.unidad_academica = { $in: list };
            }
//endJSunidad_academica
//initJSotras_carreras
if (searchParams?.otras_carreras) query.otras_carreras = { $regex: searchParams.otras_carreras, $options: 'i' };
//endJSotras_carreras
//initJSgestion_bachiller
        if (searchParams?.gestion_bachiller) {
            const numberQuery = getQueryNumber(searchParams.gestion_bachiller);
            if (numberQuery) query.gestion_bachiller = numberQuery;
        }
//endJSgestion_bachiller
//initJScolegio
if (searchParams?.colegio) query.colegio = { $regex: searchParams.colegio, $options: 'i' };
//endJScolegio
//initJStipo_colegio
if (searchParams?.tipo_colegio) query.tipo_colegio = { $regex: searchParams.tipo_colegio, $options: 'i' };
//endJStipo_colegio
//initJSprovincia
if (searchParams?.provincia) query.provincia = { $regex: searchParams.provincia, $options: 'i' };
//endJSprovincia
//initJScomo_te_enteraste_emi
if (searchParams?.como_te_enteraste_emi) query.como_te_enteraste_emi = { $regex: searchParams.como_te_enteraste_emi, $options: 'i' };
//endJScomo_te_enteraste_emi
//initJSotro_metodo_capatacion
if (searchParams?.otro_metodo_capatacion) query.otro_metodo_capatacion = { $regex: searchParams.otro_metodo_capatacion, $options: 'i' };
//endJSotro_metodo_capatacion
//initJShora_clase
if (searchParams?.hora_clase) query.hora_clase = { $regex: searchParams.hora_clase, $options: 'i' };
//endJShora_clase
//initJSobservacion
if (searchParams?.observacion) query.observacion = { $regex: searchParams.observacion, $options: 'i' };
//endJSobservacion
//initJSestado
if (searchParams?.estado) query.estado = { $regex: searchParams.estado, $options: 'i' };
//endJSestado
//initJSasesor
            if (searchParams?.asesor) {
                let list = await User.find({ name: { $regex: searchParams.asesor, $options: 'i' }}).exec();
                list = list.map(l => l._id);
                if (list.length > 0) query.asesor = { $in: list };
            }
//endJSasesor
//initJSdepartamento
if (searchParams?.departamento) query.departamento = { $regex: searchParams.departamento, $options: 'i' };
//endJSdepartamento
//initJScarreras
            if (searchParams?.carreras) {
                let list = await Carreras.find({ nombre_carrera: { $regex: searchParams.carreras, $options: 'i' }}).exec();
                list = list.map(l => l._id);
                if (list.length > 0) query.carreras = { $in: list };
            }
//endJScarreras
//initJSnombre_completo
if (searchParams?.nombre_completo) query.nombre_completo = { $regex: searchParams.nombre_completo, $options: 'i' };
//endJSnombre_completo
//ifSearch
  if (searchParams?.last_user) {
    let id = await User.findOne({ name: { $regex: searchParams.last_user, $options: 'i' } }).exec()._id;
    if (id) query.last_user = { $in: id };
  }
  if (searchParams?.createdAt) {
    const date = getQueryDate(searchParams.createdAt);
    if (date) query.createdAt = date;
  }
  if (searchParams?.updatedAt) {
    const date = getQueryDate(searchParams.updatedAt);
    if (date) query.updatedAt = date;
  }
  if (searchParams?.all) query = convertToOr(query);
  return query;
}
//GET
routes.post('/list', async function (req, res) {
  if (!auth_required(req, res, ['read_atencion'], false)) return;
  if (req?.body?.query?.search) req.body.query.find = {
    ...req.body.query.find,
    ...await searchAtencion(req?.body?.query?.search)
  }
  const query = await getAll(Atencion, req, res);
  if (query) return res.status(200).json(query);
});
routes.post('/read', async function (req, res) {
  if (!auth_required(req, res, ['read_atencion'], false)) return;
  const query = await getDocument(Atencion, req, res);
  if (query) delete query._doc.password;
  if (query) return res.status(200).json(query);
});
//POST
routes.post('/create', async function (req, res) {
  if (!auth_required(req, res, ['create_atencion'], false)) return;
  try {
    var { atencion } = req.body;
    //validadores
    atencion.last_user = req.currentUser.id;
    //extrasCreate
    var query = await new Atencion(atencion).save();
    return res.status(200).json(query);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Datos Inválidos", error });
  }
});
//PUT
routes.put('/update/:id', async function (req, res) {
  if (!auth_required(req, res, ['update_atencion'], false)) return;
  const { id } = req.params;
  try {
    var { atencion } = req.body;
    atencion.last_user = req.currentUser.id;
    //extrasUpdate
    const document = await Atencion.findByIdAndUpdate(id, {
      $set: atencion
    }, { new: true });
    if (!document) {
      return res.status(404).json({ message: "Documento no encontrado" });
    }
    return res.status(200).json(document);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Datos Inválidos", error });
  }
});
//DELETE
routes.delete('/delete/:id', async function (req, res) {
  if (!auth_required(req, res, ['delete_atencion'], false)) return;
  const { id } = req.params;
  try {
    const atencion = await Atencion.findById(id);
//extrasDelete
    await Atencion.deleteOne({ _id: id });
    return res.status(200).json({ message: "Atencion Delete" })
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Datos Inválidos", error });
  }
});
export default routes;