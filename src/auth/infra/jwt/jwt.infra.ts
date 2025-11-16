export const TOKEN_SERVICE = 'TOKEN_SERVICE';

export interface TokenPayload {
  sub: string;
  email: string;
}

export interface Jwt {
  sign(payload: TokenPayload): string;
  verify(token: string): TokenPayload;
}
