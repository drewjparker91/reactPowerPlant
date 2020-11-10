const changeState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop] : (state[prop] || 0) + value
    })
  }
}

const feed = changeState("soil");
const hydrate = changeState("water");
const giveLight = changeState("light");

// feed(5)(plant)

const blueFood = changeState("soil")(5)
const greenFood = changeState("soil")(10)
const yuckyFood = changeState("soil")(-5)

// blueFood(plant)

const storeState = () => {
  let currentState = {};
  return (stateChangeFunction) => {
    const newState = stateChangeFunction(currentState);
    currentState = {...newState};
    return newState;
  }
}

const storeState = () => {
  let currentState = { soil: 0, light: 0, water: 0 };
  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = {...newState};
    return newState;
  }
}

// stateControl = {currentState, stateChangeFunction()}
// const fedPlant = stateControl(blueFood)

const stateControl = storeState();


















// const changeState = (state, prop, value) => {
//   return {
//     ...state,
//     [prop]: (state[prop] || 0) + value
//   }
// }

// const changePlantState = (plant, property) => {
//   return {
//     ...plant,
//     [property]: (plant[property] || 0) + 1
//   }
// }



// const hydrate = (plant) => {
//   return {
//     ...plant,
//     water: (plant.water || 0) + 1
//   }
// };

// const feed = (plant) => {
//   return {
//     ...plant,
//     soil: (plant.soil || 0) + 1
//   }
// };