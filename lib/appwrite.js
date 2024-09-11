import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';
export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.rn.tupperwarebrisa',
    projectId: '6697ad21002e39c19931',
    databaseId: '669be3ad0010fb8da1fc',
    userCollectionID: '669be3e0003137c23ac6',
    ordersCollectionId: '669be4fe002cdaeb981d',
    storageId: '669be7bc0005b140f3d7'
};

const {
endpoint,
platform,
projectId,
databaseId,
userCollectionID,
ordersCollectionId,
storageId,
} =config;

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) 
    .setProject(config.projectId) 
    .setPlatform(config.platform)

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

    if(!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email,password);

    const newUser = await databases.createDocument(
        config.databaseId,
        config.userCollectionID,
        ID.unique(),
        {
            accountId: newAccount.$id,
            email: email,
            username: username,
            avatar: avatarUrl,
        }
    );

        return newUser;

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export const signIn = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);

        return session;

    } catch (error) {
        throw new Error(error);
    }
}



export async function getAccount() {
    try {
      const currentAccount = await account.get();
  
      return currentAccount;
    } catch (error) {
      throw new Error(error);
    }
  }


export const getCurrentUser = async () => {
try {
    
    const currentAccount = await getAccount();
    
    if(!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
        config.databaseId,
        config.userCollectionID,
        [Query.equal('accountId', currentAccount.$id)]
    )

    if(!currentUser) throw Error;

    return currentUser.documents[0];
} catch (error) {
    console.log(error);
}

}

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
          databaseId,
          ordersCollectionId
        )

        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}

export const getUserPosts = async (accountId) => {
    try {
        const posts = await databases.listDocuments(
          databaseId,
          ordersCollectionId,
          [Query.equal('usuarios', accountId)]
        )

        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}

export const searchPosts = async (query) => {
    try {
        const posts = await databases.listDocuments(
          databaseId,
          ordersCollectionId,
          [Query.search('Descricao', query)]
        )

        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}

export const signOut = async () => {
    try {
        const session = await account.deleteSession('current');
        return session;
    } catch (error) {
        throw new Error(error)
    }
}

export const createOrder = async (form) => {
    try {
        const newPost = await databases.createDocument(
            databaseId,
            ordersCollectionId,
            ID.unique(),
            {
                quantidade: form.quantidade,
                codigo: form.codigo,
                Descricao: form.Descricao,
                valor: form.valor,
                usuarios: form.userId
            }
        )

        return newPost;
    } catch (error) {
        throw new Error(error);
        
    }
}

export const deleteOrder = async (form) => {
    try {
        const newPost = await databases.deleteDocument(
            databaseId,
            ordersCollectionId,
            ID.unique(),
            {
                quantidade: form.quantidade,
                codigo: form.codigo,
                Descricao: form.Descricao,
                valor: form.valor,
                usuarios: form.userId
            }
        )

        return newPost;
    } catch (error) {
        throw new Error(error);
        
    }
}