const API_ROUTE = {
    //member
    "GET_ALL_MEMBER": "/",
    "GET_MEMBER_DETAIL": "/:id",
    "CHANGE_PASSWORD": "/change-password",
    "DELETE_MEMBER": "/delete/:id",
    "RESTORE_MEMBER": "/restore/:id",
    "EDIT_MEMBER": "/edit/:id",
"CHANGE_PROFILE": "/member-profile",
    //perfume
    "GET_ALL_PERFUME": "/get-all",
    "GET_ALL_PERFUME_BY_CLIENT": "/client/get-all",
    "CREATE_PERFUME": "/",
    "GET_PERFUME": "/:id",
    "EDIT_PERFUME": "/:id",
    "DELETE_PERFUME": "/:id",
    "RESTORE_PERFUME": "/restore/:id",
    //brand
    "GET_ALL_BRANDS": "/",
    "CREATE_BRAND": "/",
    "GET_BRAND": "/:id",
    "EDIT_BRAND": "/:id",
    "DELETE_BRAND": "/:id",
    "RESTORE_BRAND": "/restore/:id",
}

module.exports = API_ROUTE;