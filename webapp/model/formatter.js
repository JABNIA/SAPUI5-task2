sap.ui.define([], () => {
    "use strict";

    return {
        formatDate(sDate) {
            console.log(sDate)
            if(sDate !== null) return sDate.substring(0, 4);
        }
    }
})