// 数组去重
function unique(arr:Array<any>):Array<any> {
    if (arr.length === 0) return []
    let newArr: any[] = []
    if (typeof arr[1] !== 'object') {
        newArr = Array.from(new Set(arr))
    } else {
        let stringItem:string[] = []
        for (let item of arr) {
            if (stringItem.length === 0 || (!stringItem.includes(JSON.stringify(item)))) {
                newArr.push(item)
                stringItem.push(JSON.stringify(item))
            }
        }
    }
    return newArr
}

export default unique