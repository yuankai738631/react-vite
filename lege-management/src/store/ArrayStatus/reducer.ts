import handleArrayStatus from "@/store/ArrayStatus";

// 用来管理数据的
let reducer = (
    state = {...handleArrayStatus.state},
    action:{type:string, value:number}
) => {
    // 调用dispatch执行此代码
    let newState = JSON.parse(JSON.stringify(state))

    // switch (action.type) {
    //     case handleArrayStatus.arrPush:
    //         handleArrayStatus.actions[handleArrayStatus.arrPush](newState, action);
    //         break;
    //     default:
    //         break;
    // }
    for (const key in handleArrayStatus.actionNames)
    {
        const actionName = handleArrayStatus.actionNames[key]
        if (action.type === actionName)
        {
            handleArrayStatus.actions[actionName](newState, action)
        }
    }
    return newState;
}

export default reducer;

