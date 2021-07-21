import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDoc } from "../../../DB/Dynamo";

const dynamoDBTableName = "ScouterApp";

exports.handler = async (event: any) => {
  console.log("Request event: ", event);
  let response = {};

  let body = JSON.parse(event.body);  
  let parentId = body.parentID;

  let params = {
    TableName: dynamoDBTableName,
    FilterExpression: "begins_with(TYPEID, :atag) and #r = :zero",
    ExpressionAttributeNames:{
        "#r":"REFERENCE;"
    },
    ExpressionAttributeValues:{
        ":atag": "A#",
        ":zero":'0',
       
    },
  };

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
    },
    body: JSON.stringify(body),
  };
}
