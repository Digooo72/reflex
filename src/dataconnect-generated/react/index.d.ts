import { AllGamesData, UserScoresData, UserScoresVariables, RecordScoreData, RecordScoreVariables, UpdateUserProfileData, UpdateUserProfileVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useAllGames(options?: useDataConnectQueryOptions<AllGamesData>): UseDataConnectQueryResult<AllGamesData, undefined>;
export function useAllGames(dc: DataConnect, options?: useDataConnectQueryOptions<AllGamesData>): UseDataConnectQueryResult<AllGamesData, undefined>;

export function useUserScores(vars: UserScoresVariables, options?: useDataConnectQueryOptions<UserScoresData>): UseDataConnectQueryResult<UserScoresData, UserScoresVariables>;
export function useUserScores(dc: DataConnect, vars: UserScoresVariables, options?: useDataConnectQueryOptions<UserScoresData>): UseDataConnectQueryResult<UserScoresData, UserScoresVariables>;

export function useRecordScore(options?: useDataConnectMutationOptions<RecordScoreData, FirebaseError, RecordScoreVariables>): UseDataConnectMutationResult<RecordScoreData, RecordScoreVariables>;
export function useRecordScore(dc: DataConnect, options?: useDataConnectMutationOptions<RecordScoreData, FirebaseError, RecordScoreVariables>): UseDataConnectMutationResult<RecordScoreData, RecordScoreVariables>;

export function useUpdateUserProfile(options?: useDataConnectMutationOptions<UpdateUserProfileData, FirebaseError, UpdateUserProfileVariables | void>): UseDataConnectMutationResult<UpdateUserProfileData, UpdateUserProfileVariables>;
export function useUpdateUserProfile(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateUserProfileData, FirebaseError, UpdateUserProfileVariables | void>): UseDataConnectMutationResult<UpdateUserProfileData, UpdateUserProfileVariables>;
