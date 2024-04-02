
import fsPromises from 'fs/promises';
import path from 'path';
import checkTmp from "@/util/checkTmp";
const dataFilePath = path.join('/tmp', 'data.json');

export default async function addArticle(req, res) {
  try {
    await checkTmp()
    const jsonData = await fsPromises.readFile(dataFilePath);
    const objectData = JSON.parse(jsonData);
    const reqBody = JSON.parse(req.body)
    objectData.unshift(reqBody);

    const updatedData = JSON.stringify(objectData);
    await fsPromises.writeFile(dataFilePath, updatedData);

    res.status(200).json({message: '提交成功'});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: '服务器错误，请稍后再试'});
  }
}
