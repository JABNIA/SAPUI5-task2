sap.ui.define([], () => {
    "use strict";

    return {
        formatDate(sDate) {
            if(sDate !== null) return `Published: ${sDate.substring(0, 4)};`
        }
    }
})