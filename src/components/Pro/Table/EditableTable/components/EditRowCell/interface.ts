export interface EditableRowProps {
	className?: string;
}

export interface EditableCellProps<V> {
	children: React.ReactNode;
	edit?: JSX.Element;
	name: string;
	className?: string;
	record: V;
	handleSave: (record: V) => void;
}
