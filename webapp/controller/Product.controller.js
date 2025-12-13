sap.ui.define(
    ["./BaseController", "sap/ui/core/routing/History",
        "sap/ui/model/Context"
    ],
    (BaseController, History, Context) => {
        "use strict";

        return BaseController.extend("project1.controller.Product", {
            onInit() {
                const oRouter = this.getOwnerComponent().getRouter();
                console.log(oRouter);

                oRouter
                    .getRoute("Product")
                    .attachPatternMatched(this._onRouteMatched, this);

            },

            _onRouteMatched(oEvent) {
                const sProductID = oEvent.getParameter("arguments").ProductId;

                const oModel = this.getOwnerComponent().getModel("ODataV2");
                oModel.read(`/Products(${sProductID})`, {
                    success: (oData) => {
                        const oContext = new Context(
                            oModel,
                            `/Products(${sProductID})`
                        );
                        this.getView().setBindingContext(oContext, "ODataV2");
                        console.log(oData.SupplierID);

                        oModel.read(`/Suppliers(${oData.SupplierID})`, {
                            success: (oSuppliersData) => {
                                const oTableContext = new Context(
                                    oModel,
                                    `/Suppliers(${oSuppliersData.ID})`
                                );
                                this.byId("supplierTable").setBindingContext(
                                    oTableContext,
                                    "ODataV2"
                                );
                            },
                            error: (oError) => {
                                console.error(
                                    "Failed to fetch supplier data:",
                                    oError
                                );
                            },
                        });
                    },
                    error: (oError) => {
                        console.error("Failed to fetch product data:", oError);
                    },
                });
            },
            onNavBack() {
                const oHistory = History.getInstance();
                const sPreviousHash = oHistory.getPreviousHash();

                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                }
            },
        });
    }
);
