import { createBoard } from '@wixc3/react-board';
import { TailwindComp } from '../../../components/tailwind-comp/tailwind-comp';

export default createBoard({
    name: 'TailwindComp',
    Board: () => <TailwindComp />,
    isSnippet: true,
});
