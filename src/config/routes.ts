export const uiRoutes = {
  login: '/',
  signup: '/addUser',
  contactList: '/contactList',
  addContact: '/addContact',
  contactDetails: '/contactDetails',
  editContact: '/editContact',
  logout: '/logout',
} as const;

export const apiRoutes = {
  users: '/users',
  login: '/users/login',
  logout: '/users/logout',
  me: '/users/me',
  contacts: '/contacts',
  contact: (id: string) => `/contacts/${id}`,
} as const;
