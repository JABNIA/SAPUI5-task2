sap.ui.define([
    "./BaseController",
    "sap/ui/core/routing/HashChanger"
], (BaseController, HashChanger) => {
    "use strict"

    return BaseController.extend("project1.controller.Product", {
        onInit() {
            const oModel = this.getOwnerComponent().getModel("ODataV2")
            const Id = HashChanger.getInstance().getHash().substring(8);
            oModel.read(`/Products(${Id})`, {
                success: (oData) => {
                    this.getView().setModel(oModel, "ProductModel")
                    console.log(this.getView().getModel("ProductModel"))

                    this.byId("ProductPageHeader").setObjectTitle(oData.Name)
                },
                error: () => {
                    console.log("error")
                }
            })

        },
    })
})

/*
<mvc:View xmlns:uxap="sap.uxap"
xmlns:core="sap.ui.core"
xmlns:mvc="sap.ui.core.mvc"
xmlns="sap.m"
xmlns:f ="sap.ui.layout.form"
controllerName="project1.controller.Product"
>
<uxap:ObjectPageLayout id="ProductObjectPageLayout">
<uxap:headerTitle>
<uxap:ObjectPageHeader id="ProductPageHeader" /> 
</uxap:headerTitle>
</uxap:ObjectPageLayout>
<f:SimpleForm
id="ProductSimpleForm"
> 
<f:content>
<core:Title text="{ODataV2>/Name}" />
<Label text="Product Name" />
<Text id="nameText" text="{SupplierName}" />
<Label text="Street and number where the contact is located" />
<Text text="{Street} {HouseNumber}" />
<Label text="ZIP Code and City" />
<Text text="{ZIPCode} {City}" />
<Label text="Country where the contact is located" />
<Text id="countryText" text="{Country}" />
<core:Title text="Online" />
<Label text="Web page of the contact" />
<Text text="{Url}" />
<Label text="Twitter account of the contact" />
<Text text="{Twitter}" />
</f:content>

<f:content>
</f:content>
</f:SimpleForm>
</mvc:View>
*? */



            onProductPage(oEvent) {
                const oRow = oEvent.getSource()
                const oRouter = this.getOwnerComponent().getRouter()

                oRouter.navTo(`Product`, {
                    ProductId: window.encodeURIComponent(oRow.getBindingContext("ODataV2").getPath().substring(10, 13))
                });
            }

                {
                    "name": "Product",
                    "pattern": "Product/{ProductId}",
                    "target": "ProductPage"
                }