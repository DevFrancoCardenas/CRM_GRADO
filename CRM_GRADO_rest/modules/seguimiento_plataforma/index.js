//initJSnombre_atencion
import Atencion from '../atencion/model.js';
//endJSnombre_atencion
//initJStipo_seguimiento
import Tipo_de_seguimiento from '../tipo_de_seguimiento/model.js';
//endJStipo_seguimiento
import express from 'express';
import { auth_required, getAll, getDocument } from '../../utils/index.js';
import { convertToOr, getQueryDate } from '../../utils/database.js';
import User from '../user/model.js';
import Seguimiento_plataforma from './model.js';
//imports
const routes = express.Router();
async function searchSeguimiento_plataforma(searchParams) {
  let query = {};
  if (searchParams?.all) searchParams = {
    all: searchParams?.all,
    //initJSfecha_seguimiento
fecha_seguimiento: searchParams?.all,
//endJSfecha_seguimiento
//initJStipo_seguimiento
tipo_seguimiento: searchParams?.all,
//endJStipo_seguimiento
//initJSestado_seguimiento
estado_seguimiento: searchParams?.all,
//endJSestado_seguimiento
//initJSobservacion_seguimiento_plataforma
observacion_seguimiento_plataforma: searchParams?.all,
//endJSobservacion_seguimiento_plataforma
//initJSnombre_atencion
nombre_atencion: searchParams?.all,
//endJSnombre_atencion
//fieldsSearch
    createdAt: searchParams?.all,
    updatedAt: searchParams?.all,
  }
  //initJSfecha_seguimiento
        if (searchParams?.fecha_seguimiento) {
            const date = getQueryDate(searchParams.fecha_seguimiento);
            if (date) query.fecha_seguimiento = date;
        }
//endJSfecha_seguimiento
//initJStipo_seguimiento
            if (searchParams?.tipo_seguimiento) {
                let list = await Tipo_de_seguimiento.find({ tipo_de_seguimiento: { $regex: searchParams.tipo_seguimiento, $options: 'i' }}).exec();
                list = list.map(l => l._id);
                if (list.length > 0) query.tipo_seguimiento = { $in: list };
            }
//endJStipo_seguimiento
//initJSestado_seguimiento
if (searchParams?.estado_seguimiento) query.estado_seguimiento = { $regex: searchParams.estado_seguimiento, $options: 'i' };
//endJSestado_seguimiento
//initJSobservacion_seguimiento_plataforma
if (searchParams?.observacion_seguimiento_plataforma) query.observacion_seguimiento_plataforma = { $regex: searchParams.observacion_seguimiento_plataforma, $options: 'i' };
//endJSobservacion_seguimiento_plataforma
//initJSnombre_atencion
            if (searchParams?.nombre_atencion) {
                let list = await Atencion.find({ nombre_completo: { $regex: searchParams.nombre_atencion, $options: 'i' }}).exec();
                list = list.map(l => l._id);
                if (list.length > 0) query.nombre_atencion = { $in: list };
            }
//endJSnombre_atencion
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
  if (!auth_required(req, res, ['read_seguimiento_plataforma'], false)) return;
  if (req?.body?.query?.search) req.body.query.find = {
    ...req.body.query.find,
    ...await searchSeguimiento_plataforma(req?.body?.query?.search)
  }
  const query = await getAll(Seguimiento_plataforma, req, res);
  if (query) return res.status(200).json(query);
});
routes.post('/read', async function (req, res) {
  if (!auth_required(req, res, ['read_seguimiento_plataforma'], false)) return;
  const query = await getDocument(Seguimiento_plataforma, req, res);
  if (query) delete query._doc.password;
  if (query) return res.status(200).json(query);
});
//POST
routes.post('/create', async function (req, res) {
  if (!auth_required(req, res, ['create_seguimiento_plataforma'], false)) return;
  try {
    var { seguimiento_plataforma } = req.body;
    //validadores
    seguimiento_plataforma.last_user = req.currentUser.id;
    //extrasCreate
    var query = await new Seguimiento_plataforma(seguimiento_plataforma).save();
    return res.status(200).json(query);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Datos Inválidos", error });
  }
});
//PUT
routes.put('/update/:id', async function (req, res) {
  if (!auth_required(req, res, ['update_seguimiento_plataforma'], false)) return;
  const { id } = req.params;
  try {
    var { seguimiento_plataforma } = req.body;
    seguimiento_plataforma.last_user = req.currentUser.id;
    //extrasUpdate
    const document = await Seguimiento_plataforma.findByIdAndUpdate(id, {
      $set: seguimiento_plataforma
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
  if (!auth_required(req, res, ['delete_seguimiento_plataforma'], false)) return;
  const { id } = req.params;
  try {
    const seguimiento_plataforma = await Seguimiento_plataforma.findById(id);
//extrasDelete
    await Seguimiento_plataforma.deleteOne({ _id: id });
    return res.status(200).json({ message: "Seguimiento_plataforma Delete" })
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Datos Inválidos", error });
  }
});
export default routes;