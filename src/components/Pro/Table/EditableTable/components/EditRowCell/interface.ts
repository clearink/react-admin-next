import { ProFormProps } from "@/components/Pro/Form/ProForm/interface";

export interface EditableRowProps<V> {
	className?: string;
	record: V;
	form: ProFormProps<V>;
	handleEdit: (values: V) => void;
}

export interface EditableCellProps {
	children?: React.ReactNode;
	edit?: JSX.Element;
	name: string;
	value: any;
	className?: string;
}
