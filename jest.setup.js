import {ddbDoc} from './src/daos/DB/Dynamo'

afterAll(() => {
    ddbDoc.destroy();
  });