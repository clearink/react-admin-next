import { createContext } from "react";
import { EditableTableRef } from "./interface";

// Context 数据共享
export const EditableTableContext = createContext<EditableTableRef | null>(null);
