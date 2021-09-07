import { ReactNode, useEffect, useState } from "react";
import { Tooltip } from "antd";

export interface EditableFormErrorTooltipProps {
	children?: ReactNode;
	errors?: JSX.Element;
	touched: boolean;
	validating: boolean;
}
export default function EditableFormErrorTooltip(props: EditableFormErrorTooltipProps) {
	const { children, errors, touched, validating } = props;
	const [visible, setVisible] = useState(false); // 是否隐藏

	useEffect(() => {
		if (!touched) return;
		if (!validating) {
			setVisible(!!errors);
		}
	}, [touched, errors, validating]);

	return (
		<Tooltip title={errors} trigger='focus' color='#ff4d4f' visible={visible}>
			{children}
		</Tooltip>
	);
}
/**
 * <Form.Item
      style={FIX_INLINE_STYLE}
      preserve={false}
      name={name}
      validateFirst={false}
      rules={rules}
      // @ts-ignore
      _internalItemRender={{
        mark: 'pro_table_render',
        render: (
          inputProps: FormItemProps & {
            errors: any[];
          },
          {
            input,
            extra,
          }: {
            input: JSX.Element;
            errorList: JSX.Element;
            extra: JSX.Element;
          },
        ) => {
          return (
            <Popover
              trigger={popoverProps?.trigger || 'focus'}
              placement={popoverProps?.placement}
              visible={visible}
              content={
                <Content
                  fieldError={fieldError}
                  value={value}
                  isValidating={isValidating}
                  isTouched={isTouched}
                  rules={rules}
                  progressProps={progressProps}
                />
              }
            >
              <div>
                {input}
                {extra}
              </div>
            </Popover>
          );
        },
      }}
      {...rest}
    >
      {children}
    </Form.Item>
 */
