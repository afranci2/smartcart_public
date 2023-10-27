import * as dynamoose from "dynamoose";

// dynamoose.aws.sdk.config.update({
//   region: process.env.AWS_REGION,
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// });

/**
 * Participant metadata that is stored in AWS-DynamoDB
 */
 const participant = new dynamoose.Schema({
  Key: String,
  Type: {
    type: String,
    default: "Participant"
  },
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
  Key: String,
  Type: {
    type: String,
    default: "Coupon"
  },
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
  Key: String,
  Type: {
    type: String,
    default: "Recipe"
  },
  id: String,
  title: String,
  image: String, // Link to a path in the public folder
  time: String,
  serving: Number,
  ingredients: {
    "type": Array,
    "schema": [{
      "type": Object,
      "schema": { "name": String, "quantity": String }
    }]
  },
  steps: {
    "type": Array,
    "schema": [String]
  },
  funFacts: {
    "type": Array,
    "schema": [String]
  }
});

/**
 * For linking a coupon or recipe to a specific person
 * A coupon/recipe will not appear for a specific user unless there is a link for it
 */
const link = new dynamoose.Schema({
  Key: String,
  Type: {
    type: String,
    default: "Link"
  },
  Linked_type: String, // Coupon or Recipe
  Link_id: String,      // Key of the coupon or recipe
  userid: String, // Userid that the content is linked to
  saved: Boolean, // Wether this link has been saved by the user
});

const Participant = dynamoose.model("Participant", participant, {tableName: process.env.DYNAMO_TABLE});
const Coupon = dynamoose.model("Coupon", coupon, {tableName: process.env.DYNAMO_TABLE});
const Recipe = dynamoose.model("Recipe", recipe, {tableName: process.env.DYNAMO_TABLE});
const Link = dynamoose.model("Link", link,  {tableName: process.env.DYNAMO_TABLE});

export {Participant, Coupon, Recipe, Link}