//initJSnumero_celular_importacion
import { getQueryNumber } from "../../utils/database.js";
//endJSnumero_celular_importacion
//initJSunidad_academica_importacion
import Unidades_academicas from '../unidades_academicas/model.js';
//endJSunidad_academica_importacion
import express from 'express';
import { auth_required, getAll, getDocument } from '../../utils/index.js';
import { convertToOr, getQueryDate } from '../../utils/database.js';
import User from '../user/model.js';
import Importacion_de_datos from './model.js';
//imports
const routes = express.Router();
async function searchImportacion_de_datos(searchParams) {
  let query = {};
  if (searchParams?.all) searchParams = {
    all: searchParams?.all,
    //initJSunidad_academica_importacion
unidad_academica_importacion: searchParams?.all,
//endJSunidad_academica_importacion
//initJSfecha_importacion
fecha_importacion: searchParams?.all,
//endJSfecha_importacion
//initJSnombre_importado
nombre_importado: searchParams?.all,
//endJSnombre_importado
//initJSapellido_paterno_importado
apellido_paterno_importado: searchParams?.all,
//endJSapellido_paterno_importado
//initJSapellido_materno_importado
apellido_materno_importado: searchParams?.all,
//endJSapellido_materno_importado
//initJScarnet_identidad_importacion
carnet_identidad_importacion: searchParams?.all,
//endJScarnet_identidad_importacion
//initJSnumero_celular_importacion
numero_celular_importacion: searchParams?.all,
//endJSnumero_celular_importacion
//initJSnombre_tutor_impotado
nombre_tutor_impotado: searchParams?.all,
//endJSnombre_tutor_impotado
//initJSapellido_paterno_tutor_importado
apellido_paterno_tutor_importado: searchParams?.all,
//endJSapellido_paterno_tutor_importado
//initJSapellido_materno_tutor_importado
apellido_materno_tutor_importado: searchParams?.all,
//endJSapellido_materno_tutor_importado
//initJScelular_tutor_importado
celular_tutor_importado: searchParams?.all,
//endJScelular_tutor_importado
//initJScarrera_interes
carrera_interes: searchParams?.all,
//endJScarrera_interes
//initJSgestion_bachiller_importado
gestion_bachiller_importado: searchParams?.all,
//endJSgestion_bachiller_importado
//initJScolegio_importado
colegio_importado: searchParams?.all,
//endJScolegio_importado
//initJStipo_colegio_importado
tipo_colegio_importado: searchParams?.all,
//endJStipo_colegio_importado
//initJSdepartamento_importado
departamento_importado: searchParams?.all,
//endJSdepartamento_importado
//initJSprovincia_importado
provincia_importado: searchParams?.all,
//endJSprovincia_importado
//initJShorario_clases_importado
horario_clases_importado: searchParams?.all,
//endJShorario_clases_importado
//initJStipo_visita_importada
tipo_visita_importada: searchParams?.all,
//endJStipo_visita_importada
//fieldsSearch
    createdAt: searchParams?.all,
    updatedAt: searchParams?.all,
  }
  //initJSunidad_academica_importacion
            if (searchParams?.unidad_academica_importacion) {
                let list = await Unidades_academicas.find({ nombre_unidad_academica: { $regex: searchParams.unidad_academica_importacion, $options: 'i' }}).exec();
                list = list.map(l => l._id);
                if (list.length > 0) query.unidad_academica_importacion = { $in: list };
            }
//endJSunidad_academica_importacion
//initJSfecha_importacion
        if (searchParams?.fecha_importacion) {
            const date = getQueryDate(searchParams.fecha_importacion);
            if (date) query.fecha_importacion = date;
        }
//endJSfecha_importacion
//initJSnombre_importado
if (searchParams?.nombre_importado) query.nombre_importado = { $regex: searchParams.nombre_importado, $options: 'i' };
//endJSnombre_importado
//initJSapellido_paterno_importado
if (searchParams?.apellido_paterno_importado) query.apellido_paterno_importado = { $regex: searchParams.apellido_paterno_importado, $options: 'i' };
//endJSapellido_paterno_importado
//initJSapellido_materno_importado
if (searchParams?.apellido_materno_importado) query.apellido_materno_importado = { $regex: searchParams.apellido_materno_importado, $options: 'i' };
//endJSapellido_materno_importado
//initJScarnet_identidad_importacion
if (searchParams?.carnet_identidad_importacion) query.carnet_identidad_importacion = { $regex: searchParams.carnet_identidad_importacion, $options: 'i' };
//endJScarnet_identidad_importacion
//initJSnumero_celular_importacion
        if (searchParams?.numero_celular_importacion) {
            const numberQuery = getQueryNumber(searchParams.numero_celular_importacion);
            if (numberQuery) query.numero_celular_importacion = numberQuery;
        }
//endJSnumero_celular_importacion
//initJSnombre_tutor_impotado
if (searchParams?.nombre_tutor_impotado) query.nombre_tutor_impotado = { $regex: searchParams.nombre_tutor_impotado, $options: 'i' };
//endJSnombre_tutor_impotado
//initJSapellido_paterno_tutor_importado
if (searchParams?.apellido_paterno_tutor_importado) query.apellido_paterno_tutor_importado = { $regex: searchParams.apellido_paterno_tutor_importado, $options: 'i' };
//endJSapellido_paterno_tutor_importado
//initJSapellido_materno_tutor_importado
if (searchParams?.apellido_materno_tutor_importado) query.apellido_materno_tutor_importado = { $regex: searchParams.apellido_materno_tutor_importado, $options: 'i' };
//endJSapellido_materno_tutor_importado
//initJScelular_tutor_importado
if (searchParams?.celular_tutor_importado) query.celular_tutor_importado = { $regex: searchParams.celular_tutor_importado, $options: 'i' };
//endJScelular_tutor_importado
//initJScarrera_interes
if (searchParams?.carrera_interes) query.carrera_interes = { $regex: searchParams.carrera_interes, $options: 'i' };
//endJScarrera_interes
//initJSgestion_bachiller_importado
if (searchParams?.gestion_bachiller_importado) query.gestion_bachiller_importado = { $regex: searchParams.gestion_bachiller_importado, $options: 'i' };
//endJSgestion_bachiller_importado
//initJScolegio_importado
if (searchParams?.colegio_importado) query.colegio_importado = { $regex: searchParams.colegio_importado, $options: 'i' };
//endJScolegio_importado
//initJStipo_colegio_importado
if (searchParams?.tipo_colegio_importado) query.tipo_colegio_importado = { $regex: searchParams.tipo_colegio_importado, $options: 'i' };
//endJStipo_colegio_importado
//initJSdepartamento_importado
if (searchParams?.departamento_importado) query.departamento_importado = { $regex: searchParams.departamento_importado, $options: 'i' };
//endJSdepartamento_importado
//initJSprovincia_importado
if (searchParams?.provincia_importado) query.provincia_importado = { $regex: searchParams.provincia_importado, $options: 'i' };
//endJSprovincia_importado
//initJShorario_clases_importado
if (searchParams?.horario_clases_importado) query.horario_clases_importado = { $regex: searchParams.horario_clases_importado, $options: 'i' };
//endJShorario_clases_importado
//initJStipo_visita_importada
if (searchParams?.tipo_visita_importada) query.tipo_visita_importada = { $regex: searchParams.tipo_visita_importada, $options: 'i' };
//endJStipo_visita_importada
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
  if (!auth_required(req, res, ['read_importacion_de_datos'], false)) return;
  if (req?.body?.query?.search) req.body.query.find = {
    ...req.body.query.find,
    ...await searchImportacion_de_datos(req?.body?.query?.search)
  }
  const query = await getAll(Importacion_de_datos, req, res);
  if (query) return res.status(200).json(query);
});
routes.post('/read', async function (req, res) {
  if (!auth_required(req, res, ['read_importacion_de_datos'], false)) return;
  const query = await getDocument(Importacion_de_datos, req, res);
  if (query) delete query._doc.password;
  if (query) return res.status(200).json(query);
});
//POST
routes.post('/create', async function (req, res) {
  if (!auth_required(req, res, ['create_importacion_de_datos'], false)) return;
  try {
    var { importacion_de_datos } = req.body;
    //validadores
    importacion_de_datos.last_user = req.currentUser.id;
    //extrasCreate
    var query = await new Importacion_de_datos(importacion_de_datos).save();
    return res.status(200).json(query);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Datos Inválidos", error });
  }
});
//PUT
routes.put('/update/:id', async function (req, res) {
  if (!auth_required(req, res, ['update_importacion_de_datos'], false)) return;
  const { id } = req.params;
  try {
    var { importacion_de_datos } = req.body;
    importacion_de_datos.last_user = req.currentUser.id;
    //extrasUpdate
    const document = await Importacion_de_datos.findByIdAndUpdate(id, {
      $set: importacion_de_datos
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
  if (!auth_required(req, res, ['delete_importacion_de_datos'], false)) return;
  const { id } = req.params;
  try {
    const importacion_de_datos = await Importacion_de_datos.findById(id);
//extrasDelete
    await Importacion_de_datos.deleteOne({ _id: id });
    return res.status(200).json({ message: "Importacion_de_datos Delete" })
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Datos Inválidos", error });
  }
});
export default routes;