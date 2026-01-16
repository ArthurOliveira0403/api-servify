export abstract class Exception extends Error {
  private readonly _internalMessage: string;
  private readonly _externalMessage: string;
  private readonly _context: string;

  constructor(
    internalMessage: string,
    externalMessage?: string,
    context?: string,
  ) {
    super(internalMessage);
    this._internalMessage = internalMessage;
    this._externalMessage = externalMessage ?? '';
    this._context = context ?? '';
    this.name = Exception.name;
  }

  get internalMessage() {
    return this._internalMessage;
  }
  get externalMessage() {
    return this._externalMessage;
  }
  get context() {
    return this._context;
  }
}
