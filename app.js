const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const multer = require("multer");
const configu = require("./config")
const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({ storage: inMemoryStorage }).array("image",10);
const { BlobServiceClient } = require("@azure/storage-blob");
const streamifier = require("streamifier");
require("dotenv").config();

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_CONECTION
const containerName = "imagenes";

const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

const getBlobName = originalName => {
    const identifier = Math.random().toString().replace("0.", "");
    return `${identifier}-${originalName}`;
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/all", async (req, res) => {
    try {
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blobsIterator = containerClient.listBlobsFlat();

        let imagenes = "";

        for await (const blob of blobsIterator) {
            console.log(configu.getStorageAccountName());
            const contentType = blob.properties.contentType;
            console.log(contentType);
            const blobUrl = `https://${configu.getStorageAccountName()}.blob.core.windows.net/${containerName}/${blob.name}`;
         
                imagenes += `<img src="${blobUrl}" width="400">`;
                imagenes += `<video controls width="400">
                <source src="${blobUrl}">
                Your browser does not support the video tag.
               </video>`;
        }

        res.send(imagenes);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al listar los blobs");
    }
});

app.post("/upload", uploadStrategy, async (req, res) => {
    const containerClient = blobServiceClient.getContainerClient(containerName);

    try {
        console.log(req.files);
        const promises = req.files.map(async file => {
            const blobName = getBlobName(file.originalname);
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);

            const stream = streamifier.createReadStream(file.buffer);
            const contentType = file.mimetype;

            const options = {
                blobHTTPHeaders: {
                    blobContentType: contentType,
                    blobContentDisposition: "inline",
                },
            };

            const uploadResponse = await blockBlobClient.uploadStream(stream, file.buffer.length, undefined, options);
            console.log("Archivo subido:", uploadResponse.requestId);
        });

        await Promise.all(promises);

        res.status(200).send("Archivos subidos exitosamente");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al cargar archivos en Azure Blob Storage");
    }
});


app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
