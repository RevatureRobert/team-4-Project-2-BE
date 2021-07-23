import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDoc } from "../../../DB/Dynamo";

const dynamoDBTableName = "ScouterApp";
export const handler = async (event: any) => {
  console.log("Request event: ", event);
  let response = {};

  let body = JSON.parse(event.body);  
  let parentId = body.parentID;
  let bio = body.bio;
  let image = body.image;
  

  let params = {
    TableName: dynamoDBTableName,
    Item: {
      REFERENCE:'0',
      TYPEID: parentId,
      bio,
      image,
    },
  };

  try {
    await ddbDoc.send(new PutCommand(params));
    response = buildResponse(200, "Success");
  } catch (err) {
    response = buildResponse(400, "error with command");
    console.log(err);
  }

  return response;
};

function buildResponse(statusCode: number, body: any) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
}
