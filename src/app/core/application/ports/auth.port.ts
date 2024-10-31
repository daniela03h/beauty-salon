import { ILoginRequest, ILoginResponse } from "../dto";

export interface PAuth {
  /**
   * 
   * @param req 
   */
  login(req: ILoginRequest): Promise<ILoginResponse>
  
}