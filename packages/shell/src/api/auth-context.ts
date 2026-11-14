type ReAuthenticateHandler = () => Promise<void> | void;

let reAuthenticateHandler: ReAuthenticateHandler | undefined;

export function setAuthReAuthenticate(handler: ReAuthenticateHandler) {
  reAuthenticateHandler = handler;
}

export async function reAuthenticate() {
  if (!reAuthenticateHandler) {
    throw new Error('Auth re-authentication handler is not configured.');
  }
  await reAuthenticateHandler();
}
