import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/mode/cmake/cmake";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/clike/clike";
import "./style.scss";

// 代码预览
export default function CodePreview(props: any) {
	return (
		<CodeMirror
			value='<h1>I ♥ react-codemirror2</h1>'
			options={{
				mode: { name: "javascript", json: true },
				theme: "material",
				lineNumbers: true,
			}}
			onChange={(editor, data, value) => {}}
		/>
	);
}
