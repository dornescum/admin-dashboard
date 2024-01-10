export interface Environment {
  production: boolean;
  apiUrl: string;
}


export const environment: Environment = {
  production: false,
  apiUrl: 'https://api.mp.dornescu.ro/api/v1/',
};
