import { Schema, model } from "mongoose";
const atencionSchema = new Schema({
//initJSfecha_atencion
fecha_atencion: {
            type: Schema.Types.Date,
            required: true,
        },
//endJSfecha_atencion
//initJSnombres
nombres: {
            type: Schema.Types.String,
            required: true,
            uppercase: true,
            trim: true,
        },
//endJSnombres
//initJSapellido_paterno
apellido_paterno: {
            type: Schema.Types.String,
            uppercase: true,
            trim: true,
        },
//endJSapellido_paterno
//initJSapellido_materno
apellido_materno: {
            type: Schema.Types.String,
            uppercase: true,
            trim: true,
        },
//endJSapellido_materno
//initJScarnet_identidad
carnet_identidad: {
            type: Schema.Types.String,
            uppercase: true,
            trim: true,
        },
//endJScarnet_identidad
//initJSnumero_celular
numero_celular: {
            type: Schema.Types.Number,
            required: true,
        },
//endJSnumero_celular
//initJSnombre_tutor
nombre_tutor: {
            type: Schema.Types.String,
            uppercase: true,
            trim: true,
        },
//endJSnombre_tutor
//initJSapellido_materno_tutor
apellido_materno_tutor: {
            type: Schema.Types.String,
            required: true,
            uppercase: true,
            trim: true,
        },
//endJSapellido_materno_tutor
//initJSapellido_paterno_tutor
apellido_paterno_tutor: {
            type: Schema.Types.String,
            uppercase: true,
            trim: true,
        },
//endJSapellido_paterno_tutor
//initJSnumero_celular_tutor
numero_celular_tutor: {
            type: Schema.Types.Number,
        },
//endJSnumero_celular_tutor
//initJSunidad_academica
unidad_academica: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Unidades_academicas",
        },
//endJSunidad_academica
//initJSotras_carreras
otras_carreras: {
            type: Schema.Types.String,
            trim: true,
        },
//endJSotras_carreras
//initJSgestion_bachiller
gestion_bachiller: {
            type: Schema.Types.Number,
            required: true,
        },
//endJSgestion_bachiller
//initJScolegio
colegio: {
            type: Schema.Types.String,
            required: true,
            uppercase: true,
            trim: true,
        },
//endJScolegio
//initJStipo_colegio
tipo_colegio: {
            type: Schema.Types.String,
            required: true,
            uppercase: true,
            trim: true,
        },
//endJStipo_colegio
//initJSprovincia
provincia: {
            type: Schema.Types.String,
            required: true,
            uppercase: true,
            trim: true,
        },
//endJSprovincia
//initJScomo_te_enteraste_emi
como_te_enteraste_emi: [{
            type: Schema.Types.String,
            required: true,
            uppercase: true,
            trim: true,
        }],
//endJScomo_te_enteraste_emi
//initJSotro_metodo_capatacion
otro_metodo_capatacion: {
            type: Schema.Types.String,
            uppercase: true,
            trim: true,
        },
//endJSotro_metodo_capatacion
//initJShora_clase
hora_clase: {
            type: Schema.Types.String,
            required: true,
            uppercase: true,
            trim: true,
        },
//endJShora_clase
//initJSobservacion
observacion: {
            type: Schema.Types.String,
            required: true,
            uppercase: true,
            trim: true,
        },
//endJSobservacion
//initJSestado
estado: {
            type: Schema.Types.String,
            required: true,
            uppercase: true,
            default: "ATENDIDO",
            trim: true,
        },
//endJSestado
//initJSasesor
asesor: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
//endJSasesor
//initJSdepartamento
departamento: {
            type: Schema.Types.String,
            uppercase: true,
            trim: true,
        },
//endJSdepartamento
//initJScarreras
carreras: {
            type: Schema.Types.ObjectId,
            ref: "Carreras",
        },
//endJScarreras
//initJSnombre_completo
nombre_completo: {
            type: Schema.Types.String,
            uppercase: true,
            trim: true,
        },
//endJSnombre_completo
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
export default model('Atencion',atencionSchema);