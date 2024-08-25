import * as jose from 'jose';
import { UserToken } from '../types';
export class JwtHelper {
  public static readonly decode = (token: string) => {
    return jose.decodeJwt<UserToken>(token);
  };

  public static readonly getUserFirstName = (token: string) => {
    const { name } = this.decode(token);
    const [firstName, ...rest] = name.split(' ');
    const lastName = rest.pop() ?? firstName;
    const isSameName = firstName === lastName;

    return isSameName ? firstName : `${firstName} ${lastName}`;
  };
}
