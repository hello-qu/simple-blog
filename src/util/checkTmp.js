import { existsSync } from 'node:fs';
import fsPromises from 'fs/promises';
import path from 'path';


const checkTmpFile = async () => {
  const dataFilePath = path.join(process.cwd(), 'data.json');
  let tempFilePath = path.join('/tmp', 'data.json');
  if(existsSync(tempFilePath)){
    console.log('文件存在')
  }else{
    await fsPromises.copyFile(dataFilePath,tempFilePath )
  }
}

export default checkTmpFile
