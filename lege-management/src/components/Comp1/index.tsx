// import "./comp1.module.scss"  全局引入

// 模块化引入
import style from "./comp1.module.scss";
function Comp() {
  return(
      <div className={style.box}>
        <p>this is Comp1</p>
      </div>
  )
}

export default Comp