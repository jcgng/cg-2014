var init_time = 0;  

function initialise () {
}

/**
 * Main Panel Highlight Bed
 * 
 * @param {type} value
 * @param {type} timestep
 * @returns {undefined}
 */
function setHighlightMainPanelBed(value, timestep) {
    if(value) {
        HighlightMainPanelBed.transparency=0.5;
     } else {
        HighlightMainPanelBed.transparency=1.0;
     }
}
