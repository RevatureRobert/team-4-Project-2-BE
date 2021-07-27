import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDoc } from "../../../DB/Dynamo";

const dynamoDBTableName = "ScouterApp";

export const handler = async (event: any) => {
  console.log("Request event: ", event);
  let response = {};
  let body = event.pathParameters; 
  let search = body.searchValue;
  const params = {
    // Specify which items in the results are returned.
    FilterExpression: "contains(TYPEID,:search) AND #ref =:ref",
    // Define the expression attribute value, which are substitutes for the values you want to compare.
    ExpressionAttributeValues: {
      ":ref": "0",
      ":search": search,
      
    },
    ExpressionAttributeNames:{
      "#ref":"REFERENCE",
    },
    // Set the projection expression, which are the attributes that you want.
    ProjectionExpression: " TYPEID",
    TableName: dynamoDBTableName,
  };
      try {
        const data = await ddbDoc.send(new ScanCommand(params));
        console.log(data.Items);
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
