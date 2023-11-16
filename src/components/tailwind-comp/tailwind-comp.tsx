import styles from './tailwind-comp.module.scss';

export interface TailwindCompProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const TailwindComp = ({ className }: TailwindCompProps) => {
    return <div className={`${className} bg-red-500`}>TailwindComp</div>;
};
