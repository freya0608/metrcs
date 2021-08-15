import json1 from './cfg1.json';
import _, { random } from 'lodash'
import React from 'react';
import { Menu, Table, Layout, Image } from 'antd';
// import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

let menu_arr = []
let main_menu = _.keys(json1)
_.map(main_menu, (item) => {
  let menu_obj = {}
  menu_obj = {
    "menu": item,
    "submenu": _.keys(json1[item])
  }
  menu_arr.push(menu_obj)
})

// console.log('jso', json)
// console.log('menu_arr', menu_arr)
console.log('jso11111', json1)

class App extends React.Component {
  state = {
    theme: 'dark',
    menu: 'CPU',
    subMenu: 'version1'
  };


  handleClick = e => {
    console.log('click ', e);
    this.setState({
      menu: e.keyPath[1],
      subMenu: e.key.replace(e.keyPath[1] + '_', ''),
      curent: e.key
    });
  };


  render() {
    console.log('this.state', this.state)
    let { menu, subMenu } = this.state;

    let table1_column = [], table2_column = [];
    let table3_column = [];
    let version_data = json1[menu][subMenu];
    let img = version_data?.img
    let version_data_keys = _.keys(version_data)
    console.log('version_data', version_data)
    _.map(_.keys(version_data['table1'][0]), (item) => {
      table1_column.push({
        key: item,
        title: item,
        dataIndex: item
      })
    })
    let table1_data = _.cloneDeep(version_data['table1'])
    _.map(table1_data, (d) => {
      d['key'] = d.stage
    })

    _.map(_.keys(version_data['table2'][0]), (item, idx) => {
      table2_column.push({
        key: item,
        title: item,
        dataIndex: item
      })
    })
    let table2_data = _.cloneDeep(version_data['table2'])
    _.map(table2_data, (d, idx) => {
      d['key'] = d.stage
    })


    let table3_data = _.cloneDeep(version_data['table3'])
    let table3_column_keys = _.keys(table3_data[0]);

    console.log('table3_data', table3_data)

    _.map(table3_column_keys, (key) => {

      let col_obj = {
        title: key,
        dataIndex: key,
        key: key,
        children: []
      }
      _.map(_.keys(table3_data[0][key]), (child) => {
        if (key !== 'stage') {
          col_obj['children'].push({
            title: child,
            dataIndex: child,
            key: child,
          })
        }
      })
      table3_column.push(col_obj)
    })
    let data3 = []
    _.map(table3_data, (d, index) => {
      let data3_obj = {};
      _.map(table3_column_keys, (kk) => {
        data3_obj['key'] = table3_data[index].stage
        data3_obj['stage'] = table3_data[index].stage

        if (kk !== 'stage') {
          _.map(_.keys(table3_data[index][kk]), (v) => {
            data3_obj[v] = table3_data[index][kk][v]
          })
        }

      })
      data3.push(data3_obj)


    })

    console.log('data3', data3)

    return (
      <Layout>
        <Sider style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}>
          <Menu
            theme={this.state.theme}
            onClick={this.handleClick}
            style={{ width: 200 }}
            defaultOpenKeys={['CPU_version1']}
            selectedKeys={[this.state.curent]}
            mode="inline"
          >
            {
              _.map(menu_arr, (item, idx) => {
                return <SubMenu key={item.menu}
                  // icon={<AppstoreOutlined />  }
                  title={item.menu}>
                  {
                    _.map(item?.submenu, (ii, number) => {
                      return <Menu.Item key={item.menu + '_' + ii} >{ii}</Menu.Item>
                    })
                  }
                </SubMenu>
              })
            }

          </Menu>
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 210 }}>
          <div>table1</div>

          <Table
            columns={table1_column}
            dataSource={table1_data}
            bordered
            size="middle"
            pagination={false}
          // scroll={{ x: 'calc(700px + 50%)', y: 240 }}
          />
          <div>table2</div>
          <Table
            columns={table2_column}
            dataSource={table2_data}
            bordered
            size="middle"
            pagination={false}
          />
          <Table
            columns={table3_column}
            dataSource={data3}
            bordered
            size="middle"
            pagination={false}
          />
          {
            _.map(img, (i) => {
              return <Image.PreviewGroup>
                <Image
                  style={{ display: 'inline-block' }}
                  width={200}
                  key={i}
                  src={i}
                />
              </Image.PreviewGroup>

            })
          }

        </Layout>

      </Layout>
    );
  }
}

export default App;
