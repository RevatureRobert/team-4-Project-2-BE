import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDoc } from "../../../DB/Dynamo";

const dynamoDBTableName = "ScouterApp";

exports.handler = async (event: any) => {
  console.log("Request event: ", event);
  let response = {};

  let body = JSON.parse(event.body);

  let filterString: string = "";

  let postIds: any[] = body.followArray;

  postIds.forEach((user) => {
    filterString += `contains(REFERENCE, ${user}) OR `;
  });

  filterString = filterString.substring(0, filterString.length - 4);

  let params = {
    TableName: dynamoDBTableName,
    FilterExpression: filterString,
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
