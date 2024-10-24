import {Injectable} from '@angular/core';
import {FirebaseFirestore} from "@capacitor-firebase/firestore";
import { User } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {
  }


  async updateUser(user: User): Promise<User> {
    let aInsertar = {...user}
    try {
      const updateUser = await FirebaseFirestore.setDocument({
        reference: `user/${user.uid}`,
        data: aInsertar,
        merge: true
      });
      console.log(updateUser);
      return user;
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      throw error; 
    }
  }

  async removeUser(user: User): Promise<void> {
    await FirebaseFirestore.deleteDocument({
      reference: `user/${user.uid}`,
    })
  }

  async getAll(): Promise<any> {
    const {snapshots} = await FirebaseFirestore.getCollection({
      reference: 'users',
      compositeFilter: {
        type: 'and',
        queryConstraints: [
          {
            type: 'where',
            fieldPath: 'email',
            opStr: '==',
            value: 'test@test.com'
          }
        ]
      },
      queryConstraints: [
        {
          type: 'limit',
          limit: 10
        }
      ]
    })
  }

  async getUser(user: User): Promise<User> {
    const {snapshot} = await FirebaseFirestore.getDocument({
      reference: `user/${user.uid}`,
    });

    return snapshot.data as User;
  }
}
