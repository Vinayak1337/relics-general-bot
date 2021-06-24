const fs = require('fs');
module.exports = () => {
	fs.unlink('./data/database/file', function(err) {
		if (err) throw err;
		console.log('File deleted!');
	});
};
