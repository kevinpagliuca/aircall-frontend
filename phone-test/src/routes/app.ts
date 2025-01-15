export const APP_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  CALLS_LIST: '/calls',
  CALL_DETAILS: (callId: string) => `/calls/${callId}`
};

export const PUBLIC_ROUTES = [APP_ROUTES.LOGIN, APP_ROUTES.HOME];
