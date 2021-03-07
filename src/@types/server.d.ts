interface CommonServerData<D = any> {
  code: number;
  result: D;
  message: string;
  success: boolean;
}
