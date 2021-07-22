import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDoc } from "../../../DB/Dynamo";

const dynamoDBTableName = "ScouterApp";

export const handler = async (event: any) => {
  console.log("Request event: ", event);
  let response = {};

  let body = JSON.parse(event.body);
  let postId = body.postID;
  let parentId = body.parentID;
  //console.log("update Body:", body);
  let updateString: string = "set ";
  let expressionValues: Object = {};
  Object.entries(body).forEach(([attribute, value]) => {
    if (attribute !== "postID" && attribute !== "parentID") {
      updateString += `${attribute} = :${attribute},`;
      expressionValues[`:${attribute}`] = value;
    }
  });
  updateString = updateString.substring(0, updateString.length - 1);
  let params = {
    TableName: dynamoDBTableName,
    Key: {
      TYPEID: parentId,
      REFERENCE: postId,
    },
    UpdateExpression: updateString,
    ExpressionAttributeValues: expressionValues,
  };
  console.log("update Paams: ", params);
  try {
    await ddbDoc.send(new UpdateCommand(params));
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
