import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDoc } from "../../../DB/Dynamo";

const dynamoDBTableName = "ScouterApp";

export const handler = async (event: any) => {
  console.log("Request event: ", event);
  let response = {};

  
  let body = JSON.parse(event.body);  
  
  const params = {
    TableName: dynamoDBTableName,
    FilterExpression: "contains(TYPEID, :atag) AND #r = :zero",
    ExpressionAttributeNames:{
        "#r": "REFERENCE"
    },
    ExpressionAttributeValues: {
        ":atag": "A#",
        ":zero": "0"
    }
};
try {
    const data = await ddbDoc.send(new ScanCommand(params));
    console.log("Success :", data.Items);
    

    response = buildResponse(200,data.Items);
} catch (err) {
    response = buildResponse(400, "error with command");
    console.log("Error", err);
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
