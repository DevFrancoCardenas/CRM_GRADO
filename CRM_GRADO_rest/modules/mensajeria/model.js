import { Schema, model } from "mongoose";
const mensajeriaSchema = new Schema({
//initJSunidad_academica_mensaje
unidad_academica_mensaje: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Unidades_academicas",
        },
//endJSunidad_academica_mensaje
//initJSbanner
banner: [{
            type: Schema.Types.Mixed,
        }],
//endJSbanner
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
export default model('Mensajeria',mensajeriaSchema);