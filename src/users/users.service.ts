import { firebaseAdmin } from 'src/firebase/admin';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {


  async verifyToken(token: string) {
    if (token != null && token != "") {
      try {
        const decodedToken = await firebaseAdmin.auth().verifyIdToken(token.replace("Bearer ", ""))
        console.log("decodedToken", decodedToken)
        return decodedToken
      } catch (error) {
        console.error(error);
        throw error
      }
    } else {
      throw Error("Token was missing!")
    }
  }
}
