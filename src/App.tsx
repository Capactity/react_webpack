import React, { lazy, Suspense, useState } from 'react'
import '@/app.css'
import '@/app.less'

// 魔法注释，添加预获取和预加载
const LazyDemo = lazy(() => import(
    /* webpackChunkName: "my-chunk-name" */ // 资源打包后的文件chunkname
    /* webpackPrefetch: true */ // 开启prefetch预获取
    /* webpackPreload: true */ // 开启preload预加载
    '@/components/LazyDemo')) // 动态引入

function App() {
    const [count, setCounts] = useState('')
    const [show, setShow] = useState(false)

    const onClick = () => {
        setShow(true)
    }
    const onChange = (e: any) => {
        setCounts(e.target.value)
    }
    return (
        <>
            <h2>webpack5+react+ts </h2>
            <>
                <h2 onClick={onClick}>展示</h2>
                {/* show为true时加载LazyDemo组件 */}
                {show && <Suspense fallback={null}><LazyDemo /></Suspense>}
            </>
            <div>
                <p>受控组件</p>
                <input type="text" value={count} onChange={onChange} />
                <br />
                <p>非受控组件</p>
                <input type="text" />
            </div>
        </>
    )

}
export default App