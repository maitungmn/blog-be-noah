import { adminAuth, usersCol } from './../firebase/admin';
import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";

@Injectable()
export class PreauthMiddleware implements NestMiddleware {

  constructor() {
  }

  async use(req: Request, res: Response, next: Function) {
    console.log(1111)
    const token = req.headers.authorization;
    if (token != null && token != "") {
      try {
        const decodedToken = await adminAuth.verifyIdToken(token.replace("Bearer ", ""))
        req["user"] = decodedToken;

        const userSnapshot = await usersCol(decodedToken.uid).get()
        if (!userSnapshot.exists() || userSnapshot.val()?.role !== "admin") {
          this.accessDenied(res, "Invalid admin token!");
        } else {
          next();
        }

      } catch (error) {
        console.error(error);
        this.accessDenied(res, error.errorInfo?.message);
      }
    } else {
      this.accessDenied(res);
    }
  }

  private accessDenied(res: Response, msg: string = "") {
    res.status(403).json({
      statusCode: 403,
      timestamp: new Date().toISOString(),
      message: msg || "Access Denied"
    });
  }
}
