import { NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";
export declare class PreauthMiddleware implements NestMiddleware {
    constructor();
    use(req: Request, res: Response, next: Function): Promise<void>;
    private accessDenied;
}
