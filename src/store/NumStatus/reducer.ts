import handleNumStatus from "@/store/NumStatus";
// 用来管理数据的
let reducer = (
    state = {...handleNumStatus.state},
    action:{type:string, value:number}
) => {
    // 调用dispatch执行此代码
    let newState = JSON.parse(JSON.stringify(state))
    // switch (action.type) {
    //     case handleNumStatus.addCount:
    //         handleNumStatus.actions[handleNumStatus.addCount](newState)
    //         break;
    //     case handleNumStatus.addCount2:
    //         handleNumStatus.actions[handleNumStatus.addCount2](newState, action)
    //         break;
    //     default:
    //         break;
    // }
    for (const key in handleNumStatus.actionNames)
    {
        const actionName = handleNumStatus.actionNames[key];
        if (action.type === actionName)
        {
            handleNumStatus.actions[actionName](newState, action)
        }
    }
    return newState;
}

export default reducer;

