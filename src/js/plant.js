import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/styles.css";

// This function stores our state.

const storeState = (initialState) => {
  /// (initialState)
  let currentState = { initialState }; // {initialState}
  return (stateChangeFunction = (state) => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = { ...newState };
    return newState;
  };
};

const plantArray = [];
let currentPlant = 0;

// const stateControl = storeState(plantArray[currentPlant]);

// in newPlant
// plantArray.push(stateControl);

// in feed button click
// index = button's index
// plantArray[index] --> stateControl
// plantarray[index](feed)

// This is a function factory. We can easily create more specific functions that alter a plant's soil, water, and light to varying degrees.

const changeState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop]: (state[prop] || 0) + value,
    });
  };
};

// Add new plant to array
function newPlant(name) {
  const stateControl = storeState(plantArray[currentPlant]);
  const plant = { Name: name, stateControl };
  const count = plantArray.length;
  currentPlant = count;
  plantArray.push(plant);
  return `<button class="btn btn-info next-plant" value=${count}>${name}</button>`;
}

// We create four functions using our function factory. We could easily create many more.

const soil = changeState("soil")(0);
const feed = changeState("soil")(1);
const blueFood = changeState("soil")(5);

const water = changeState("water")(0);
const hydrate = changeState("water")(1);
const superWater = changeState("water")(5);

const sun = changeState("light")(0);
const light = changeState("light")(1);
const growLight = changeState("light")(5);

$(document).ready(function () {
  $("#new-plant").click(function () {
    const newName = $("#plant-name").val();
    const newhtml = newPlant(newName);
    $("#yourPlants").append(`<li>${newhtml}</li>`);
  });

  $("ul#yourPlants").on("click", "button.next-plant", function () {
    currentPlant = this.value;
    $("#currentPlantName").text(plantArray[currentPlant].Name);
    const currentState = plantArray[currentPlant].stateControl;
    const currentSoil = currentState(soil).soil;
    const currentWater = currentState(water).water;
    const currentLight = currentState(sun).light;
    console.log(currentSoil);
    console.log(plantArray[currentPlant]);
    console.log(plantArray[currentPlant].stateControl.state);
    console.log(plantArray[currentPlant].soil);
    console.log(plantArray[currentPlant].stateControl.soil);
    console.log(plantArray[currentPlant].currentState);
    $("#soil-value").text(`Soil: ${currentSoil}`);
    $("#light-value").text(`Light: ${currentLight}`);
    $("#water-value").text(`Water: ${currentWater}`);
  });
  // This function has side effects because we are using jQuery. Manipulating the DOM will always be a side effect. Note that we only use one of our functions to alter soil. You can easily add more.

  // Soil
  $("#feed").click(function () {
    const newState = plantArray[currentPlant].stateControl(feed);
    $("#soil-value").text(`Soil: ${newState.soil}`);
  });

  $("#blueFood").click(function () {
    const newState = plantArray[currentPlant].stateControl(blueFood);
    $("#soil-value").text(`Soil: ${newState.soil}`);
  });
  // Light
  $("#light").click(function () {
    const newState = plantArray[currentPlant].stateControl(light);
    $("#light-value").text(`Light: ${newState.light}`);
  });

  $("#growLight").click(function () {
    const newState = plantArray[currentPlant].stateControl(growLight);
    $("#light-value").text(`Light: ${newState.light}`);
  });
  // Water
  $("#hydrate").click(function () {
    const newState = plantArray[currentPlant].stateControl(hydrate);
    $("#water-value").text(`Water: ${newState.water}`);
  });
  $("#superWater").click(function () {
    const newState = plantArray[currentPlant].stateControl(superWater);
    $("#water-value").text(`Water: ${newState.water}`);
  });

  // This function doesn't actually do anything useful in this application - it just demonstrates how we can "look" at the current state (which the DOM is holding anyway). However, students often do need the ability to see the current state without changing it so it's included here for reference.

  // $('#show-state').click(function() {
  //   // We just need to call stateControl() without arguments to see our current state.
  //   const currentState = stateControl();
  //   $('#soil-value').text(`Soil: ${currentState.soil}`);
  //   $('#light-value').text(`Light: ${currentState.light}`);
  //   $('#water-value').text(`Water: ${currentState.water}`);
  // });
});
