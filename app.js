import {createServer} from "http";
import {readFile,writeFile} from "fs/promises";
import path from "path";
import {fileURLToPath} from "url";
import crypto from "crypto";
//import { writeFile } from "fs";

const filePath=fileURLToPath(import.meta.url);
const dirname=path.dirname(filePath);

console.log(filePath);
console.log(dirname);

const DATA_FILE=path.join(`${dirname}/data`,"links.json");

const serve=async (res,file,contentType)=>{
    try {
        const data=await readFile(file);
        res.writeHead(200,{"Content-Type":contentType});
        res.end(data);
    } catch (error) {
        res.writeHead(404,{"Content-Type":"text/html"});
        res.end("404 PageNot Found");
    }
};

const loadLinks=async ()=>{
try {
    const data=await readFile(DATA_FILE,'utf-8');
    return JSON.parse(data);
} catch (error) {
    if(error.code==="ENOENT"){
        await writeFile(DATA_FILE,JSON.stringify({}));
        return {};
    }
    throw error;
}
};

const saveLinks=async (links)=>{
 await writeFile(DATA_FILE,JSON.stringify(links));
}
const server=createServer(async (req,res)=>{
    if(req.method==="GET"){
        //HTML
        if(req.url==="/"){
                return serve(res,path.join(dirname,"index.html"),"text/html");
        }
            //CSS
        else if(req.url==="/index.css"){
            return serve(res,path.join(dirname,"index.css"),"text/css");
        }
        
            //Javascript
        else if(req.url==="/index.js"){
            return serve(res,path.join(dirname,"index.js"),"text/javascript");
        }
        else if(req.url==='/links'){
            const links=await loadLinks();
            res.writeHead(200,{"Content-Type":"application/json"});
            return res.end(JSON.stringify(links));
        }
        else{
            const links=await loadLinks();
            const shortCode=req.url.slice(1);
            if(links[shortCode]){
                res.writeHead(302,{location:links[shortCode]});
                return res.end();
            }
            else{
            res.writeHead(404,{"content-Type":"text/plain"});
            return res.end("Shortened URL not found");
        }
        }
    }
    if(req.method==="POST" && req.url==="/shorten"){
        const links=await loadLinks();
        let body="";
        req.on("data",(chunk)=>{
            body+=chunk;
        });
        req.on("end",async ()=>{
            console.log(body);
            const {url,shortCode}=JSON.parse(body);
            if(!url){
                res.writeHead(400,{"Content-Type":"text/plain"});
                return res.end("URL is Required");
            }

            const finalShortCode=shortCode || crypto.randomBytes(4).toString("hex");
            if(links[finalShortCode]){
                res.writeHead(200,{"Content-Type":"text/plain"});
                return res.end(JSON.stringify({success:true,shortCode:finalShortCode,finalUrl:url}));
            }

            links[finalShortCode]=url;
            await saveLinks(links);
            res.writeHead(200,{"Content-Type":"application/json"});
            return res.end(JSON.stringify({success:true,shortCode:finalShortCode,finalUrl:url}));
        }); 
    }
});
const PORT=5000;
server.listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT}`);
});