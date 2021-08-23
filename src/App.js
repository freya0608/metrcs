import json1 from './cfg1.json';
import json2 from './2.json';

import _, { keys, random } from 'lodash'
import React from 'react';
import { Menu, Table, Layout, Image, Divider, Card } from 'antd';
// import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
console.log('json1', json1)
console.log('json2', json2)


let design_data = [];

_.map(json2, (js, index) => {
  // console.log('000', _.keys(js))
  // console.log('js', js)
  let design_obj = {}
  design_obj = js[_.keys(js)[0]][_.keys(json2[index][_.keys(js)])[0]]
  design_obj['design_name'] = _.keys(js)[0]
  design_obj['design_version'] = _.keys(json2[index][_.keys(js)])[0]

  // console.log('json2[index][_.keys(js)]', json2[index][_.keys(js)])
  design_data.push(design_obj)
  design_obj = {}
})
console.log('design_data', design_data)
console.log('groupBy', _.groupBy(design_data, "design_name"))

let menu_arr = []
let groupByDesign = _.groupBy(design_data, "design_name")
let main_menu = _.keys(groupByDesign)
_.map(main_menu, (item) => {
  // console.log('item', item)
  let menu_obj = {}
  menu_obj['menu'] = item
  let groupByDesignVersion = _.groupBy(groupByDesign[item], 'design_version')
  menu_obj['submenu'] = _.keys(groupByDesignVersion)
  menu_arr.push(menu_obj)
})



// let menu_arr = []
// let main_menu = _.keys(json1)
// _.map(main_menu, (item) => {
//   let menu_obj = {}
//   menu_obj = {
//     "menu": item,
//     "submenu": _.keys(json1[item])
//   }
//   menu_arr.push(menu_obj)
// })

// console.log('jso', json)
console.log('menu_arr', menu_arr)
// console.log('jso11111', json1)

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

    let table1_column = [], table2_column = [], imgs = [];
    let table3_column = [];
    let design_data = groupByDesign[menu];
    console.log('design_data', design_data)

    let design_version = _.filter(design_data, (data) => data.design_version == subMenu)
    console.log('design_version', design_version)




    // let img = version_data?.img
    // let version_data_keys = _.keys(version_data)
    // console.log('version_data', version_data)
    _.map(_.keys(design_version[0]['basic_information'][0]), (item) => {
      table1_column.push({
        key: item,
        title: item,
        className: item !== 'stage' ? "colStyle" : '',
        dataIndex: item
      })
    })

    let table1_data = []
    _.map(design_version, (item, index) => {
      let table1_obj = { ...item['basic_information'][0] };
      table1_obj['date'] = item.date;
      table1_obj['key'] = index;
      table1_obj['design_name'] = item.design_name;
      table1_obj['design_version'] = item.design_version;
      table1_obj['owner'] = item.owner;
      if (item?.img?.length > 0) {
        imgs.push(...item.img)
      }


      table1_data.push(table1_obj)
    })
    console.log('imgs', imgs)
    let imgs_result = []
    _.map(imgs, (img) => {
      if (img.route) {
        imgs_result.push(img.route)
      }
      if (img.floorplan) {
        imgs_result.push(img.floorplan)
      }

    })
    // console.log('table1_data', table1_data)

    //table2 start
    _.map(_.keys(design_version[0]['vt_ratio'][0]), (item) => {
      table2_column.push({
        key: item,
        className: item !== 'stage' ? "colStyle" : '',
        title: item,
        dataIndex: item
      })
    })

    let table2_data = []
    _.map(design_version, (item, index) => {
      let table2_obj = { ...item['vt_ratio'][0] };
      table2_obj['date'] = item.date;
      table2_obj['key'] = index;
      table2_obj['design_name'] = item.design_name;
      table2_obj['design_version'] = item.design_version;
      table2_obj['owner'] = item.owner;

      table2_data.push(table2_obj)
    })
    // console.log('table2_data', table2_data)
    //table2 end



    // let table3_data = _.cloneDeep(version_data['timing_information'])
    // let table3_column_keys = _.keys(table3_data[0]);

    // console.log('table3_data', table3_data)

    _.map(_.keys(design_version[0]['timing_information'][0]), (key, index) => {
      let col_obj = {
        title: key,
        dataIndex: key,
        key: key,
        className: key !== 'stage' ? "colStyle" : '',
        children: []
      }
      if (key !== 'stage') {
        _.map(_.keys(design_version[0]['timing_information'][0][key]), (child, idx) => {
          col_obj['children'].push({
            title: key + child,
            dataIndex: key + child,
            className: idx == 0 ? "colStyle" : '',
            key: key + child,
          })
        })
      }
      table3_column.push(col_obj)
    })



    let table3_data = []
    _.map(design_version, (item, index) => {

      let table3_obj = {}
      let info = item['timing_information'][0];
      _.map(_.keys(info), (o) => {
        if (o !== 'stage') {
          _.map(_.keys(info[o]), (k) => {
            table3_obj[o + k] = info[o][k]
          })
        }
      })

      table3_obj['date'] = item.date;
      table3_obj['stage'] = item['timing_information'][0]?.stage;
      table3_obj['key'] = index;
      table3_obj['design_name'] = item.design_name;
      table3_obj['design_version'] = item.design_version;
      table3_obj['owner'] = item.owner;

      table3_data.push(table3_obj)
    })
    // let data3 = []
    // _.map(table3_data, (d, index) => {
    //   let data3_obj = {};
    //   _.map(table3_column_keys, (kk) => {
    //     data3_obj['key'] = table3_data[index].stage
    //     data3_obj['stage'] = table3_data[index].stage

    //     if (kk !== 'stage') {
    //       _.map(_.keys(table3_data[index][kk]), (v) => {
    //         data3_obj[v] = table3_data[index][kk][v]
    //       })
    //     }
    //   })
    //   data3.push(data3_obj)
    // })







    // let table1_data = _.cloneDeep(version_data['basic_information'])
    // _.map(table1_data, (d) => {
    //   d['key'] = d.stage
    // })

    // _.map(_.keys(version_data['vt_ratio'][0]), (item, idx) => {
    //   table2_column.push({
    //     key: item,
    //     title: item,
    //     dataIndex: item
    //   })
    // })
    // let table2_data = _.cloneDeep(version_data['vt_ratio'])
    // _.map(table2_data, (d, idx) => {
    //   d['key'] = d.stage
    // })


    // let table3_data = _.cloneDeep(version_data['timing_information'])
    // let table3_column_keys = _.keys(table3_data[0]);

    console.log('table3_data', table3_data)

    // _.map(table3_column_keys, (key) => {

    //   let col_obj = {
    //     title: key,
    //     dataIndex: key,
    //     key: key,
    //     children: []
    //   }
    //   _.map(_.keys(table3_data[0][key]), (child) => {
    //     if (key !== 'stage') {
    //       col_obj['children'].push({
    //         title: child,
    //         dataIndex: child,
    //         key: child,
    //       })
    //     }
    //   })
    //   table3_column.push(col_obj)
    // })
    // let data3 = []
    // _.map(table3_data, (d, index) => {
    //   let data3_obj = {};
    //   _.map(table3_column_keys, (kk) => {
    //     data3_obj['key'] = table3_data[index].stage
    //     data3_obj['stage'] = table3_data[index].stage

    //     if (kk !== 'stage') {
    //       _.map(_.keys(table3_data[index][kk]), (v) => {
    //         data3_obj[v] = table3_data[index][kk][v]
    //       })
    //     }

    //   })
    //   data3.push(data3_obj)


    // })

    // console.log('data3', data3)

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
        <Layout className="site-layout" style={{ marginLeft: 210, background: 'white' }}>
          <div>
            <span style={{ display: 'inline-block', marginLeft: '23px', fontSize: '16px', fontWeight: '500', marginTop: '20px' }}> Design:{menu}</span>
            <span style={{ display: 'inline-block', marginLeft: '10px', fontSize: '16px', fontWeight: '500', marginTop: '20px' }}> Version:{subMenu}</span>
          </div>
          {/* <Divider /> */}

          <Card title="basic_information" bordered={false}>
            <Table
              columns={table1_column}
              dataSource={table1_data}
              bordered
              size="middle"
              pagination={false}
            // scroll={{ x: 'calc(700px + 50%)', y: 240 }}
            />
          </Card>

          <Card title="vt_ratio" bordered={false}>
            <Table
              columns={table2_column}
              dataSource={table2_data}
              bordered
              size="middle"
              // scroll={{ x: 'calc(700px + 50%)', y: 240 }}
              pagination={false}
            />
          </Card>



          <Card title="timing_information" bordered={false}>
            <Table
              columns={table3_column}
              dataSource={table3_data}
              bordered
              size="middle"
              // scroll={{ x: 'calc(700px + 50%)', y: 240 }}

              pagination={false}
            />
          </Card>



          <Image.PreviewGroup>
            {
              _.map(imgs_result, (i) => {
                return <Image
                  style={{ display: 'inline-block' }}
                  width={200}
                  key={i}
                  src={i}
                />
              })
            }
          </Image.PreviewGroup>
        </Layout>
      </Layout>
    );
  }
}

export default App;
