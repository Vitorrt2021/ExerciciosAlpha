createTooltip("#lblName", 100, 130, 102);
createTooltip("#div1", 123, 123, 423);
function createTooltip(element, live, strenght, speed) {
  $(element).tooltip({
    classes: {
      "ui-tooltip": "tooltip1",
      "ui-tooltip-content": "tooltip1",
    },
    content: `
    <div class="tooltip1">
      <img src="./images/strenght_icon.png" alt="Força">
      <label id='strength_value'>${strenght}</label>
      <img src="./images/live_icon.png" alt="Live">
      <label id="live_value">${live}</label>
      <img src="./images/speed_icon.png" alt="spped">
      <label id="live_value">${speed}</label>
    </div>`,
    // track: true,
    show: {
      delay: 100,
      duration: 500,
      effect: "slideDown",
    },
    hide: {
      delay: 100,
      duration: 500,
      effect: "slideUp",
    },
  });
}
