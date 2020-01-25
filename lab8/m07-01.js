var url = require("url");
function Stat(sfn='./static'){
    this.STATIC_FOLDER=sfn;
    let pathStatic = (fn)=>{return `${this.STATIC_FOLDER}${fn}`;}
    this.writeHTTP404=(res)=>{
        res.statusCode = 404;
        res.statusMessage = 'Resourse not found';
        res.end("HTTP ERROR 404: Resourse not found");
    }
    let fs = require('fs');
    let pipeFile = (req, res, headers)=>{  
        let arr = pathStatic(req.url).split('/'); 
        delete arr[2];
        let filename = arr[0] + '/' + arr[1] + '/' + arr[3];  
        console.log(filename);
        res.writeHead(200, headers);
        fs.createReadStream(filename).pipe(res);
    }
    this.isStatic = (ext, fn)=>{
        let reg = new RegExp(`^\/.+\.${ext}$`); 
        return reg.test(fn);
    }
    this.sendFile = (req, res, headers)=>{   
        let arr = pathStatic(req.url).split('/'); 
        delete arr[2];
        let filename = arr[0] + '/' + arr[1] + '/' + arr[3];  
        console.log(filename);     
        fs.access(filename, fs.constants.R_OK, err =>{
            console.log(err);
            if(err) this.writeHTTP404(res);
            else pipeFile(req, res, headers);
        });
    }
}

module.exports=(parm)=>{return new Stat(parm);}