import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDoc } from "../../../DB/Dynamo";

const dynamoDBTableName = "ScouterApp";

export const handler = async (event: any) => {
  console.log("Request event: ", event);
  let response = {};

  let body = JSON.parse(event.body);
  let postId = body.postID;
  let parentId = body.parentID;

  let params = {
    TableName: dynamoDBTableName,
    Key: {
      TYPEID: parentId,
      REFERENCE: postId,
    },
  };

  try {
    let data = await ddbDoc.send(new GetCommand(params));
    response = buildResponse(200, data.Item);
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
