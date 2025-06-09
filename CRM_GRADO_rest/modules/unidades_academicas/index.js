import express from 'express';
import { auth_required, getAll, getDocument } from '../../utils/index.js';
import { convertToOr, getQueryDate } from '../../utils/database.js';
import User from '../user/model.js';
import Unidades_academicas from './model.js';
//imports
const routes = express.Router();
async function searchUnidades_academicas(searchParams) {
  let query = {};
  if (searchParams?.all) searchParams = {
    all: searchParams?.all,
    //initJSnombre_unidad_academica
nombre_unidad_academica: searchParams?.all,
//endJSnombre_unidad_academica
//initJSid_saga
id_saga: searchParams?.all,
//endJSid_saga
//fieldsSearch
    createdAt: searchParams?.all,
    updatedAt: searchParams?.all,
  }
  //initJSnombre_unidad_academica
if (searchParams?.nombre_unidad_academica) query.nombre_unidad_academica = { $regex: searchParams.nombre_unidad_academica, $options: 'i' };
//endJSnombre_unidad_academica
//initJSid_saga
if (searchParams?.id_saga) query.id_saga = { $regex: searchParams.id_saga, $options: 'i' };
//endJSid_saga
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
  if (!auth_required(req, res, ['read_unidades_academicas'], false)) return;
  if (req?.body?.query?.search) req.body.query.find = {
    ...req.body.query.find,
    ...await searchUnidades_academicas(req?.body?.query?.search)
  }
  const query = await getAll(Unidades_academicas, req, res);
  if (query) return res.status(200).json(query);
});
routes.post('/read', async function (req, res) {
  if (!auth_required(req, res, ['read_unidades_academicas'], false)) return;
  const query = await getDocument(Unidades_academicas, req, res);
  if (query) delete query._doc.password;
  if (query) return res.status(200).json(query);
});
//POST
routes.post('/create', async function (req, res) {
  if (!auth_required(req, res, ['create_unidades_academicas'], false)) return;
  try {
    var { unidades_academicas } = req.body;
    //validadores
    unidades_academicas.last_user = req.currentUser.id;
    //extrasCreate
    var query = await new Unidades_academicas(unidades_academicas).save();
    return res.status(200).json(query);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Datos Inválidos", error });
  }
});
//PUT
routes.put('/update/:id', async function (req, res) {
  if (!auth_required(req, res, ['update_unidades_academicas'], false)) return;
  const { id } = req.params;
  try {
    var { unidades_academicas } = req.body;
    unidades_academicas.last_user = req.currentUser.id;
    //extrasUpdate
    const document = await Unidades_academicas.findByIdAndUpdate(id, {
      $set: unidades_academicas
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
  if (!auth_required(req, res, ['delete_unidades_academicas'], false)) return;
  const { id } = req.params;
  try {
    const unidades_academicas = await Unidades_academicas.findById(id);
//extrasDelete
    await Unidades_academicas.deleteOne({ _id: id });
    return res.status(200).json({ message: "Unidades_academicas Delete" })
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Datos Inválidos", error });
  }
});
export default routes;