import { config, Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { LoginType, ProfileType, UserType } from "@/types";
import { FbAuth, FbDb } from '@/plugins/firebase';
import router from "@/router";
import firebase from "firebase";
import DocumentData = firebase.firestore.DocumentData;

config.rawError = true;

@Module({ namespaced: true })
class User extends VuexModule {
  public data: UserType | null = null;
  public profile: ProfileType | null = null;
  public profileObserver: ( ) => void = () => {/**/};

  constructor(module: any) {
    super(module);

    // Auth Middleware
    router.beforeEach(async (to, from, next) => {
      const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
      const currentUser = await this.getCurrentUser();

      if (requiresAuth && !currentUser) {
        localStorage.clear();
        next({ name: 'SignIn' });
      } else {
        next();
      }
    })
  }

  @Mutation
  public setProfile(data: UserType | null) {
    this.data = data
  }

  @Mutation
  public setUserProfile(data: ProfileType | null) {
    this.profile = data;
  }

  @Action
  public userObserver(email: string) {
    // observa cambios en el perfil
    if (!this.profileObserver) {
      this.profileObserver = FbDb.collection('profiles').doc(email).onSnapshot(
          docSnapshot => {
            this.context.commit('setUserProfile', docSnapshot.data());
          },
          e => {
            console.log(e);
          }
      );
    }
  }

  @Action
  public getCurrentUser (): Promise<UserType> {
    return new Promise((resolve, reject) => {
      const unsubscribe = FbAuth.onAuthStateChanged(async user => {
        let response: UserType | null = null;
        unsubscribe(); // remove observer(see Firebase api);

        if (user) {
          const { displayName, email, emailVerified, metadata, phoneNumber, refreshToken, uid }  = user;

          response = {
            email,
            displayName,
            emailVerified,
            metadata,
            phoneNumber,
            refreshToken,
            uid
          }!
        }
        resolve(response);
      }, reject);
    })
  }

  @Action({ commit: 'setProfile' })
  public async signin(request: LoginType) {
    try {
      const { email, password } = request;
      const { user } = await FbAuth.signInWithEmailAndPassword(email, password);
      const { displayName, emailVerified, metadata, phoneNumber, refreshToken, uid }  = user!;
      if (user) {
        await this.context.dispatch('userObserver', email);

        return {
          displayName,
          email,
          emailVerified,
          metadata,
          phoneNumber,
          refreshToken,
          uid
        }
      }

      return null;
    } catch (e) {
      return e;
    }
  }

  @Action({ commit: 'setProfile' })
  public async signout() {
    try {
      this.profileObserver(); // dejamos de observar el perfil del usuario
      await firebase.auth!().signOut!();
      sessionStorage.clear();

      return true;
    } catch (e) {
      return e;
    }
  }
}

export default User;
