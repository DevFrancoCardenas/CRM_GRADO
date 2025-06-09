//initJSbanner
import { deleteFiles } from "../storageGoogle/index.js";
//endJSbanner
//initJSunidad_academica_mensaje
import Unidades_academicas from '../unidades_academicas/model.js';
//endJSunidad_academica_mensaje
import express from 'express';
import { auth_required, getAll, getDocument } from '../../utils/index.js';
import { convertToOr, getQueryDate } from '../../utils/database.js';
import User from '../user/model.js';
import Mensajeria from './model.js';
//imports
const routes = express.Router();
async function searchMensajeria(searchParams) {
  let query = {};
  if (searchParams?.all) searchParams = {
    all: searchParams?.all,
    //initJSunidad_academica_mensaje
unidad_academica_mensaje: searchParams?.all,
//endJSunidad_academica_mensaje
//initJSbanner
banner: searchParams?.all,
//endJSbanner
//fieldsSearch
    createdAt: searchParams?.all,
    updatedAt: searchParams?.all,
  }
  //initJSunidad_academica_mensaje
            if (searchParams?.unidad_academica_mensaje) {
                let list = await Unidades_academicas.find({ nombre_unidad_academica: { $regex: searchParams.unidad_academica_mensaje, $options: 'i' }}).exec();
                list = list.map(l => l._id);
                if (list.length > 0) query.unidad_academica_mensaje = { $in: list };
            }
//endJSunidad_academica_mensaje
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
  if (!auth_required(req, res, ['read_mensajeria'], false)) return;
  if (req?.body?.query?.search) req.body.query.find = {
    ...req.body.query.find,
    ...await searchMensajeria(req?.body?.query?.search)
  }
  const query = await getAll(Mensajeria, req, res);
  if (query) return res.status(200).json(query);
});
routes.post('/read', async function (req, res) {
  if (!auth_required(req, res, ['read_mensajeria'], false)) return;
  const query = await getDocument(Mensajeria, req, res);
  if (query) delete query._doc.password;
  if (query) return res.status(200).json(query);
});
//POST
routes.post('/create', async function (req, res) {
  if (!auth_required(req, res, ['create_mensajeria'], false)) return;
  try {
    var { mensajeria } = req.body;
    //validadores
    mensajeria.last_user = req.currentUser.id;
    //extrasCreate
    var query = await new Mensajeria(mensajeria).save();
    return res.status(200).json(query);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Datos Inválidos", error });
  }
});
//PUT
routes.put('/update/:id', async function (req, res) {
  if (!auth_required(req, res, ['update_mensajeria'], false)) return;
  const { id } = req.params;
  try {
    var { mensajeria } = req.body;
    mensajeria.last_user = req.currentUser.id;
    //extrasUpdate
    const document = await Mensajeria.findByIdAndUpdate(id, {
      $set: mensajeria
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
  if (!auth_required(req, res, ['delete_mensajeria'], false)) return;
  const { id } = req.params;
  try {
    const mensajeria = await Mensajeria.findById(id);
//initJSbanner
await deleteFiles(mensajeria?.banner);
//endJSbanner
//extrasDelete
    await Mensajeria.deleteOne({ _id: id });
    return res.status(200).json({ message: "Mensajeria Delete" })
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Datos Inválidos", error });
  }
});
export default routes;