const store = {
    state: {
        count: 20,
    },
    actions: {
        // 只放同步的方法
        addCount (newState: {count:number}) {
            newState.count++
        },
        addCount2 (newState: {count:number}, action: {type: string, value: number}) {
            newState.count += action.value
        },
        subtract (newState: {count:number}, action: {type: string, value: number}) {
            if (newState.count > 10) {
                newState.count -= action.value
            }
        }
    },
    // 优化redux-thunk异步写法
    asyncActions: {
        // 只放异步方法
        asyncAddCount(dispatch:Function) {
            setTimeout(() => {
                dispatch({type: "addCount"})
            }, 1000)
        }
    },
    actionNames: {}
}
let actionNames = {};
for (const actionKey in store.actions) {
    actionNames[actionKey] = actionKey
}
store.actionNames = actionNames;
export default store;