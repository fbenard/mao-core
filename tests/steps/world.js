// External dependencies

const { setWorldConstructor } = require(`@cucumber/cucumber`);


// Internal dependencies

const CustomWorld = require(`../classes/CustomWorld`);


// Set the world constructor

setWorldConstructor(CustomWorld);
