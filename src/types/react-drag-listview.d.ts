declare module 'react-drag-listview' {
    interface Props {
        children?: JSX.Element | JSX.Element[];
        nodeSelector?: string;
        onDragEnd: (fromIndex: number, toIndex: number) => void;
    }
    const ReactDragListView : (props: Props) => JSX.Element;
    export = ReactDragListView;
}