import fsPromises from 'fs/promises';
import path from 'path';
import checkTmp from "@/util/checkTmp";

const dataFilePath = path.join('/tmp', 'data.json');

export default async function getArticle(req, res) {
  await checkTmp();
  const jsonData = await fsPromises.readFile(dataFilePath);
  const objectData = JSON.parse(jsonData);
  const reqBody = JSON.parse(req.body)
  const article = objectData.find(item => item.id == reqBody.id)
  res.status(200).json(article);
}
