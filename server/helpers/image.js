'use strict'
require('dotenv').config()
const fs = require('fs')

const {Storage} = require('@google-cloud/storage')

const CLOUD_BUCKET = process.env.CLOUD_BUCKET
console.log(process.env.KEYFILE_PATH)

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.KEYFILE_PATH
})
const bucket = storage.bucket(CLOUD_BUCKET)

const getPublicUrl = (filename) => {
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`
}

var fileExt

const saveImage = (req, res, next) => {
    let {image, extension, name} = req.body

    const base64Data = image.replace(/^data:image\/png;base64,|^data:image\/jpeg;base64,/, "");
    const newFilename = Date.now() + extension;
    const newFile = 'uploads/' + newFilename;

    fs.writeFile(newFile, base64Data, 'base64', function(err) {
      if (err) {
        console.log(err);
        res.status(500).json({
          msg: 'Internal server error',
        });
      } 
      else {
        req.filename = newFilename
        req.filepath = newFile
        next()
      }
    });
}

const sendUploadToGCS = (req, res, next) => {
  let gcsname = req.filepath
  const file = bucket.file(req.filename)

  console.log('in senduploaGCS...', file);

  bucket.upload(req.filepath, {})
      .then(() => {
        // file.makePublic()
        // .then( () => {
          req.file = {}
          let publicName = getPublicUrl(req.filename);
          req.file.cloudStoragePublicUrl = publicName;

          console.log('done upload...', req.file.cloudStoragePublicUrl);
          next()
        // })
        // .catch(err => {
        //   console.log(err);
        // })
      })

}

const Multer = require('multer'),
      multer = Multer({
        storage: Multer.MemoryStorage,
        limits: {
          fileSize: 5 * 1024 * 1024
        }
        // dest: '../images'
      })

module.exports = {
  getPublicUrl,
  saveImage,
  sendUploadToGCS,
  multer
}