// @TOOD - refactor 

const dynamoose = require("dynamoose");

console.log(process.env);

// dynamoose.aws.sdk.config.update({
//   region: process.env.AWS_REGION,
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// });

/**
 * Participant metadata that is stored in AWS-DynamoDB
 */
const participant = new dynamoose.Schema({
  Type: {
    type: String,
    default: "Participant"
  },
  Key: String,
  id: String,
  age: Number,
  Fname: String,
  Lname: String,
  password: String,
  User: String, // Legacy, included in old applicaiton
  // "preferences": Object,
  GPQI: Number,
  phone: String,
  Email: String,

  allergies: {
    type: Object,
    schema: {
      peanuts: Boolean,
      shellfish: Boolean,
      lactose: Boolean,
      wheat: Boolean,
      soy: Boolean,
      treenut: Boolean,
    },
  },
  Food_specifices: {
    type: Object,
    schema: {
      local: Boolean,
      organic: Boolean,
    },
  },
  Retrictions: {
    type: Object,
    schema: {
      gluten: Boolean,
      chicken: Boolean,
      egg: Boolean,
      "red meat": Boolean,
      fish: Boolean,
      gmo: Boolean,
      beef: Boolean,
      pork: Boolean,
      dairy: Boolean,
    },
  },
});

/**
 * Data to display a specific coupon
 */
const coupon = new dynamoose.Schema({
  Type: {
    type: String,
    default: "Coupon"
  },
  Key: String,
  id: String,
  title: String,
  discount: String,
  expires: String,
  description: String,
});

/**
 * Data to display a specific recipe
 */
const recipe = new dynamoose.Schema({
  Type: {
    type: String,
    default: "Recipe"
  },
  Key: String,
  id: String,
  title: String,
  image: String, // Link to a path in the public folder
  time: String,
  serving: Number,
  ingredients: Object,
  steps: Array,
});

/**
 * For linking a coupon or recipe to a specific person
 * A coupon/recipe will not appear for a specific user unless there is a link for it
 */
const link = new dynamoose.Schema({
  Type: {
    type: String,
    default: "Link"
  },
  Key: String,
  Linked_type: String, // Coupon or Recipe
  Link_id: String,      // Key of the coupon or recipe
  userid: String, // Userid that the content is linked to
  saved: Boolean, // Wether this link has been saved by the user
});

const Participant = dynamoose.model(process.env.DYNAMO_TABLE, participant);
const Coupon = dynamoose.model(process.env.DYNAMO_TABLE, coupon);
const Recipe = dynamoose.model(process.env.DYNAMO_TABLE, recipe);
const Link = dynamoose.model(process.env.DYNAMO_TABLE, link);

let newUser = new Participant({
  Type: "Participant",
  Key: "bdahrooge@gmail.com",
  id: "123",
  age: 22,
  Fname: "Ben",
  Lname: "Test",
  password: "password1234",
  User: "Null", // Legacy, included in old applicaiton
  GPQI: 5,
  phone: "4015555555",
  Email: "bdahrooge@gmail.com",

  allergies: {
    peanuts: true,
    shellfish: true,
    lactose: true,
    wheat: true,
    soy: true,
    treenut: true,
  },
  Food_specifices: {
    local: true,
    organic: true,
  },
  Retrictions: {
    gluten: true,
    chicken: true,
    egg: true,
    "red meat": true,
    fish: true,
    gmo: true,
    beef: true,
    pork: true,
    dairy: true,
  },
});

newUser.save((error) => {
  if (error) {
      console.error(error);
  } else {
      console.log("Save operation was successful.");
  }
});

// let milk = new Coupon({
//   Type: "Coupon",
//   Key: "c-256562456",
//   id: "milk-256562456",
//   title: "Whole Milk",
//   discount: "$1.50 off",
//   expires: "12/31/21",
//   description: "Any brand; 100% whole milk only; Limit 1 per enrolled study participant",
// })

// milk.save()

let user_link = new Link({
  Key: "1234",
  Linked_type: "Coupon", // Coupon or Recipe
  userid: "bdahrooge@gmail.com", // Userid that the content is linked to
  Link_id: "c-256562456",
  saved: true, // Wether this link has been saved by the user
});

user_link.save((error) => {
  if (error) {
      console.error(error);
  } else {
      console.log("Save operation was successful.");
  }
});