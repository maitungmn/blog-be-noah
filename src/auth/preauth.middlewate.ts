import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";
import { firebaseAdmin } from "src/firebase/admin";

@Injectable()
export class PreauthMiddleware implements NestMiddleware {

  constructor() { }

  use(req: Request, res: Response, next: Function) {
    const token = req.headers.authorization;
    if (token != null && token != "") {
      firebaseAdmin.auth().verifyIdToken(token.replace("Bearer ", ""))
        .then(async decodedToken => {
          const user = {
            email: decodedToken.email
          };
          req["user"] = user;
          next();
        }).catch(error => {
          console.error(error);
          this.accessDenied(req.url, res, error.errorInfo?.message);
        });
    } else {
      this.accessDenied(req.url, res);
    }
  }

  private accessDenied(url: string, res: Response, msg: string = "") {
    res.status(403).json({
      statusCode: 403,
      timestamp: new Date().toISOString(),
      path: url,
      message: msg || "Access Denied"
    });
  }
}
