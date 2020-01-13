const QRCode = require('qrcode'); // https://www.npmjs.com/package/qrcode#usage

module.exports = function (expressApp) {
  expressApp.get('/', async (req, res, next) => {
    const stringToEncode = 'I want to be qrcoded !';
    const type = 'svg'; // png or svg
    const filePath = './qrcode.' + type;
    
    // Print a QRCode in the terminal
    const terminalQRCode = await QRCode.toString(stringToEncode, {type:'terminal'});
    console.log(terminalQRCode)

    try {
        // Generate a png file in the root folder
        await QRCode.toFile(filePath, stringToEncode, {width: '100', type: type});

        // Print a base64 text depicting a QRCode image
        const base64Png = await QRCode.toDataURL(stringToEncode, {width: '400', type: 'png'}); // Type cannot be svg ?
        console.log(base64Png);

        res.status(200).send(' \
            <html><body> \
                <img src = "' + base64Png + '" /> <br /> \
                The content of the above QRCode is : ' + stringToEncode + ' \
            </body></html>');
    } catch (error) {
        return res.status(500).send(error.message);
    }
  });
};
