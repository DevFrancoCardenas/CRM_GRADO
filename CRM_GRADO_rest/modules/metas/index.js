//initJScantidad_atendidos_plataforma
import { getQueryNumber } from "../../utils/database.js";
//endJScantidad_atendidos_plataforma
//initJSunidad_academica
import Unidades_academicas from '../unidades_academicas/model.js';
//endJSunidad_academica
import express from 'express';
import { auth_required, getAll, getDocument } from '../../utils/index.js';
import { convertToOr, getQueryDate } from '../../utils/database.js';
import User from '../user/model.js';
import Metas from './model.js';
//imports
const routes = express.Router();
async function searchMetas(searchParams) {
  let query = {};
  if (searchParams?.all) searchParams = {
    all: searchParams?.all,
    //initJSunidad_academica
unidad_academica: searchParams?.all,
//endJSunidad_academica
//initJSgestion
gestion: searchParams?.all,
//endJSgestion
//initJSmeta
meta: searchParams?.all,
//endJSmeta
//initJSmes_gestion
mes_gestion: searchParams?.all,
//endJSmes_gestion
//initJScantidad_atendidos_plataforma
cantidad_atendidos_plataforma: searchParams?.all,
//endJScantidad_atendidos_plataforma
//initJScantidad_ganados_mes
cantidad_ganados_mes: searchParams?.all,
//endJScantidad_ganados_mes
//initJScantidad_perdidos_mes
cantidad_perdidos_mes: searchParams?.all,
//endJScantidad_perdidos_mes
//initJSindicador_atencion
indicador_atencion: searchParams?.all,
//endJSindicador_atencion
//initJSfecha_registro
fecha_registro: searchParams?.all,
//endJSfecha_registro
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
//initJSgestion
if (searchParams?.gestion) query.gestion = { $regex: searchParams.gestion, $options: 'i' };
//endJSgestion
//initJSmeta
if (searchParams?.meta) query.meta = { $regex: searchParams.meta, $options: 'i' };
//endJSmeta
//initJSmes_gestion
if (searchParams?.mes_gestion) query.mes_gestion = { $regex: searchParams.mes_gestion, $options: 'i' };
//endJSmes_gestion
//initJScantidad_atendidos_plataforma
        if (searchParams?.cantidad_atendidos_plataforma) {
            const numberQuery = getQueryNumber(searchParams.cantidad_atendidos_plataforma);
            if (numberQuery) query.cantidad_atendidos_plataforma = numberQuery;
        }
//endJScantidad_atendidos_plataforma
//initJScantidad_ganados_mes
        if (searchParams?.cantidad_ganados_mes) {
            const numberQuery = getQueryNumber(searchParams.cantidad_ganados_mes);
            if (numberQuery) query.cantidad_ganados_mes = numberQuery;
        }
//endJScantidad_ganados_mes
//initJScantidad_perdidos_mes
        if (searchParams?.cantidad_perdidos_mes) {
            const numberQuery = getQueryNumber(searchParams.cantidad_perdidos_mes);
            if (numberQuery) query.cantidad_perdidos_mes = numberQuery;
        }
//endJScantidad_perdidos_mes
//initJSindicador_atencion
        if (searchParams?.indicador_atencion) {
            const numberQuery = getQueryNumber(searchParams.indicador_atencion);
            if (numberQuery) query.indicador_atencion = numberQuery;
        }
//endJSindicador_atencion
//initJSfecha_registro
        if (searchParams?.fecha_registro) {
            const date = getQueryDate(searchParams.fecha_registro);
            if (date) query.fecha_registro = date;
        }
//endJSfecha_registro
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
  if (!auth_required(req, res, ['read_metas'], false)) return;
  if (req?.body?.query?.search) req.body.query.find = {
    ...req.body.query.find,
    ...await searchMetas(req?.body?.query?.search)
  }
  const query = await getAll(Metas, req, res);
  if (query) return res.status(200).json(query);
});
routes.post('/read', async function (req, res) {
  if (!auth_required(req, res, ['read_metas'], false)) return;
  const query = await getDocument(Metas, req, res);
  if (query) delete query._doc.password;
  if (query) return res.status(200).json(query);
});
//POST
routes.post('/create', async function (req, res) {
  if (!auth_required(req, res, ['create_metas'], false)) return;
  try {
    var { metas } = req.body;
    //validadores
    metas.last_user = req.currentUser.id;
    //extrasCreate
    var query = await new Metas(metas).save();
    return res.status(200).json(query);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Datos Inválidos", error });
  }
});
//PUT
routes.put('/update/:id', async function (req, res) {
  if (!auth_required(req, res, ['update_metas'], false)) return;
  const { id } = req.params;
  try {
    var { metas } = req.body;
    metas.last_user = req.currentUser.id;
    //extrasUpdate
    const document = await Metas.findByIdAndUpdate(id, {
      $set: metas
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
  if (!auth_required(req, res, ['delete_metas'], false)) return;
  const { id } = req.params;
  try {
    const metas = await Metas.findById(id);
//extrasDelete
    await Metas.deleteOne({ _id: id });
    return res.status(200).json({ message: "Metas Delete" })
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Datos Inválidos", error });
  }
});
export default routes;