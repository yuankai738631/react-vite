const store = {
    state: {
        firstArr: [10, 20, 3]
    },
    actions: {
        arrPush(newState: {firstArr: number[]}, action: {type: string, value: number}) {
            newState.firstArr.push(action.value)
        }
    },
    // 名字统一管理
    actionNames: {}
}
let actionNames = {};
for (const actionKey in store.actions) {
    actionNames[actionKey] = actionKey
}
store.actionNames = actionNames;

export default store