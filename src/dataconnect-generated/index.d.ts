import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Achievement_Key {
  id: UUIDString;
  __typename?: 'Achievement_Key';
}

export interface AllGamesData {
  games: ({
    id: UUIDString;
    name: string;
    description: string;
    difficultyLevel?: string | null;
  } & Game_Key)[];
}

export interface Game_Key {
  id: UUIDString;
  __typename?: 'Game_Key';
}

export interface LeaderboardEntry_Key {
  id: UUIDString;
  __typename?: 'LeaderboardEntry_Key';
}

export interface RecordScoreData {
  score_insert: Score_Key;
}

export interface RecordScoreVariables {
  gameId: UUIDString;
  scoreValue: number;
}

export interface Score_Key {
  id: UUIDString;
  __typename?: 'Score_Key';
}

export interface UpdateUserProfileData {
  user_update?: User_Key | null;
}

export interface UpdateUserProfileVariables {
  avatarUrl?: string | null;
  username?: string | null;
}

export interface UserAchievement_Key {
  id: UUIDString;
  __typename?: 'UserAchievement_Key';
}

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

export interface UserScoresVariables {
  userId: UUIDString;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface AllGamesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<AllGamesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<AllGamesData, undefined>;
  operationName: string;
}
export const allGamesRef: AllGamesRef;

export function allGames(): QueryPromise<AllGamesData, undefined>;
export function allGames(dc: DataConnect): QueryPromise<AllGamesData, undefined>;

interface UserScoresRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UserScoresVariables): QueryRef<UserScoresData, UserScoresVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UserScoresVariables): QueryRef<UserScoresData, UserScoresVariables>;
  operationName: string;
}
export const userScoresRef: UserScoresRef;

export function userScores(vars: UserScoresVariables): QueryPromise<UserScoresData, UserScoresVariables>;
export function userScores(dc: DataConnect, vars: UserScoresVariables): QueryPromise<UserScoresData, UserScoresVariables>;

interface RecordScoreRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RecordScoreVariables): MutationRef<RecordScoreData, RecordScoreVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RecordScoreVariables): MutationRef<RecordScoreData, RecordScoreVariables>;
  operationName: string;
}
export const recordScoreRef: RecordScoreRef;

export function recordScore(vars: RecordScoreVariables): MutationPromise<RecordScoreData, RecordScoreVariables>;
export function recordScore(dc: DataConnect, vars: RecordScoreVariables): MutationPromise<RecordScoreData, RecordScoreVariables>;

interface UpdateUserProfileRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: UpdateUserProfileVariables): MutationRef<UpdateUserProfileData, UpdateUserProfileVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: UpdateUserProfileVariables): MutationRef<UpdateUserProfileData, UpdateUserProfileVariables>;
  operationName: string;
}
export const updateUserProfileRef: UpdateUserProfileRef;

export function updateUserProfile(vars?: UpdateUserProfileVariables): MutationPromise<UpdateUserProfileData, UpdateUserProfileVariables>;
export function updateUserProfile(dc: DataConnect, vars?: UpdateUserProfileVariables): MutationPromise<UpdateUserProfileData, UpdateUserProfileVariables>;

