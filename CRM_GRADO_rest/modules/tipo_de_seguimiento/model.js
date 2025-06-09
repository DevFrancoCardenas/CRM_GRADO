import { Schema, model } from "mongoose";
const tipo_de_seguimientoSchema = new Schema({
//initJStipo_de_seguimiento
tipo_de_seguimiento: {
            type: Schema.Types.String,
            required: true,
            uppercase: true,
            trim: true,
        },
//endJStipo_de_seguimiento
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
export default model('Tipo_de_seguimiento',tipo_de_seguimientoSchema);