let massInput, velocityInput, massUnitSelect, velocityUnitSelect, outputUnitSelect, calculateButton, resetButton, resultP;

function setup() {
  createCanvas(400, 200);
  
  // Create input fields for mass and velocity
  massInput = createInput('');
  massInput.position(20, 20);
  
  velocityInput = createInput('');
  velocityInput.position(20, 60);
  
  // Create dropdown menus for unit selection
  massUnitSelect = createSelect();
  massUnitSelect.position(150, 20);
  massUnitSelect.option('lb');
  massUnitSelect.option('kg');
  massUnitSelect.option('gram');
  massUnitSelect.option('grain');
  
  velocityUnitSelect = createSelect();
  velocityUnitSelect.position(150, 60);
  velocityUnitSelect.option('ft/s');
  velocityUnitSelect.option('m/s');
  
  // Create a dropdown menu for output unit selection
  outputUnitSelect = createSelect();
  outputUnitSelect.position(150, 100);
  outputUnitSelect.option('foot-pounds');
  outputUnitSelect.option('joules');
  
  // Create buttons to trigger the calculation and reset the inputs
  calculateButton = createButton('Calculate Energy');
  calculateButton.position(20, 130);
  calculateButton.mousePressed(calculateEnergy);
  
  resetButton = createButton('Reset');
  resetButton.position(150, 130);
  resetButton.mousePressed(resetInputs);
  
  // Create a paragraph element to display the result
  resultP = createP('');
  resultP.position(20, 170);
}

function calculateEnergy() {
  // Get the mass and velocity values from the input fields
  let mass = parseFloat(massInput.value());
  let velocity = parseFloat(velocityInput.value());
  
  // Get the selected units
  let massUnit = massUnitSelect.value();
  let velocityUnit = velocityUnitSelect.value();
  let outputUnit = outputUnitSelect.value();
  
  // Check if the inputs are valid numbers and greater than zero
  if (!isNaN(mass) && mass > 0 && !isNaN(velocity) && velocity > 0) {
    // Convert mass and velocity to a consistent unit system (slugs and feet per second)
    if (massUnit === 'kg') {
      mass = mass * 2.20462;  // Convert mass from kg to lb
    } else if (massUnit === 'gram') {
      mass = mass / 453.59237;  // Convert mass from grams to lb
    } else if (massUnit === 'grain') {
      mass = mass / 7000;  // Convert mass from grains to lb
    }
    mass = mass * 0.031081;  // Convert mass from lb to slugs
    
    if (velocityUnit === 'm/s') {
      velocity = velocity * 3.28084;  // Convert velocity from m/s to ft/s
    }
    
    // Calculate the energy using the formula
    let energy = 0.5 * mass * velocity * velocity;  // Energy in foot-pounds
    
    // Convert energy to joules if selected
    if (outputUnit === 'joules') {
      energy = energy * 1.35582;  // Convert energy from foot-pounds to joules
    }
    
    // Display the result in the paragraph element
    resultP.html('Energy: ' + energy.toFixed(2) + ' ' + outputUnit);
  } else {
    resultP.html('Please enter valid numbers greater than zero for mass and velocity');
  }
}

function resetInputs() {
  // Reset the input fields and result paragraph
  massInput.value('');
  velocityInput.value('');
  resultP.html('');
}

function draw() {
  background(220);
}
