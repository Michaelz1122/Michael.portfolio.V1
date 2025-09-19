export interface EnvVariables {
  GMAIL_EMAIL: string;
  GMAIL_APP_PASSWORD: string;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvVariables {}
  }
}