import { Schema, model } from "mongoose";
const carrerasSchema = new Schema({
//initJSunidad_academica
unidad_academica: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Unidades_academicas",
        },
//endJSunidad_academica
//initJSnombre_carrera
nombre_carrera: {
            type: Schema.Types.String,
            required: true,
            uppercase: true,
            trim: true,
        },
//endJSnombre_carrera
//initJSid_saga_carrera
id_saga_carrera: {
            type: Schema.Types.String,
            required: true,
            trim: true,
        },
//endJSid_saga_carrera
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
export default model('Carreras',carrerasSchema);