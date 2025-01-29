 import datauriParser from 'datauri/parser.js';
import path from 'path';

const parser=new datauriParser();
const getDataUri=(file,extname)=>{
    
    let content=parser.format(extname,file.buffer).content;
    return content;
}

export default getDataUri;
