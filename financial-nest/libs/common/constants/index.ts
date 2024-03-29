export const IS_PUBLIC_KEY = 'isPublic';
export const jwtConstants = {
  secret: 'wjeld-djeuedw399e3-uejheuii33-4jrjjejei3-rjdjfjf',
};
export enum Role {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}
export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export const permissions = {
  // everyone({ can }) {
  //   can(Action.Read, Post);
  //   can(Action.create, Post);
  // },

  // customer({ user, can }) {
  //   can(Actions.update, Post, { userId: user.id });
  // },

  [Role.ADMIN]({ can, cannot }) {
    // extend(Roles.customer);
    can(Action.Manage, 'all');
    // cannot(Action.Create, UserEntity);
  },
};
export * from './rpcCode';
