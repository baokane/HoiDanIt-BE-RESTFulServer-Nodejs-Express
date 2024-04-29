const path = require('path')

const uploadSingleFile = async (fileObject) => {
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    // sampleFile = req.files.sampleFile;

    // let uploadPath = __dirname + fileObject.name;
    console.log('fileObject: ', fileObject)

    let uploadPath = path.resolve(__dirname, '../public/images/upload')

    console.log('__dirname: ', __dirname)
    console.log('uploadPath: ', uploadPath)
    console.log('>>> : ', __dirname + fileObject.name)

    let extName = path.extname(fileObject.name);
    console.log('>>> extName: ', extName)
    //get image's name (without extension)
    let baseName = path.basename(fileObject.name, extName);
    console.log('>>> baseName: ', baseName)

    //create final path: eg: /upload/your-image.png
    let finalName = `${baseName}-${Date.now()}${extName}`
    let finalPath = `${uploadPath}/${finalName}`;
    console.log('>>> finalPath: ', finalPath)

    // promise
    try {
        await fileObject.mv(finalPath)
        return {
            status: 'success',
            path: finalName,
            error: null
        }
    } catch (err) {
        console.log('>>> error :', err)
        return {
            status: 'failed',
            path: null,
            error: JSON.stringify(err)
        }
    }
    // callback
    // Use the mv() method to place the file somewhere on your server
    //     fileObject.mv(uploadPath, function (err) {
    //         if (err) {
    //             console.log('>>> error :', err, 'dir_name: ', __dirname)
    //             // return res.status(500).send(err)
    //             return {
    //                 status: 'failed',
    //                 path: null,
    //                 error: JSON.stringify(err)
    //             }
    //         }

    //         // res.send('File uploaded!');
    //         return {
    //             status: 'success',
    //             path: 'link-image',
    //             error: null
    //         }
    //     });
}

const uploadMultipleFiles = async (filesArr) => {
    try {
        let uploadPath = path.resolve(__dirname, "../public/images/upload");

        let resultArr = [];
        let countSuccess = 0;
        for (let i = 0; i < filesArr.length; i++) {
            console.log("check i = ", i)
            //get image extension
            let extName = path.extname(filesArr[i].name);

            //get image's name (without extension)
            let baseName = path.basename(filesArr[i].name, extName);

            //create final path: eg: /upload/your-image.png
            let finalName = `${baseName}-${Date.now()}${extName}`
            let finalPath = `${uploadPath}/${finalName}`;

            try {
                await filesArr[i].mv(finalPath);
                resultArr.push({
                    status: 'success',
                    path: finalName,
                    fileName: filesArr[i].name,
                    error: null
                })
                countSuccess++;
                console.log("countSuccess: ", countSuccess)
                console.log("filesArr: ", resultArr)
            } catch (err) {
                resultArr.push({
                    status: 'failed',
                    path: null,
                    fileName: filesArr[i].name,
                    error: JSON.stringify(err)
                })
            }
        }

        return {
            countSuccess: countSuccess,
            detail: resultArr
        }

    } catch (error) {
        console.log(error)
    }
}

module.exports = { uploadSingleFile, uploadMultipleFiles }