const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'reflex-tester',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const allGamesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'AllGames');
}
allGamesRef.operationName = 'AllGames';
exports.allGamesRef = allGamesRef;

exports.allGames = function allGames(dc) {
  return executeQuery(allGamesRef(dc));
};

const userScoresRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'UserScores', inputVars);
}
userScoresRef.operationName = 'UserScores';
exports.userScoresRef = userScoresRef;

exports.userScores = function userScores(dcOrVars, vars) {
  return executeQuery(userScoresRef(dcOrVars, vars));
};

const recordScoreRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RecordScore', inputVars);
}
recordScoreRef.operationName = 'RecordScore';
exports.recordScoreRef = recordScoreRef;

exports.recordScore = function recordScore(dcOrVars, vars) {
  return executeMutation(recordScoreRef(dcOrVars, vars));
};

const updateUserProfileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateUserProfile', inputVars);
}
updateUserProfileRef.operationName = 'UpdateUserProfile';
exports.updateUserProfileRef = updateUserProfileRef;

exports.updateUserProfile = function updateUserProfile(dcOrVars, vars) {
  return executeMutation(updateUserProfileRef(dcOrVars, vars));
};
