import { countInstances } from "../../Shared/ObjectsCounter";
import {
  Account,
  SessionToken,
  TokenGenerator,
  TokenRights,
  TokenState,
  TokenValidator,
} from "../Model";
import { SessionTokenDBAccess } from "./SessionTokenDBAccess";
import { UserCredentialsDBAccess } from "./UserCredentialsDBAccess";

import {logInvocation} from '../../Shared/MethodDecorators'

@countInstances
export class Authorizor implements TokenGenerator, TokenValidator {
  private userCredentialsDBAccess: UserCredentialsDBAccess =
    new UserCredentialsDBAccess();
  private sessionTokenDBAccess: SessionTokenDBAccess =
    new SessionTokenDBAccess();

  @logInvocation
  async generateToken(account: Account): Promise<SessionToken | undefined> {
    const userCredentials =
      await this.userCredentialsDBAccess.getUserCredentials(
        account.username,
        account.password
      );

    if (userCredentials) {
      const sessionToken = {
        tokenId: Math.random().toString(36).slice(2),
        username: account.username,
        valid: true,
        expirationTime: new Date(Date.now() + 60 * 60 * 1000),
        accessRights: userCredentials.accessRights,
      };

      await this.sessionTokenDBAccess.storeSessionToken(sessionToken);

      return sessionToken;
    } else {
      return undefined;
    }
  }

  async validateToken(tokenId: string): Promise<TokenRights> {
    const token = await this.sessionTokenDBAccess.getToken(tokenId);

    if (!token || !token.valid) {
      return {
        accessRights: [],
        state: TokenState.INVALID,
      };
    } else if (token.expirationTime < new Date()) {
      return {
        accessRights: [],
        state: TokenState.EXPIRED,
      };
    } else {
      return {
        accessRights: token.accessRights,
        state: TokenState.VALID,
      };
    }
  }
}
