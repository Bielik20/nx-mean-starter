import { environment as functionsEnv } from '@env-functions/environment';
import { environment as serverEnv } from '@env-server/environment';
import { dev } from './dev';
import { prod } from './prod';

const isProd = serverEnv.production || functionsEnv.production;
export const environment = isProd ? prod : dev;
