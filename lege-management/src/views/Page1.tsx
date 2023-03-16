import {useSelector, useDispatch} from "react-redux";
import NumStatus from "@/store/NumStatus";

function View() {
    const dispatch = useDispatch()
    // 获取仓库数据
    const {count, firstArr} = useSelector((state:RootState) => ({
        count: state.NumStatusReducer.count,
        firstArr: state.ArrayStatusReducer.firstArr
    }))
    // 修改仓库数据
    // 对count的操作
    const handleChangeCount = () => {
        // dispatch({type: "认为是一个记号", value: 3}) type是固定的 value是自定义的
        dispatch({type: "addCount2", value: 10})
    }
    const handleChangeSubCount = () => {
        dispatch({type: "subtract", value: 1})
    }
    const handleChangeAddCount = () => {
        // 异步写法
        // @ts-ignore
        dispatch(NumStatus.asyncActions.asyncAddCount)
    }
    // 对firstArray的操作
    const handleChangeArr = () => {
        dispatch({type: "arrPush", value: 30})
    }
    return (
        <div className="about">
            <p>Page1</p>
            <p>{count}</p>
            <p>{firstArr}</p>
            <button onClick={handleChangeCount}>count +*</button>
            <button onClick={handleChangeAddCount}>(异步)count ++</button>
            <button onClick={handleChangeSubCount}>count --</button>
            <button onClick={handleChangeArr}>Push</button>
        </div>
    )
}

export default View