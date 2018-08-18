/**
 * Created by hao.cheng on 2017/4/23.
 */
import React from 'react';
import {Row, Col, Card, Button, Radio, Icon, Menu, Dropdown, Input, Table, Checkbox} from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import {Form} from "antd/lib/index";
import {Link} from "react-router-dom";

const FormItem = Form.Item;
var linkStyle = {
    color: 'hotpink'
};
// var likeswitch = true;
// var dislikeswitch = false;
class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: [],
            likeswitchArr: [],
            dislikeswitchArr: [],
            likeswitchtypeArr: [],//"like-o",
            dislikeswitchtypeArr: []

        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.likeClick = this.likeClick.bind(this);
        this.dislikeClick = this.dislikeClick.bind(this);
    }

    likeClick(record,index) {
        let type = "like";
        let likeswitch = this.state.likeswitchArr[index];
        if (likeswitch) {
            type = "like-o";
        }
        var postData = {
            "likes": !likeswitch,
            // "dislike": this.state.dislikeswitchArr[index],
            // "userId": event.target.category.value,
            // "userName": event.target.likeNumber.value,
            "importnewsTitle": record.title,
            "importnewsId": record.id
        };
        console.log(postData);
        fetch("http://localhost:8080/userReflection/merge", {
            method: 'POST',
            mode: 'cors',
            // credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify(postData)
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result.data);
                    this.state.likeswitchArr[index] = !likeswitch;
                    this.state.likeswitchtypeArr[index] = type;
                    this.state.data.products[index].likeNumber = result.data.like;
                    this.forceUpdate();
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    dislikeClick(index, record) {
        let dislikeswitch = this.state.dislikeswitchArr[index];
        let type = "dislike";
        if (dislikeswitch) {
            type = "dislike-o";
        }
        var postData = {
            // "likes": "%" + event.target.title.value + "%",
            "dislike": !dislikeswitch,
            // "userId": event.target.category.value,
            // "userName": event.target.likeNumber.value,
            "importnewsTitle": record.title,
            "importnewsId": record.id
        };
        console.log(postData);
        fetch("http://localhost:8080/userReflection/merge", {
            method: 'POST',
            mode: 'cors',
            // credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify(postData)
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result.data);
                    this.state.dislikeswitchArr[index] = !dislikeswitch;
                    this.state.dislikeswitchtypeArr[index] = type;
                    this.state.data.products[index].dislikeNumber = result.data.dislike;
                    this.forceUpdate();
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )

    }

    handleSubmit(event) {
        var postData = {
            "title": "%" + event.target.title.value + "%",
            "summary": "%" + event.target.summary.value + "%",
            "category": event.target.category.value,
            "likeNumber": event.target.likeNumber.value,
            "readingNumber": event.target.readingNumber.value,
            "dislikeNumber": event.target.dislikeNumber.value
        };
        console.log(postData);
        fetch("http://localhost:8080/article/find", {
            method: 'POST',
            mode: 'cors',
            // credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify(postData)
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result.data);
                    // this.setState({
                    //
                    // });
                    if (result.data != undefined) {
                        const disliketypearr = this.state.dislikeswitchtypeArr;
                        const dislikeswitcharr = this.state.dislikeswitchArr;
                        const liketypearr = this.state.likeswitchtypeArr;
                        const likeswitcharr = this.state.likeswitchArr;
                        let data = result.data;
                        data.products.forEach((record, index) => {
                            let icontype="dislike-o";
                            let likeicontype="like-o";
                            if(record.dislike){
                                icontype="dislike";
                            }
                            if (record.likes) {
                                likeicontype = "like";
                            }
                            disliketypearr.push(icontype);
                            dislikeswitcharr.push(record.dislike);
                            liketypearr.push(likeicontype);
                            likeswitcharr.push(record.likes);
                        });
                        this.setState(
                            {
                                dislikeswitchtypeArr: disliketypearr,
                                dislikeswitchArr: dislikeswitcharr,
                                likeswitchtypeArr: liketypearr,
                                likeswitchArr: likeswitcharr,
                                isLoaded: true,
                                data: result.data
                            }
                        );
                    }
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
        // alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    };

    handleSizeChange = (e) => {
        this.setState({size: e.target.value});
    };
    handleMenuClick = (e) => {
        console.log('click', e);
    };
    enterLoading = () => {
        this.setState({loading: true});
    };
    enterIconLoading = () => {
        this.setState({iconLoading: true});
    };

    render() {
        console.log(this.state.data.antdColumns)
        let columns = [];
        for (let i in this.state.data.antdColumns) {
            let value = this.state.data.antdColumns[i];
            console.log(value);
            // if (value.dataFormat === "linkFormatter") {
            //     value["render"]='function() {return <Link to={record.name}>{text}</Link>}';
            // }
            columns.push(value);
        }
        const data = this.state.data.products;

        columns = [
            {
                "dataIndex": "id",
                "title": "ID",
                "key": "id",
                "sorter": true,
                "dataFormat": ""
            },
            {
                "dataIndex": "title",
                "title": "標題",
                "key": "title",
                "sorter": true,
                "dataFormat": "linkFormatter",
                render: (text, record) => {
                    return <div><Icon type="link" style={{fontSize: 13}}/><a href={record.url}
                                                                             style={linkStyle}>{text}</a></div>
                }
            },
            {
                "dataIndex": "summary",
                "title": "摘要",
                "key": "summary",
                "sorter": true,
                "dataFormat": ""
            },
            {
                "dataIndex": "likeNumber",
                "title": "讚數",
                "key": "likeNumber",
                "sorter": true,
                "dataFormat": "",
                render: (text, record,index) => {
                    return <Button icon={this.state.likeswitchtypeArr[index]} type="text" onClick={()=>this.likeClick(record,index)}>{text}</Button>;
                }
            },
            {
                "dataIndex": "dislikeNumber",
                "title": "噓數",
                "key": "dislikeNumber",
                "sorter": true,
                "dataFormat": "",
                render: (text, record, index) => {
                    return <Button icon={this.state.dislikeswitchtypeArr[index]} type="text"
                                   onClick={() => this.dislikeClick(index, record)}
                    >{text}</Button>;//attr-switch={this.state.dislikeswitch}
                }
            },
            {
                "dataIndex": "readingNumber",
                "title": "閱讀數",
                "key": "readingNumber",
                "sorter": true,
                "dataFormat": "",
                render: (text, record) => {
                    return <Button icon={"team"} type="text">{text}</Button>
                }
            },
            {
                "dataIndex": "category",
                "title": "分類",
                "key": "category",
                "sorter": true,
                "dataFormat": "",
                render: (text, record, index) => {
                    return <div><Icon type="link" style={{fontSize: 13}}/><a href={record.categoryUrl}
                                                                             style={linkStyle}>{text}</a></div>
                }

            }
        ]

        return (
            <div className="gutter-example button-demo">
                <BreadcrumbCustom first="硬塞列表" second="文章"/>
                <Row gutter={16}>
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem>
                            <Input id="title" prefix={<Icon type='file' style={{fontSize: 13}}/>} placeholder="標題"/>
                        </FormItem>
                        <FormItem>
                            <Input id="category" prefix={<Icon type="folder" style={{fontSize: 13}}/>}
                                   placeholder="分類"/>
                        </FormItem>
                        <FormItem>
                            <Input id="summary" prefix={<Icon type="file-text" style={{fontSize: 13}}/>}
                                   placeholder="摘要"/>
                        </FormItem>
                        <FormItem>
                            <Input id="likeNumber" prefix={<Icon type="like" style={{fontSize: 13}}/>}
                                   placeholder="讚數"/>
                        </FormItem>
                        <FormItem>
                            <Input id="dislikeNumber" prefix={<Icon type="dislike" style={{fontSize: 13}}/>}
                                   placeholder="噓數"/>
                        </FormItem>
                        <FormItem>
                            <Input id="readingNumber" prefix={<Icon type="eye" style={{fontSize: 13}}/>}
                                   placeholder="閱讀數"/>
                        </FormItem>
                        <FormItem>
                            <Button htmlType="submit" type="submit">送出</Button>
                        </FormItem>
                    </Form>
                </Row>
                <Row gutter={16}>
                    <Table columns={columns} dataSource={data} rowKey='id'/>
                </Row>
                <style>{`
                    .button-demo .ant-btn {
                        margin-right: 8px;
                        margin-bottom: 12px;
                    }
                `}</style>
            </div>
        )
    }
}

export default Article;
