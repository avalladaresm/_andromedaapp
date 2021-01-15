import { AuthCookie } from "../models/AuthCookie";

/* 
*   Converts props to tailwind class names
*/
export const convertToClassNameAttributes = (object) => {
  let str = Object.values(object).toString()
  return str.replaceAll(',', ' ');
}

export const documentCookieJsonify = (documentCookie: string) => {
  let obj: AuthCookie = { uid: '', a_token: '' };
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



export const deleteCookie = (name) => {
  const c = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  console.log('ccc', c)
  return c
}