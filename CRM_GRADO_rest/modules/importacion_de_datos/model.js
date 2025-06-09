import { Schema, model } from "mongoose";
const importacion_de_datosSchema = new Schema({
//initJSunidad_academica_importacion
unidad_academica_importacion: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Unidades_academicas",
        },
//endJSunidad_academica_importacion
//initJSfecha_importacion
fecha_importacion: {
            type: Schema.Types.Date,
            required: true,
        },
//endJSfecha_importacion
//initJSnombre_importado
nombre_importado: {
            type: Schema.Types.String,
            required: true,
            uppercase: true,
            trim: true,
        },
//endJSnombre_importado
//initJSapellido_paterno_importado
apellido_paterno_importado: {
            type: Schema.Types.String,
            uppercase: true,
            trim: true,
        },
//endJSapellido_paterno_importado
//initJSapellido_materno_importado
apellido_materno_importado: {
            type: Schema.Types.String,
            uppercase: true,
            trim: true,
        },
//endJSapellido_materno_importado
//initJScarnet_identidad_importacion
carnet_identidad_importacion: {
            type: Schema.Types.String,
            uppercase: true,
            trim: true,
        },
//endJScarnet_identidad_importacion
//initJSnumero_celular_importacion
numero_celular_importacion: {
            type: Schema.Types.Number,
        },
//endJSnumero_celular_importacion
//initJSnombre_tutor_impotado
nombre_tutor_impotado: {
            type: Schema.Types.String,
            uppercase: true,
            trim: true,
        },
//endJSnombre_tutor_impotado
//initJSapellido_paterno_tutor_importado
apellido_paterno_tutor_importado: {
            type: Schema.Types.String,
            uppercase: true,
            trim: true,
        },
//endJSapellido_paterno_tutor_importado
//initJSapellido_materno_tutor_importado
apellido_materno_tutor_importado: {
            type: Schema.Types.String,
            uppercase: true,
            trim: true,
        },
//endJSapellido_materno_tutor_importado
//initJScelular_tutor_importado
celular_tutor_importado: {
            type: Schema.Types.String,
            uppercase: true,
            trim: true,
        },
//endJScelular_tutor_importado
//initJScarrera_interes
carrera_interes: {
            type: Schema.Types.String,
            uppercase: true,
            trim: true,
        },
//endJScarrera_interes
//initJSgestion_bachiller_importado
gestion_bachiller_importado: {
            type: Schema.Types.String,
            uppercase: true,
            trim: true,
        },
//endJSgestion_bachiller_importado
//initJScolegio_importado
colegio_importado: {
            type: Schema.Types.String,
            uppercase: true,
            trim: true,
        },
//endJScolegio_importado
//initJStipo_colegio_importado
tipo_colegio_importado: {
            type: Schema.Types.String,
            uppercase: true,
            trim: true,
        },
//endJStipo_colegio_importado
//initJSdepartamento_importado
departamento_importado: {
            type: Schema.Types.String,
            uppercase: true,
            trim: true,
        },
//endJSdepartamento_importado
//initJSprovincia_importado
provincia_importado: {
            type: Schema.Types.String,
            uppercase: true,
            trim: true,
        },
//endJSprovincia_importado
//initJShorario_clases_importado
horario_clases_importado: {
            type: Schema.Types.String,
            uppercase: true,
            trim: true,
        },
//endJShorario_clases_importado
//initJStipo_visita_importada
tipo_visita_importada: {
            type: Schema.Types.String,
            required: true,
            uppercase: true,
            trim: true,
        },
//endJStipo_visita_importada
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
export default model('Importacion_de_datos',importacion_de_datosSchema);