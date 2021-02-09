import { CurrentUserAuthData } from "../models/CurrentUserAuthData";
import platform from "platform"
import { AuthLog } from "../models/AuthLog";

/* 
*   Converts props to tailwind class names
*/
export const convertToClassNameAttributes = (object) => {
  let str = Object.values(object).toString()
  return str.replaceAll(',', ' ');
}

export const documentCookieJsonify = (documentCookie: string) => {
  let obj: CurrentUserAuthData = { u: '', a_t: '' };
  const cookies = documentCookie?.split(';')
  cookies.map(x => {
    const key = x.replace(/\s/g, "").split('=')[0]
    const value = x.replace(/\s/g, "").split('=')[1]
    obj[key] = value
  })

  return obj
}

export const cookieNames = (documentCookie) => {
  const cookies = documentCookie?.split(';')
  const names = cookies.map(x => {
    return x.replace(/\s/g, "").split('=')[0]
  })
  return names
}

export const cookieValues = (documentCookie) => {
  const cookies = documentCookie?.split(';')
  const names = cookies.map(x => {
    return x.replace(/\s/g, "").split('=')[1]
  })
  return names
}

export const deleteSpecificCookies = (cookieNames: string[]) => {
  cookieNames.forEach(c => {
    document.cookie = deleteCookie(c)
  });
}

export const deleteCookie = (name) => {
  const c = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  return c
}

export const isUserAuthorizedToViewThisPage = (currentUserRoles: string[], authorizedRoles: string[]) => {
  let res: boolean = false
  authorizedRoles.forEach(ar => {
    if (currentUserRoles.includes(ar)) {
      res = true
      return res
    }
  })
  return res
}

export const getPlatformData = () => {
  let p: AuthLog = { ip: null, osplatform: null, browsername: null, browserversion: null };
  
  p.osplatform = platform.os.toString()
  p.browsername = platform.name
  p.browserversion = platform.version
  
  return p
}