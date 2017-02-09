import { rpc } from '../lib/rpcapi'

export function loadAccountsList() {
    return function (dispatch) {
        dispatch({
            type: 'ACCOUNT/LOADING'
        });
        rpc("eth_accounts", []).then((json) => {
            dispatch({
                type: 'ACCOUNT/SET_LIST',
                accounts: json.result
            });
            json.result.map((acct) => dispatch(loadAccountBalance(acct)))
        });
    }
}

export function loadAccountBalance(accountId) {
    return function (dispatch) {
        rpc("eth_getBalance", [accountId, "latest"]).then((json) => {
            dispatch({
                type: 'ACCOUNT/SET_BALANCE',
                accountId: accountId,
                value: json.result
            })
        });
    }
}

export function loadAccountTxCount(accountId) {
    return function (dispatch) {
        rpc("eth_getTransactionCount", [accountId, "latest"]).then((json) => {
            dispatch({
                type: 'ACCOUNT/SET_TXCOUNT',
                accountId: accountId,
                value: json.result
            })
        });
    }
}