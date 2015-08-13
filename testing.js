

var GoogleSpreadsheet = require("google-spreadsheet");
 
// spreadsheet key is the long id in the sheets URL 
var my_sheet = new GoogleSpreadsheet('1wgsoSRI5d_wz_clwoh1M6nkGDVwJCK9QfLThmnohSDY');
 
// Without auth -- read only 
// IMPORTANT: See note below on how to make a sheet public-readable! 
// # is worksheet id - IDs start at 1 
my_sheet.getRows( 1, function(err, row_data){
    console.log( 'pulled in '+row_data.length + ' rows');
});
 
// With auth -- read + write 
// see below for authentication instructions 
//var creds = require('SparkCalendar-32d8b99e017a.json');
//OR, if you cannot save the file locally (like on heroku) 
var creds = {
  client_email: '231446828709-h8dofh0s47g21c4n2dku7ieios76r7vk@developer.gserviceaccount.com',
  private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDbVSyBpe2d0utu\nEApBy5Sj2qIcoUHW0Zve8Ggv5Jpw0sLaTrOP7QmxkmOr2BFNr9K17P8THq/TqtwK\nUIbephqIhNDy5arUKSRj69taxLZFQmsegpDkF6Ey5xdcyvqpKWivq4ijUfDSnyji\nDaUQPv8CrYApYH/o/iGhqjyFi4M1ZIycUczVlrePfxmez7cLmvx2F9i3LBfB3ICr\nE5xohdHNzgpyv3Jy7JN52J3qpXEtvi+VAd4Xd91Jb3WF+HKk95t+02gdmZXF3qFA\n7tPgWXLLY6L+ECkf5EADv6Wx0y0jx7rDAHC39e0vT+co8gcgsT9YtGku6i2KWPln\nIafc3C2jAgMBAAECggEBANdXEJNZram+Y5dz+B4RGqalCXTCfjnDIh4IOsKK13bd\n9qEPlAxC1bmZ2HHneVWkwmQLg4PqJQbUQaV+2mvO+U3/2IYiJ06V9jyEXKEJcUse\nor0Zw9etu36WlMFuKBvdpAKVj1mKIb8otKL8cos4znZ6kdIOBIdkuvBWi4UyLGhF\ntcAdDwIcw6Ytolp6xLJStFyINpTvZl1/ZJDEmez9n6lJ4TzphdGQXTST7OyUL7rS\nQu004ce8W4skX4vc5XbPUJmdHd1fq5xXDFqOrCzYZEpk0E+J34CE4scLTzwdK27F\ntGLtKqh/Jeg6hTrCtsT3k1nQBNCSiKlTm7wYRvi20gECgYEA/eRJXjzcip7fAve8\n1rEL1P69cyf02UuiBL5nIWkiuDCC3J3I9by22kFneeII6fHzx3orIY/VKUyXxx/f\nKApHTnEbP2LdVBztW0p6walIX2/ScPvQdaLmsQ5xUzlcGusiI7Qusz0UE4m1xZ8h\nmlM8DPizXxwwNzKF278fbglkt4MCgYEA3SdsSGe6P4Qt2jWFBKZ5OrGlPvZZepEy\nS7whSCkVtJgBAfHSGIirftOaewUjPjCsp9QVeau0g6Q7KvHHOy8u81si6lW4XpOT\nHt7TBZjLjoZG9aTSf/rCygReXur/+Bsa5h5QVVhXNbLXWR9Yvf/ZfQpGftnh7zrX\n5uFAwewst2ECgYB3FGVc78q4sX8Dk1Jcl7lm8vvEUQ9EA3dAJlWUlA0WupoGA3NH\n3nUctORlhCCOKU8fVit4mE9wCV5+pHI0A24iWmZfOm14kAC7eplMz6sEKBxZpaHG\nKttsW8vHLvYGIhZnDJGCu7j42PQKdnJ6QWO+6b6ncz8iBG5H/MIvB/TXJQKBgHNX\nED5i+twNj+xyZUGboTZfWBOSX/BwsY6WO7Vq2AssC7p76FsrTGYE7liiwVK6CBIv\nplOina7ahJFNL99KKG57ZaZZtqJ8zQoYpG4S1ncqyO9sWuysV9MMnDtczMsVN940\niSk5vaIf9/hfROUy/rccGNAnypH+WoPrjt6U0m2BAoGAKgbjWJf9MwGuun3q1ToA\nw4qhT/7cXqk99FvOp9sC0PUeflGrcCmWKAb93iPvnQEfVbKNmyx1FyvHJGgaETGQ\nO4cCqA0sd3a3ndPeP5pjhXa4Ioqz/13WtL7WkJ83b9VD+jC50vtGZKKnFbInYeZR\npC+0aeyFWY+9Tnion7VMkyA\u003d\n-----END PRIVATE KEY-----\n'
}



module.exports = {
    get: function (req, res) {
	    var fName = req.query.fName;
		var lName = req.query.lName;
		var school = req.query.school;
		console.log(fName);
		my_sheet.useServiceAccountAuth(creds, function(err){
			console.log(err);
			my_sheet.addRow(1, {
				'First Name': fName, 
				"Last Name" : lName,
				"School" : school}, 
				function(err2) {
					console.log(err2);
			});
			res.send(200);
		});	        
    }
};
