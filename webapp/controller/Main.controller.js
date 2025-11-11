sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("project1.controller.Main", {
        onInit() {
            const oBookModel = new JSONModel();

            oBookModel.loadData("model/books.json");

            this.getView().setModel(oBookModel, "bookData");
        }
    });
});