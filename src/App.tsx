import { useState } from 'react';
import { ReactComponent as ReactLogo } from './assets/react.svg';
import { ReactComponent as ViteLogo } from './assets/vite.svg';
import { ReactComponent as TypescriptLogo } from './assets/typescript.svg';
import { ReactComponent as ScssLogo } from './assets/scss.svg';
import styles from './App.module.scss';

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className={styles.App}>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <ViteLogo height="6em" width="6em" className={styles.logo} />
                </a>
                <a href="https://reactjs.org" target="_blank">
                    <ReactLogo
                        height="6em"
                        width="6em"
                        className={`${styles.logo} ${styles.react}`}
                    />
                </a>
                <a href="https://www.typescriptlang.org/" target="_blank">
                    <TypescriptLogo
                        height="6em"
                        width="6em"
                        className={`${styles.logo} ${styles.ts}`}
                    />
                </a>
                <a href="https://sass-lang.com/" target="_blank">
                    <ScssLogo
                        height="6em"
                        width="6em"
                        className={`${styles.logo} ${styles.scss}`}
                    />
                </a>
            </div>
            <div className={styles.card}>
                <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className={styles['read-the-docs']}>
                Click on the Vite and React logos to learn more
            </p>
        </div>
    );
}

export default App;
