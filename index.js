const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();
const vision = require("@google-cloud/vision");

app.use(express.static(path.join(__dirname + "/uploads")))


//ejs
app.set("view engine","ejs")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });
  
  const upload = multer({storage:storage})
//To get requests
app.get('/', (req, res)=> {
    res.render("index",{data:""});
    // res.sendFile(__dirname + "/index.html");
})
//To post requests
app.post("/extractTextFromImage", upload.single("file"), (req,res)=> {
    console.log(req.file.path);
    

const CREDENTIALS =JSON.parse(
    JSON.stringify({
       // vision code
  
      type: "service_account",
      project_id: "first-energy-371605",
      private_key_id: "070937b0cfccff3892bc472d8236ee14bd444c22",
      private_key:
        "-----BEGIN PRIVATE KEY-----\nMIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQCYGtoNq9ohJ94t\naKpPT/V50LOHaIFpZnfbYPOq7acdYLd+3O38dIc1oACOEY3TcKqncsMtYA1pOwQ/\nzxUKNvUOixMtlKxzqhZZG2DqPfCAEgGPuo1Jcd71nEDvxFDcD5KHV31yvq+HAp9s\nwcta4cMknrOuGDik9FLLoT5x0S06s4ZWQeLcj2CX9MihfMmAGgnilXhYZYA5urr2\nqbHtOcZ41ggjUAh88TpyoTIQH44VXg31ICBf+TKIYDteGLl87hfyF+XRs0erCFCp\nwbqLcO8mJ9uiiQXpeOn2+bkDHerBee2o1SJ9FFfhaNnouWSj6o495jSABRs+uRL9\nc2NEjPpPAgMBAAECgf9KuW7d4iBx9j2wRG5VzMeyTFVd46ye8I15/VH8OCr65ea3\nMLBCkeu4ymImFAIqCJ6axvEs6pRWwEmz/kPGyWw0J8l/59cVHcb+/7AL7FDtzUAZ\nQpVIu1ui1n6H1K5tS8G5MzmYpXunE96CuimcDV5iMD/iT/LZWy5iymVjDYsRMTxk\npop0esMKifiIUaXq+dw8PilLojOBqhoChr0qiTeAS7RkgLtGeKn1wEG2/iNUsftq\nP8pd8wsgY6iwt4mHoFQDATSgd+tKUpJnEp1jmLbMStp02/lC0p+9LT3RX5s6Ajyq\nYQGi24t9w9HcNTeqevNj/sbIPMWeNcx0QCc2Q1ECgYEA1dGMI6Lj7DcM09fpg6kF\ne1/lt9IaV86sqPneVP7ZFdMG2fEBqyYvyl8S7WOT+5CHsvsRf+r1Pv4Ehd+T7rFr\nVOChGj4hpDlVdZ+QLnbGvJUHWgNqh0+C5HedPzrnHz4ZOluwtG9fMCKlk8BtJyqv\n5QMmptTF4Tath5dZQk/8m5ECgYEAthyWQ1GluIaydy+2DT7pCoSl2kw5Ue3OEhuK\nq4RyOutUoW4z6+/0yeoi9nGvoQ8MiqefefPzToJaYawp0QKLQtI6cN0r+QUNlLII\nZPDicHUo0LQgiVkryiNsHwJU3w3Uda11KUpNuMcoAnWXVA2fc/VPvB/r7olnlXIU\nR134h98CgYAcDgWcO2g6ezKkrSTHkKrWeEu05c1tDgIbncVtU476TRkOCZBVe4oz\nvGvIWBN3o4wakNTH+vU40a2YPzCy1famSV76CYLygE9VQp1xa0ZCQi+XwPD+VhFv\nlr48KKdgsw4uWQ+DbUWJFFKzY0EvLWus2c/9fdeE6F62dsZQbBxR8QKBgEbVWbD3\nigD7C2GGgkYmqRg5PhVpvoXafGPYqJhMHO5D6JgduD5WCB2dX1oCIDECHHu19TbH\nJ2TrGOKSx3UPi0FDag3KSTdDuuOSV+eDNmBNgcGjvmAN+hVWr9Bj5MUZqQDYphCY\nYSC0/h/uwxyja9j7mrbup6MReOPNCowzxd57AoGBAJq6cQOGGJr+LqaBU+sVUrI+\nk6/xXna9Btp8r4zZWTTMLpZIPRxjnTe/pA+MkdD/cgx8hg+HUgqPNxd4wSZZDnnk\nZ7Scn0R5o2isC7DLxD74xz8fvzUUM/t7xBBZ3MAYfp59ZUfUh8DHsrrn0GhOLMd3\n6uSk94USB5y7DL7Hj9N2\n-----END PRIVATE KEY-----\n",
      client_email:
        "aavi-team-project@first-energy-371605.iam.gserviceaccount.com",
      client_id: "116993245456912347890",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url:
        "https://www.googleapis.com/robot/v1/metadata/x509/aavi-team-project%40first-energy-371605.iam.gserviceaccount.com",
    })
  );
  
  const CONFIG = {
    credentials: {
      private_key: CREDENTIALS.private_key,
      client_email: CREDENTIALS.client_email,
    },
  };
  
  const client  = new vision.ImageAnnotatorClient(CONFIG);
  
  const detectText = async(file_path)=> {
    let[result] = await client.textDetection(file_path);

    // console.log(result.fullTextAnnotation.text);
    const text = result.fullTextAnnotation.text;
    console.log(text);
    res.render("index",{data:text})
  };
  
  detectText(req.file.path);
})

app.listen(5000,()=>{
    console.log("app listening on port 5000");
})