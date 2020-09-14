var mocky = require("mocky");
var fs = require("fs");

var ctpath = "/api";

mocky
  .createServer([
    {
      // Users
      url: ctpath + "/users",
      method: "get",
      res: function (req, res, callback) {
        fs.readFile("./response_data/users.json", "utf8", function (err, text) {
          callback(null, {
            status: 200,
            body: text,
          });
        });
      },
    },
  ])
  .listen(4321);
