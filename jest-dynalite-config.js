module.exports = {
    tables: [
      {
        TableName: "Scouter",
        KeySchema: [
          { AttributeName: "TYPEID", 
          KeyType: "HASH" 
        },
        {
          AttributeName:'REFERENCE',
          KeyType:"RANGE"
        }],
        AttributeDefinitions: [ { AttributeName: "TYPEID", AttributeType: "S" },
                                { AttributeName:'REFERENCE', AttributeType: "S"}],
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1,
        },
      },
      //More Tables
    ],
    basePort: 8000,
  };