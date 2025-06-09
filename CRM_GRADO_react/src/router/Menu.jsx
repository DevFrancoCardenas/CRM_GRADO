export var navigation = [
    { name: 'Dashboard', icon: "HomeIcon", href: '/dashboard' },
    {
            name: 'Atencion en plataforma',
            icon: 'ClipboardDocumentCheckIcon',
            permissions: [],
            children: [
                { name: 'Atencion', href: 'atencion/list', icon: 'PencilSquareIcon', permissions: ['read_atencion'] },
{ name: 'Seguimiento plataforma', href: 'seguimiento_plataforma/list', icon: 'MagnifyingGlassIcon', permissions: ['read_seguimiento_plataforma'] },
//childrenAtencion en plataforma
            ],
        },
        {
            name: 'Datos externos',
            icon: 'PencilSquareIcon',
            permissions: [],
            children: [
                { name: 'Importacion de datos', href: 'importacion_de_datos/list', icon: 'DocumentArrowUpIcon', permissions: ['read_importacion_de_datos'] },
//childrenDatos externos
            ],
        },
        {
            name: 'Parametricas',
            icon: 'WrenchScrewdriverIcon',
            permissions: [],
            children: [
                { name: 'Unidades academicas', href: 'unidades_academicas/list', icon: 'HomeModernIcon', permissions: ['read_unidades_academicas'] },
{ name: 'Carreras', href: 'carreras/list', icon: 'AcademicCapIcon', permissions: ['read_carreras'] },
{ name: 'Tipo de seguimiento', href: 'tipo_de_seguimiento/list', icon: 'Square3Stack3DIcon', permissions: ['read_tipo_de_seguimiento'] },
{ name: 'Metas', href: 'metas/list', icon: 'TrophyIcon', permissions: ['read_metas'] },
//childrenParametricas
            ],
        },
        {
            name: 'Mensajeria',
            icon: 'ChatBubbleLeftEllipsisIcon',
            permissions: [],
            children: [
                { name: 'Mensajeria', href: 'mensajeria/list', icon: 'ChatBubbleOvalLeftEllipsisIcon', permissions: ['read_mensajeria'] },
//childrenMensajeria
            ],
        },
        //sectionMenu
]
export var adminNavigation = [
    {
        name: 'Gestion de Usuarios',
        icon: "UsersIcon",
        permissions: [],
        children: [
            { name: 'Usuarios', href: 'user/list', icon: "UserIcon", permissions: ["read_user"] },
            { name: 'Grupos/Permisos', href: 'group/list', icon: "KeyIcon", permissions: ["read_group"] },
        ],
    },
]
//Llenar Permisos
navigation.forEach(element => {
    if (element.children) {
        var permissions = [];
        element.children.forEach(element2 => {
            permissions.push(element2.permissions);
        });
        element.permissions = permissions;
    }
});
adminNavigation.forEach(element => {
    if (element.children) {
        var permissions = [];
        element.children.forEach(element2 => {
            permissions.push(element2.permissions);
        });
        element.permissions = permissions;
    }
});