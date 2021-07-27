import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDoc } from "../../../DB/Dynamo";

const dynamoDBTableName = "ScouterApp";

export const handler = async (event: any) => {
  console.log("Request event: ", event);
  let response = {};

  let body = event.pathParameters;

  let pageId = body.pageID && body.pageID.replace("_", "#");
  let params = {
    TableName: dynamoDBTableName,
    FilterExpression: `#typ = :id AND NOT #ref = :z`,
    ExpressionAttributeNames: {
      "#typ": "TYPEID",
      "#ref": "REFERENCE",
    },
    ExpressionAttributeValues: {
      ":id": pageId,
      ":z": 0,
    },
  };
  console.log("Params", params);
  try {
    let data = await ddbDoc.send(new ScanCommand(params));
    response = buildResponse(200, data.Items);
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
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
    },
    body: JSON.stringify(body),
  };
}
