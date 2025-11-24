sap.ui.define([
    "sap/ui/core/util/MockServer"
], (MockServer) => {
    "use strict";

    return {
        init() {
            const oMockServer = new MockServer({
                rootUri: "/V2/OData/OData.svc/",
            });

            const oUrlParams = new URLSearchParams(window.location.search);

            MockServer.config({
                autoRespond: true,
                autoRespondAfter: oUrlParams.get("serverDelay") || 500,
            });

            const sPath = sap.ui.require.toUrl("project1/localService");

            oMockServer.simulate(sPath + "/metadataV2.xml", {
                sMockDataBaseUrl: sPath + "/mockdata",
                bGenerateMissingMockData: true,
            });

            oMockServer.start();
        }
    };

})