/**
 * 文章管理
 * @returns 
 */
import {useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import classModule from './articleManage.module.scss'

const ArticleManagement = () => {

    const [value, setValue] = useState<string>('test')

    const handleChange = (val:string | '') => {
        setValue(val)
    };

    const modules = {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike', 'image'],        // toggled buttons
        ['blockquote', 'code-block'],
      
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
      
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
      
        ['clean'] 
      ]
    }

    return (
        <div className={classModule['quill-container']}>
            <ReactQuill value={value} onChange={handleChange} modules={modules} />
        </div>

    )
}

export default ArticleManagement
