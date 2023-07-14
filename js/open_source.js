/**
 * 
 * This script embeds contribution statistics into HTML.
 * 
 **/

/* Statistics for scikit-learn */

const SKLEARN_MERGED_PRS = 36;
const SKLEARN_LINES_ADDITION = 1064;
const SKLEARN_LINES_DELETION = 309;
const SKLEARN_RANK_CONTRIBUTOR = 68;

/* Statistics for pandas */

const PANDAS_MERGED_PRS = 23;
const PANDAS_LINES_ADDITION = 1294;
const PANDAS_LINES_DELETION = 292;
const PANDAS_RANK_CONTRIBUTOR = 79;

/* Definining insertion functions */

function insertInfo(eid, val) {
    e = document.getElementById(eid);
    if (e === null) console.log(`Missing element with ID ${eid}`)
    else document.getElementById(eid).innerHTML = val;
}

function insertSklearnMergedPRs() {
    insertInfo("sklearn-merged-prs", SKLEARN_MERGED_PRS);
}

function insertSklearnLinesAddition() {
    insertInfo("sklearn-lines-addition", SKLEARN_LINES_ADDITION);
}

function insertSklearnLinesDeletion() {
    insertInfo("sklearn-lines-deletion", SKLEARN_LINES_DELETION);
}

function insertSklearnRankContributor() {
    insertInfo("sklearn-rank-contributor", SKLEARN_RANK_CONTRIBUTOR);
}

function insertPandasMergedPRs() {
    insertInfo("pandas-merged-prs", PANDAS_MERGED_PRS);
}

function insertPandasLinesAddition() {
    insertInfo("pandas-lines-addition", PANDAS_LINES_ADDITION);
}

function insertPandasLinesDeletion() {
    insertInfo("pandas-lines-deletion", PANDAS_LINES_DELETION);
}

function insertPandasRankContributor() {
    insertInfo("pandas-rank-contributor", PANDAS_RANK_CONTRIBUTOR);
}
