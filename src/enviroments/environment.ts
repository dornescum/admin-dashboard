export interface Environment {
  production: boolean;
  apiUrl: string;
}


export const environment: Environment = {
  production: false,
  // apiUrl: 'http://62.171.167.229:3002/api/v1/',
  // apiUrl: 'http://62.171.167.229:3002/api/v1/',
  // apiUrl: 'http://localhost:3002/api/v1/',
  apiUrl: 'http://api.mesteri-priceputi.ro/api/v1/',

};
