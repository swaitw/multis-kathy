// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by style-loader.js.
import { name as packageName } from "meteor/swaitw:style-loader";

// Write your tests here!
// Here is an example.
Tinytest.add('style-loader - example', function (test) {
  test.equal(packageName, "style-loader");
});
