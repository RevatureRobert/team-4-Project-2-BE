import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDoc } from "../../../DB/Dynamo";

const dynamoDBTableName = "ScouterApp";

export const handler = async (event: any) => {
  console.log("Request event: ", event);
  let response = {};

  let body = event.pathParameters;

  const params = {
    TableName: dynamoDBTableName,
    FilterExpression: "contains(TYPEID, :atag) AND #r = :zero",
    ExpressionAttributeNames: {
      "#r": "REFERENCE",
    },
    ExpressionAttributeValues: {
      ":atag": "A#",
      ":zero": "0",
    },
  };

  const data = await ddbDoc.send(new ScanCommand(params));
  console.log("Success :", data.Items);

  response = buildResponse(200, data.Items);

  return response;
};

function buildResponse(statusCode: number, body: any) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "*",
    },
    body: JSON.stringify(body),
  };
}
