sap.ui.define([], () => {
    "use strict";

    return {
        formatDate(sDate) {
            if(sDate !== null) return sDate.substring(0, 4);
        }
    }
})