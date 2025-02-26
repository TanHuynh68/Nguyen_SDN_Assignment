const API_ROUTE = {
    //member
    "GET_ALL_MEMBER": "/",
    "GET_MEMBER_DETAIL": "/:id",
    "CHANGE_PASSWORD": "/change-password",
    "DELETE_MEMBER": "/delete/:id",
    "RESTORE_MEMBER": "/restore/:id",
    "EDIT_MEMBER": "/edit/:id",
    "COMMENT_WATCH": "/comment/:id",
    //watch
    "GET_ALL_WATCH": "/get-all",
    "GET_ALL_WATCH_BY_CLIENT": "/client/get-all",
    "CREATE_WATCH": "/",
    "GET_WATCH": "/:id",
    "EDIT_WATCH": "/:id",
    "DELETE_WATCH": "/delete/:id",
    "RESTORE_WATCH": "/restore/:id",
    //brand
    "GET_ALL_BRANDS": "/get-all",
    "CREATE_BRAND": "/",
    "GET_BRAND": "/:id",
    "EDIT_BRAND": "/:id",
    "DELETE_BRAND": "/delete/:id",
    "RESTORE_BRAND": "/restore/:id",
}

module.exports = API_ROUTE;