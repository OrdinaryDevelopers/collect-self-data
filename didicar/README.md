## 滴滴打车历史记录爬虫

1. 登录 https://common.diditaxi.com.cn/general/webEntry?h=1#/
2. 复制 Cookie 到 cookies.txt
3. 运行命令

**注:** 可以自动化登录, 运行命令 `node src/ login.js` 按照提示输入手机号码、图形验证码、短信验证码即可自动将 cookie 存到文件, 但不保证稳定, 我测试的时候被限制登录了...

```shell script
npm install
node src/spider.js
```

### 能抓到什么数据?

示例数据来自 [在线接收短信](https://jiemahao.com/) 的账户...

#### 列表

```json
{
    "errmsg": "ok",
    "errno": 0,
    "havenext": 1,
    "mhavenext": 0,
    "nexttext": "轻按查看19年12月订单",
    "order_done": [
        {
            "args_config": {
                "path": "/pages/main/main",
                "productid": 307
            },
            "car_pool": 0,
            "classtype": 2,
            "extra_data": {
                "activity_id": "0",
                "area": "7",
                "is_call_car": "0",
                "is_pay": "1",
                "is_ticket": "0",
                "loss_remand": "0",
                "order_status": "5",
                "order_type": "0"
            },
            "fromAddress": "津霸线韩家墅钢材市场",
            "hisstatus": "已完成",
            "order": "576812691291594176",
            "orderId": "TlRjMk9ERXlOamt4TWpreE5UazBNVGMy",
            "product": "TXpBMw==",
            "productId": 307,
            "product_name": "出租车",
            "product_type": "307",
            "require_level": "1100",
            "role": "",
            "routeId": "",
            "scene": [],
            "setuptime": "2020-01-05 18:30:26",
            "setuptimestamp": 1578220226,
            "status": "",
            "stopover_points": "",
            "substatus": "",
            "tip": "",
            "toAddress": "双环村瑞景街社区卫生服务中心",
            "url": "//api.udache.com/gulfstream/api/v1/webapp/pIndex",
            "xcxentry": "wxd101d32efb5c3565"
        },
        {
            "args_config": {
                "path": "/pages/main/main",
                "productid": 307
            },
            "car_pool": 0,
            "classtype": 2,
            "extra_data": {
                "activity_id": "0",
                "area": "7",
                "is_call_car": "0",
                "is_pay": "1",
                "is_ticket": "0",
                "loss_remand": "0",
                "order_status": "5",
                "order_type": "0"
            },
            "fromAddress": "双环村刘园地铁站-B口",
            "hisstatus": "已完成",
            "order": "576812691208346997",
            "orderId": "TlRjMk9ERXlOamt4TWpBNE16UTJPVGsz",
            "product": "TXpBMw==",
            "productId": 307,
            "product_name": "出租车",
            "product_type": "307",
            "require_level": "1100",
            "role": "",
            "routeId": "",
            "scene": [],
            "setuptime": "2020-01-04 19:00:00",
            "setuptimestamp": 1578135600,
            "status": "",
            "stopover_points": "",
            "substatus": "",
            "tip": "",
            "toAddress": "双环村瑞景国际鞋城-西北门",
            "url": "//api.udache.com/gulfstream/api/v1/webapp/pIndex",
            "xcxentry": "wxd101d32efb5c3565"
        }
    ],
    "order_waiting": [],
    "ordernum": 2,
    "timemode": "201912",
    "timeoffset": 0,
    "toast": "",
    "traceid": "0a59590b5e129875b2eb7825516bba02"
}
```

#### 详情

```json
{
    "data": {
        "basic_data": {
            "driver_info": {
                "avatar": "",
                "car_color": "",
                "car_image": "",
                "car_level": "1100",
                "car_title": "丰田花冠",
                "car_type": "丰田花冠",
                "company": "天津市瀚洋汽车服务有限公司",
                "company_logo": "",
                "driver_id": "4379965",
                "driver_product_id": 307,
                "is_big_picture": 0,
                "label_left": "",
                "label_right": "",
                "label_type": 0,
                "level": 4.96,
                "license_num": "津E11840",
                "moving_on_car_image": "",
                "name": "王师傅",
                "order_cnt": "2941"
            },
            "order_info": {
                "airport_type": 0,
                "arrive_time": 1578217900,
                "begin_charge_time": 1578217902,
                "business_id": 307,
                "call_car": 0,
                "cancel_reason": "",
                "cancel_reason_title": "",
                "carpool_price_type": 0,
                "choose_from_tag": "newes_parent",
                "city_name": "天津市",
                "combo_type": 0,
                "confirm_walk_type": 0,
                "consult_time": 0,
                "country_iso_code": "CN",
                "create_time": 1578216936,
                "currency": {
                    "abbr": "CNY",
                    "symbol": "¥",
                    "unit": "元"
                },
                "departure_time": 1578220226,
                "district": "022",
                "ext_order_id": "",
                "finish_time": 1578224512,
                "freeze_status": "0",
                "from_address": "津霸线",
                "from_area": 7,
                "from_lat": 39.195067,
                "from_lng": 117.071543,
                "from_name": "韩家墅钢材市场",
                "from_poi_id": "0",
                "from_tag": 0,
                "is_serial_order": 0,
                "is_station_carpool": 0,
                "last_order_id": "",
                "lat": 0,
                "lng": 0,
                "map_type": "soso",
                "order_id": "TlRjMk9ERXlOamt4TWpreE5UazBNVGMy",
                "order_type": 1,
                "payments_type": 3,
                "prepay_query": false,
                "require_level": "1100",
                "resolve_tip": [],
                "start_broadcast_time_type": "0",
                "status": 3,
                "stopover_points": [],
                "sub_status": 0,
                "tip": 0,
                "to_address": "双环村",
                "to_lat": 39.201351,
                "to_lng": 117.120045,
                "to_name": "瑞景街社区卫生服务中心",
                "to_poi_id": "2000000000016802325",
                "travel_id": "0",
                "tripcloud_open_oid": "",
                "upgrade_premier": 0,
                "upgrade_unitaxi": 0,
                "walk_type": "0"
            },
            "pay_result": {
                "actual_pay_fee": 0,
                "pay_status": 5,
                "total_fee": 0
            }
        },
        "entry_data": {
            "button_control": 3008,
            "comment": {
                "level": 5,
                "qid": 923,
                "status": 1
            },
            "driver_passenger_poi_show_switch": 1,
            "is_display_tips": 0,
            "question_show": 0,
            "share_info": {
                "share_type": "1",
                "wx_share_icon": "http://static.udache.com/gulfstream/api/passenger/logo.png",
                "wx_share_img": "http://static.udache.com/gulfstream/api/passenger/share.jpg",
                "wx_share_msg": "专属商务车，下车的时候周围都震惊了，以为我是个明星呢！",
                "wx_share_title": "刚用了滴滴专车，感觉超赞！你也来试一下呗！",
                "wx_share_url": "http://static.udache.com/gulfstream/webapp/pages/ordershare/order-share.html?sig=eaff45685faac6d5&oid=TlRjMk9ERXlOamt4TWpreE5UazBNVGMy"
            },
            "update_destination_info": {
                "is_disable": 1,
                "text": "当前订单为{预约行程}，暂不支持修改终点。",
                "title": "当前行程不支持修改终点"
            }
        },
        "scene_data": {
            "is_carpool_commute": 0
        }
    },
    "errmsg": "SUCCESS",
    "errno": 0
}
```
