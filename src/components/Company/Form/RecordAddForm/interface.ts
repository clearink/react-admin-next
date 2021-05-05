import { ReactElement } from "react";
import { RecordFormProps } from "../interface/record-form";

export interface RecordAddFormProps<V = any> extends RecordFormProps {}

export type RecordAddFormType = <V = any>(props: RecordAddFormProps<V>) => ReactElement;
