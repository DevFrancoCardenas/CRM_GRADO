import { Schema, model } from "mongoose";
const metasSchema = new Schema({
//initJSunidad_academica
unidad_academica: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Unidades_academicas",
        },
//endJSunidad_academica
//initJSgestion
gestion: {
            type: Schema.Types.String,
            required: true,
            trim: true,
        },
//endJSgestion
//initJSmeta
meta: {
            type: Schema.Types.String,
            required: true,
            trim: true,
        },
//endJSmeta
//initJSmes_gestion
mes_gestion: {
            type: Schema.Types.String,
            trim: true,
        },
//endJSmes_gestion
//initJScantidad_atendidos_plataforma
cantidad_atendidos_plataforma: {
            type: Schema.Types.Number,
        },
//endJScantidad_atendidos_plataforma
//initJScantidad_ganados_mes
cantidad_ganados_mes: {
            type: Schema.Types.Number,
        },
//endJScantidad_ganados_mes
//initJScantidad_perdidos_mes
cantidad_perdidos_mes: {
            type: Schema.Types.Number,
        },
//endJScantidad_perdidos_mes
//initJSindicador_atencion
indicador_atencion: {
            type: Schema.Types.Number,
        },
//endJSindicador_atencion
//initJSfecha_registro
fecha_registro: {
            type: Schema.Types.Date,
        },
//endJSfecha_registro
//fields
    last_user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true, //createdAt updatedAt automatic
    methods: {
        //solo para el documento
    },
    statics: {
        //para todo el modelo
    },
    query: {
        //para odenar o hacer consultas especiales
    }
});
export default model('Metas',metasSchema);