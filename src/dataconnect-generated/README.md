# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*AllGames*](#allgames)
  - [*UserScores*](#userscores)
- [**Mutations**](#mutations)
  - [*RecordScore*](#recordscore)
  - [*UpdateUserProfile*](#updateuserprofile)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## AllGames
You can execute the `AllGames` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
allGames(): QueryPromise<AllGamesData, undefined>;

interface AllGamesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<AllGamesData, undefined>;
}
export const allGamesRef: AllGamesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
allGames(dc: DataConnect): QueryPromise<AllGamesData, undefined>;

interface AllGamesRef {
  ...
  (dc: DataConnect): QueryRef<AllGamesData, undefined>;
}
export const allGamesRef: AllGamesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the allGamesRef:
```typescript
const name = allGamesRef.operationName;
console.log(name);
```

### Variables
The `AllGames` query has no variables.
### Return Type
Recall that executing the `AllGames` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AllGamesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AllGamesData {
  games: ({
    id: UUIDString;
    name: string;
    description: string;
    difficultyLevel?: string | null;
  } & Game_Key)[];
}
```
### Using `AllGames`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, allGames } from '@dataconnect/generated';


// Call the `allGames()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await allGames();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await allGames(dataConnect);

console.log(data.games);

// Or, you can use the `Promise` API.
allGames().then((response) => {
  const data = response.data;
  console.log(data.games);
});
```

### Using `AllGames`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, allGamesRef } from '@dataconnect/generated';


// Call the `allGamesRef()` function to get a reference to the query.
const ref = allGamesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = allGamesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.games);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.games);
});
```

## UserScores
You can execute the `UserScores` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
userScores(vars: UserScoresVariables): QueryPromise<UserScoresData, UserScoresVariables>;

interface UserScoresRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UserScoresVariables): QueryRef<UserScoresData, UserScoresVariables>;
}
export const userScoresRef: UserScoresRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
userScores(dc: DataConnect, vars: UserScoresVariables): QueryPromise<UserScoresData, UserScoresVariables>;

interface UserScoresRef {
  ...
  (dc: DataConnect, vars: UserScoresVariables): QueryRef<UserScoresData, UserScoresVariables>;
}
export const userScoresRef: UserScoresRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the userScoresRef:
```typescript
const name = userScoresRef.operationName;
console.log(name);
```

### Variables
The `UserScores` query requires an argument of type `UserScoresVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UserScoresVariables {
  userId: UUIDString;
}
```
### Return Type
Recall that executing the `UserScores` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UserScoresData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UserScoresData {
  scores: ({
    id: UUIDString;
    game?: {
      name: string;
    };
      scoreValue: number;
      playedAt: TimestampString;
  } & Score_Key)[];
}
```
### Using `UserScores`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, userScores, UserScoresVariables } from '@dataconnect/generated';

// The `UserScores` query requires an argument of type `UserScoresVariables`:
const userScoresVars: UserScoresVariables = {
  userId: ..., 
};

// Call the `userScores()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await userScores(userScoresVars);
// Variables can be defined inline as well.
const { data } = await userScores({ userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await userScores(dataConnect, userScoresVars);

console.log(data.scores);

// Or, you can use the `Promise` API.
userScores(userScoresVars).then((response) => {
  const data = response.data;
  console.log(data.scores);
});
```

### Using `UserScores`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, userScoresRef, UserScoresVariables } from '@dataconnect/generated';

// The `UserScores` query requires an argument of type `UserScoresVariables`:
const userScoresVars: UserScoresVariables = {
  userId: ..., 
};

// Call the `userScoresRef()` function to get a reference to the query.
const ref = userScoresRef(userScoresVars);
// Variables can be defined inline as well.
const ref = userScoresRef({ userId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = userScoresRef(dataConnect, userScoresVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.scores);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.scores);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## RecordScore
You can execute the `RecordScore` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
recordScore(vars: RecordScoreVariables): MutationPromise<RecordScoreData, RecordScoreVariables>;

interface RecordScoreRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RecordScoreVariables): MutationRef<RecordScoreData, RecordScoreVariables>;
}
export const recordScoreRef: RecordScoreRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
recordScore(dc: DataConnect, vars: RecordScoreVariables): MutationPromise<RecordScoreData, RecordScoreVariables>;

interface RecordScoreRef {
  ...
  (dc: DataConnect, vars: RecordScoreVariables): MutationRef<RecordScoreData, RecordScoreVariables>;
}
export const recordScoreRef: RecordScoreRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the recordScoreRef:
```typescript
const name = recordScoreRef.operationName;
console.log(name);
```

### Variables
The `RecordScore` mutation requires an argument of type `RecordScoreVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RecordScoreVariables {
  gameId: UUIDString;
  scoreValue: number;
}
```
### Return Type
Recall that executing the `RecordScore` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RecordScoreData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RecordScoreData {
  score_insert: Score_Key;
}
```
### Using `RecordScore`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, recordScore, RecordScoreVariables } from '@dataconnect/generated';

// The `RecordScore` mutation requires an argument of type `RecordScoreVariables`:
const recordScoreVars: RecordScoreVariables = {
  gameId: ..., 
  scoreValue: ..., 
};

// Call the `recordScore()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await recordScore(recordScoreVars);
// Variables can be defined inline as well.
const { data } = await recordScore({ gameId: ..., scoreValue: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await recordScore(dataConnect, recordScoreVars);

console.log(data.score_insert);

// Or, you can use the `Promise` API.
recordScore(recordScoreVars).then((response) => {
  const data = response.data;
  console.log(data.score_insert);
});
```

### Using `RecordScore`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, recordScoreRef, RecordScoreVariables } from '@dataconnect/generated';

// The `RecordScore` mutation requires an argument of type `RecordScoreVariables`:
const recordScoreVars: RecordScoreVariables = {
  gameId: ..., 
  scoreValue: ..., 
};

// Call the `recordScoreRef()` function to get a reference to the mutation.
const ref = recordScoreRef(recordScoreVars);
// Variables can be defined inline as well.
const ref = recordScoreRef({ gameId: ..., scoreValue: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = recordScoreRef(dataConnect, recordScoreVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.score_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.score_insert);
});
```

## UpdateUserProfile
You can execute the `UpdateUserProfile` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateUserProfile(vars?: UpdateUserProfileVariables): MutationPromise<UpdateUserProfileData, UpdateUserProfileVariables>;

interface UpdateUserProfileRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: UpdateUserProfileVariables): MutationRef<UpdateUserProfileData, UpdateUserProfileVariables>;
}
export const updateUserProfileRef: UpdateUserProfileRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateUserProfile(dc: DataConnect, vars?: UpdateUserProfileVariables): MutationPromise<UpdateUserProfileData, UpdateUserProfileVariables>;

interface UpdateUserProfileRef {
  ...
  (dc: DataConnect, vars?: UpdateUserProfileVariables): MutationRef<UpdateUserProfileData, UpdateUserProfileVariables>;
}
export const updateUserProfileRef: UpdateUserProfileRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateUserProfileRef:
```typescript
const name = updateUserProfileRef.operationName;
console.log(name);
```

### Variables
The `UpdateUserProfile` mutation has an optional argument of type `UpdateUserProfileVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateUserProfileVariables {
  avatarUrl?: string | null;
  username?: string | null;
}
```
### Return Type
Recall that executing the `UpdateUserProfile` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateUserProfileData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateUserProfileData {
  user_update?: User_Key | null;
}
```
### Using `UpdateUserProfile`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateUserProfile, UpdateUserProfileVariables } from '@dataconnect/generated';

// The `UpdateUserProfile` mutation has an optional argument of type `UpdateUserProfileVariables`:
const updateUserProfileVars: UpdateUserProfileVariables = {
  avatarUrl: ..., // optional
  username: ..., // optional
};

// Call the `updateUserProfile()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateUserProfile(updateUserProfileVars);
// Variables can be defined inline as well.
const { data } = await updateUserProfile({ avatarUrl: ..., username: ..., });
// Since all variables are optional for this mutation, you can omit the `UpdateUserProfileVariables` argument.
const { data } = await updateUserProfile();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateUserProfile(dataConnect, updateUserProfileVars);

console.log(data.user_update);

// Or, you can use the `Promise` API.
updateUserProfile(updateUserProfileVars).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

### Using `UpdateUserProfile`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateUserProfileRef, UpdateUserProfileVariables } from '@dataconnect/generated';

// The `UpdateUserProfile` mutation has an optional argument of type `UpdateUserProfileVariables`:
const updateUserProfileVars: UpdateUserProfileVariables = {
  avatarUrl: ..., // optional
  username: ..., // optional
};

// Call the `updateUserProfileRef()` function to get a reference to the mutation.
const ref = updateUserProfileRef(updateUserProfileVars);
// Variables can be defined inline as well.
const ref = updateUserProfileRef({ avatarUrl: ..., username: ..., });
// Since all variables are optional for this mutation, you can omit the `UpdateUserProfileVariables` argument.
const ref = updateUserProfileRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateUserProfileRef(dataConnect, updateUserProfileVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

