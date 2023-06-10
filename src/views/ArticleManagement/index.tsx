/**
 * 文章管理
 * @returns 
 */
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default class ArticleManagement extends React.Component {
    state = {
        value: 'test',
      };
    
      handleChange = (value: any) => {
        console.log(value)
        this.setState({
          value,
        })
      };
    
      prompt = () => {
        // notification.open({
        //   message: 'We got value:',
        //   description: <span dangerouslySetInnerHTML={{ __html: this.state.value }}></span>,
        // });
      };
    
      render() {
        return (
        //   <Card title="富文本编辑器">
            <ReactQuill theme="snow" value={this.state.value} onChange={this.handleChange} />
            // <Button style={{ marginTop: 16 }} onClick={this.prompt}>Prompt</Button>
        //   </Card>
        );
      }
}

// const ArticleManagement = () => {
//     const state = {
//         value: 'test',
//     };

//     const handleChange = (value) => {
        
//         console.log(value)
//     };

//     return (
//         <div>
//             <ReactQuill value={state.value} onChange={handleChange} />
//         </div>

//     )
// }

// export default ArticleManagement