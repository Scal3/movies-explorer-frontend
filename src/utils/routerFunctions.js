import { setLoggout } from "../actions/actions"

//Переход основной сайт
export const goMain = (historyHookPush) => historyHookPush('/movies')

//Переход на роут логина
export const switchToLogin = (historyHookPush) => historyHookPush('/signin')

//Переход на роут регистрации
export const switchToRegistration = (historyHookPush) => historyHookPush('/signup')

//Выход из системы
export const signOut = (historyHookPush, dispatch) => {
  localStorage.removeItem('token');
  historyHookPush('/');
  dispatch(setLoggout())
}