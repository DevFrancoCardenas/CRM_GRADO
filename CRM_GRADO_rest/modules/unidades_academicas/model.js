import { Schema, model } from "mongoose";
const unidades_academicasSchema = new Schema({
//initJSnombre_unidad_academica
nombre_unidad_academica: {
            type: Schema.Types.String,
            required: true,
            uppercase: true,
            trim: true,
        },
//endJSnombre_unidad_academica
//initJSid_saga
id_saga: {
            type: Schema.Types.String,
            required: true,
            trim: true,
        },
//endJSid_saga
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
export default model('Unidades_academicas',unidades_academicasSchema);