# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useAllGames, useUserScores, useRecordScore, useUpdateUserProfile } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useAllGames();

const { data, isPending, isSuccess, isError, error } = useUserScores(userScoresVars);

const { data, isPending, isSuccess, isError, error } = useRecordScore(recordScoreVars);

const { data, isPending, isSuccess, isError, error } = useUpdateUserProfile(updateUserProfileVars);

```

Here's an example from a different generated SDK:

```ts
import { useListAllMovies } from '@dataconnect/generated/react';

function MyComponent() {
  const { isLoading, data, error } = useListAllMovies();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div> An Error Occurred: {error} </div>
  }
}

// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './my-component';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
}
```



## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { allGames, userScores, recordScore, updateUserProfile } from '@dataconnect/generated';


// Operation AllGames: 
const { data } = await AllGames(dataConnect);

// Operation UserScores:  For variables, look at type UserScoresVars in ../index.d.ts
const { data } = await UserScores(dataConnect, userScoresVars);

// Operation RecordScore:  For variables, look at type RecordScoreVars in ../index.d.ts
const { data } = await RecordScore(dataConnect, recordScoreVars);

// Operation UpdateUserProfile:  For variables, look at type UpdateUserProfileVars in ../index.d.ts
const { data } = await UpdateUserProfile(dataConnect, updateUserProfileVars);


```