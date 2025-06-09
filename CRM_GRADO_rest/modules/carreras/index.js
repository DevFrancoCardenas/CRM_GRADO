//initJSunidad_academica
import Unidades_academicas from '../unidades_academicas/model.js';
//endJSunidad_academica
import express from 'express';
import { auth_required, getAll, getDocument } from '../../utils/index.js';
import { convertToOr, getQueryDate } from '../../utils/database.js';
import User from '../user/model.js';
import Carreras from './model.js';
//imports
const routes = express.Router();
async function searchCarreras(searchParams) {
  let query = {};
  if (searchParams?.all) searchParams = {
    all: searchParams?.all,
    //initJSunidad_academica
unidad_academica: searchParams?.all,
//endJSunidad_academica
//initJSnombre_carrera
nombre_carrera: searchParams?.all,
//endJSnombre_carrera
//initJSid_saga_carrera
id_saga_carrera: searchParams?.all,
//endJSid_saga_carrera
//fieldsSearch
    createdAt: searchParams?.all,
    updatedAt: searchParams?.all,
  }
  //initJSunidad_academica
            if (searchParams?.unidad_academica) {
                let list = await Unidades_academicas.find({ nombre_unidad_academica: { $regex: searchParams.unidad_academica, $options: 'i' }}).exec();
                list = list.map(l => l._id);
                if (list.length > 0) query.unidad_academica = { $in: list };
            }
//endJSunidad_academica
//initJSnombre_carrera
if (searchParams?.nombre_carrera) query.nombre_carrera = { $regex: searchParams.nombre_carrera, $options: 'i' };
//endJSnombre_carrera
//initJSid_saga_carrera
if (searchParams?.id_saga_carrera) query.id_saga_carrera = { $regex: searchParams.id_saga_carrera, $options: 'i' };
//endJSid_saga_carrera
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
  if (!auth_required(req, res, ['read_carreras'], false)) return;
  if (req?.body?.query?.search) req.body.query.find = {
    ...req.body.query.find,
    ...await searchCarreras(req?.body?.query?.search)
  }
  const query = await getAll(Carreras, req, res);
  if (query) return res.status(200).json(query);
});
routes.post('/read', async function (req, res) {
  if (!auth_required(req, res, ['read_carreras'], false)) return;
  const query = await getDocument(Carreras, req, res);
  if (query) delete query._doc.password;
  if (query) return res.status(200).json(query);
});
//POST
routes.post('/create', async function (req, res) {
  if (!auth_required(req, res, ['create_carreras'], false)) return;
  try {
    var { carreras } = req.body;
    //validadores
    carreras.last_user = req.currentUser.id;
    //extrasCreate
    var query = await new Carreras(carreras).save();
    return res.status(200).json(query);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Datos Inválidos", error });
  }
});
//PUT
routes.put('/update/:id', async function (req, res) {
  if (!auth_required(req, res, ['update_carreras'], false)) return;
  const { id } = req.params;
  try {
    var { carreras } = req.body;
    carreras.last_user = req.currentUser.id;
    //extrasUpdate
    const document = await Carreras.findByIdAndUpdate(id, {
      $set: carreras
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
  if (!auth_required(req, res, ['delete_carreras'], false)) return;
  const { id } = req.params;
  try {
    const carreras = await Carreras.findById(id);
//extrasDelete
    await Carreras.deleteOne({ _id: id });
    return res.status(200).json({ message: "Carreras Delete" })
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Datos Inválidos", error });
  }
});
export default routes;