export const ROUTES_PATH = {
  ROOT: '/',
  DETAILS: 'details/:id',
  ABOUT: '/about',
  NOT_FOUND: '*',

  getDetailsPath: (id: string) => `/details/${id}`,
};
