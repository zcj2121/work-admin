const getters = {
  sidebar: state => state.app.sidebar,
  limit: state => state.app.limit,
  token: state => state.user.token,
  userId: state => state.user.userId,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  dep: state => state.user.dep,
  setting: state => state.user.setting,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters
}
export default getters
