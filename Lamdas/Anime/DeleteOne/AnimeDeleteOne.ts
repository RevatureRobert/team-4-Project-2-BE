import { DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDoc } from "../../../DB/Dynamo";

const dynamoDBTableName = "ScouterApp";

exports.handler = async (event: any) => {
  console.log("Request event: ", event);
  let response = {};

  let body = JSON.parse(event.body);  
  let parentId = body.parentID;
  

  let params = {
    TableName: dynamoDBTableName,
    Item: {
      TYPEID: parentId,
     
    },
  };

  try {
    await ddbDoc.send(new DeleteCommand(params));
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
