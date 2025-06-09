import express from 'express';
import { auth_required, getAll, getDocument } from '../../utils/index.js';
import { convertToOr, getQueryDate } from '../../utils/database.js';
import User from '../user/model.js';
import Tipo_de_seguimiento from './model.js';
//imports
const routes = express.Router();
async function searchTipo_de_seguimiento(searchParams) {
  let query = {};
  if (searchParams?.all) searchParams = {
    all: searchParams?.all,
    //initJStipo_de_seguimiento
tipo_de_seguimiento: searchParams?.all,
//endJStipo_de_seguimiento
//fieldsSearch
    createdAt: searchParams?.all,
    updatedAt: searchParams?.all,
  }
  //initJStipo_de_seguimiento
if (searchParams?.tipo_de_seguimiento) query.tipo_de_seguimiento = { $regex: searchParams.tipo_de_seguimiento, $options: 'i' };
//endJStipo_de_seguimiento
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
  if (!auth_required(req, res, ['read_tipo_de_seguimiento'], false)) return;
  if (req?.body?.query?.search) req.body.query.find = {
    ...req.body.query.find,
    ...await searchTipo_de_seguimiento(req?.body?.query?.search)
  }
  const query = await getAll(Tipo_de_seguimiento, req, res);
  if (query) return res.status(200).json(query);
});
routes.post('/read', async function (req, res) {
  if (!auth_required(req, res, ['read_tipo_de_seguimiento'], false)) return;
  const query = await getDocument(Tipo_de_seguimiento, req, res);
  if (query) delete query._doc.password;
  if (query) return res.status(200).json(query);
});
//POST
routes.post('/create', async function (req, res) {
  if (!auth_required(req, res, ['create_tipo_de_seguimiento'], false)) return;
  try {
    var { tipo_de_seguimiento } = req.body;
    //validadores
    tipo_de_seguimiento.last_user = req.currentUser.id;
    //extrasCreate
    var query = await new Tipo_de_seguimiento(tipo_de_seguimiento).save();
    return res.status(200).json(query);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Datos Inválidos", error });
  }
});
//PUT
routes.put('/update/:id', async function (req, res) {
  if (!auth_required(req, res, ['update_tipo_de_seguimiento'], false)) return;
  const { id } = req.params;
  try {
    var { tipo_de_seguimiento } = req.body;
    tipo_de_seguimiento.last_user = req.currentUser.id;
    //extrasUpdate
    const document = await Tipo_de_seguimiento.findByIdAndUpdate(id, {
      $set: tipo_de_seguimiento
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
  if (!auth_required(req, res, ['delete_tipo_de_seguimiento'], false)) return;
  const { id } = req.params;
  try {
    const tipo_de_seguimiento = await Tipo_de_seguimiento.findById(id);
//extrasDelete
    await Tipo_de_seguimiento.deleteOne({ _id: id });
    return res.status(200).json({ message: "Tipo_de_seguimiento Delete" })
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Datos Inválidos", error });
  }
});
export default routes;