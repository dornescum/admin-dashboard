export interface Environment {
  production: boolean;
  apiUrl: string;
}


export const environment: Environment = {
  production: false,
  apiUrl: '',
  // apiUrl: 'http://localhost:3002/api/v1/',
};
