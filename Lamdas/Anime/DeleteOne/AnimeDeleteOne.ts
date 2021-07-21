import { DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { ddbDoc } from "../../../DB/Dynamo";

const dynamoDBTableName = "ScouterApp";

exports.handler = async (event: any) => {
  console.log("Request event: ", event);
  let response = {};

  let body = JSON.parse(event.body);
  let params = {
    TableName: dynamoDBTableName,
    Key: {
      KEY_NAME: { S: "TYPEID" },
     
    },
  };

  try {
    const data = await ddbDoc.send(new DeleteItemCommand(params));
    response = buildResponse(200, data);
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
