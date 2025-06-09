import { Schema, model } from "mongoose";
const seguimiento_plataformaSchema = new Schema({
//initJSfecha_seguimiento
fecha_seguimiento: {
            type: Schema.Types.Date,
            required: true,
        },
//endJSfecha_seguimiento
//initJStipo_seguimiento
tipo_seguimiento: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Tipo_de_seguimiento",
        },
//endJStipo_seguimiento
//initJSestado_seguimiento
estado_seguimiento: {
            type: Schema.Types.String,
            required: true,
            uppercase: true,
            default: "ATENDIDO",
            trim: true,
        },
//endJSestado_seguimiento
//initJSobservacion_seguimiento_plataforma
observacion_seguimiento_plataforma: {
            type: Schema.Types.String,
            required: true,
            uppercase: true,
            trim: true,
        },
//endJSobservacion_seguimiento_plataforma
//initJSnombre_atencion
nombre_atencion: {
            type: Schema.Types.ObjectId,
            ref: "Atencion",
        },
//endJSnombre_atencion
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
export default model('Seguimiento_plataforma',seguimiento_plataformaSchema);