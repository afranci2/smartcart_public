// @TOOD - refactor 
const dynamoose = require("dynamoose");
const aws_dynamodb = require("@aws-sdk/client-dynamodb");
const dotenv = require('dotenv');
dotenv.config({path: '.env.development.local' });
console.log(process.env.AWS_REGION)
// dynamoose.aws.sdk.config.update({
//   region: process.env.AWS_REGION,
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// });
const ddb = new dynamoose.aws.ddb.DynamoDB({});
dynamoose.aws.ddb.set(ddb)

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
// const Table = new dynamoose.Table(process.env.DYNAMO_TABLE, [Participant, Coupon, Recipe, Link])


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

// newUser.save((error) => {
//   if (error) {
//       console.error(error);
//   } else {
//       console.log("Save operation was successful.");
//   }
// });

let rolled_oats = new Coupon({
  Type: "Coupon",
  Key: "c-1",
  id: "rolled-oats-1",
  title: "Rolled Oats",
  discount: "$1.50 off",
  expires: "12/31/23",
  description: "Any brand; limit 1 coupon per enrolled study participant",
})

let carrots = new Coupon({
  Type: "Coupon",
  Key: "c-2",
  id: "carrots-2",
  title: "Carrots",
  discount: "$2 off",
  expires: "11/31/23",
  description: "Any brand; limit 1 coupon per enrolled study participant",
})

let nutbutter = new Coupon({
  Type: "Coupon",
  Key: "c-3",
  id: "nutbutter-3",
  title: "Nut Butter",
  discount: "2 for $5",
  expires: "12/17/23",
  description: "Any brand; almond, peanut, or cashew only; limit 1 coupon per enrolled study participant",
})

let carrot_cake_oats = new Recipe(
  {
    Type: "Recipe",
    Key: "r-1",
    id: "carrotcake-1",
    title: "Carrot Cake Overnight Oats",
    image: "/CarrotCakeOats_Image.webp", // Link to a path in the public folder
    time: "8 hr, 10 min (overnight)",
    serving: 1,
    ingredients: [
      {name: "Oats", quantity: "1/2 cup"},
      {name: "Lowfat milk", quantity: "3/2 cup"},
      {name: "Grated carrots", quantity: "3 tbsp"},
      {name: "Nut butter", quantity: "1-2 tbsp"},
      {name: "Raisins", quantity: "1/2 tbsp"},
      {name: "Cinnamon", quantity: "1/2 tsp"},
      {name: "Maple Syrup", quantity: "1/2-1 tbsp"},
      {name: "Vanilla extract", quantity: "1/4 tsp"},
      {name: "Unsweetened flaked coconut, chopped nuts, or seeds (optional)", quantity: "1 tbsp"}
    ],
    steps: [
      "Place all ingredients except the optional add-ins and nut butter in a container and stir well until combined. After combined, top with nuts or nut butter of choice. Seal with a lid and place in the fridge overnight (or at least for 2-4 hours) ",
      "Bring oats out of the fridge in the morning and stir. You'll notice that the oats soak up a lot of liquid so you may want to add a little more milk before serving."
    ],
    funFacts: [
      "Eating oatmeal doesn’t have to be boring! Loaded with grated carrots, raisins and cinnamon flavor, these carrot cake overnight oats are a true breakfast treat that will keep you full 'till lunch.",
      "This recipe only takes 10 minutes to prepare the night before, allowing for a quick and delicious grab and go breakfast.",
      "A sprinkle of cinnamon spice adds some sweet spice to any dish, and is a great way to get your daily dose of antioxidants. Antioxidants are great for fighting inflammation by protecting our cells and immune system. ",
      "Adding carrots to your breakfast oats is a great way to ensure you are getting in your daily vegetable intake. Carrots contain vitamin C, a vitamin that helps our bodies in  many ways like: supporting your immune system and eyesight, and lowering cholesterol!",
      "Rolled oats are ideal for overnight oats. Oats are a great grain to incorporate into your diet, as they are packed with vitamins and minerals, a low-sodium food, and contain fiber, all which support a healthy heart and gut."
    ]
  }
)


let user_link1 = new Link({
  Key: "l-1",
  Linked_type: "Coupon", // Coupon or Recipe
  userid: "bdahrooge@gmail.com", // Userid that the content is linked to
  Link_id: "c-1",
  saved: false, // Wether this link has been saved by the user
});

let user_link2 = new Link({
  Key: "l-2",
  Linked_type: "Coupon", // Coupon or Recipe
  userid: "bdahrooge@gmail.com", // Userid that the content is linked to
  Link_id: "c-2",
  saved: false, // Wether this link has been saved by the user
});

let user_link3= new Link({
  Key: "l-3",
  Linked_type: "Recipe", // Coupon or Recipe
  userid: "bdahrooge@gmail.com", // Userid that the content is linked to
  Link_id: "r-1",
  saved: false, // Wether this link has been saved by the user
});

let user_link4 = new Link({
  Key: "l-4",
  Linked_type: "Coupon", // Coupon or Recipe
  userid: "bdahrooge@gmail.com", // Userid that the content is linked to
  Link_id: "c-3",
  saved: false, // Wether this link has been saved by the user
});

function error_msg(error) {
    if (error) {
      console.error(error);
  } else {
      console.log("Save operation was successful.");
  }
};

// user_link.save((error) => {
//   if (error) {
//       console.error(error);
//   } else {
//       console.log("Save operation was successful.");
//   }
// });



newUser.save(error_msg)
rolled_oats.save(error_msg);
carrots.save(error_msg);
nutbutter.save(error_msg);
carrot_cake_oats.save(error_msg);
user_link1.save(error_msg);
user_link2.save(error_msg);
user_link3.save(error_msg);
user_link4.save(error_msg);
