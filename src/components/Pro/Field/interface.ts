import React from "react";

export interface ProFieldProps<T = any> {
    text?: T
    render: (dom: React.ReactNode, props: any) => React.ReactNode
}